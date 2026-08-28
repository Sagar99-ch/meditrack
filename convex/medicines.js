import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// =====================================================
// Generate Medicine Image Upload URL
// =====================================================

export const generateUploadUrl = mutation({
  args: {},

  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// =====================================================
// Add Medicine
// =====================================================

export const addMedicine = mutation({
  args: {
    medicineName: v.string(),
    company: v.string(),
    category: v.string(),
    unit: v.string(),

    batchNumber: v.string(),
    expiryDate: v.string(),

    purchasePrice: v.number(),
    sellingPrice: v.number(),

    currentStock: v.number(),
    minimumStock: v.number(),

    gst: v.number(),

    rackLocation: v.optional(v.string()),
    notes: v.optional(v.string()),

    status: v.string(),

    // Medicine Images
    frontImageId: v.optional(v.id("_storage")),
    backImageId: v.optional(v.id("_storage")),
  },

  handler: async (ctx, args) => {
    return await ctx.db.insert("medicines", {
      ...args,

      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// =====================================================
// Get All Medicines
// =====================================================

export const getMedicines = query({
  handler: async (ctx) => {
    const medicines = await ctx.db.query("medicines").order("desc").collect();

    return await Promise.all(
      medicines.map(async (medicine) => {
        let frontImageUrl = null;

        if (medicine.frontImageId) {
          frontImageUrl = await ctx.storage.getUrl(medicine.frontImageId);
        }

        return {
          ...medicine,

          // List page ke liye sirf front image
          frontImageUrl,
        };
      })
    );
  },
});

// =====================================================
// Get Medicine By ID
// =====================================================

export const getMedicineById = query({
  args: {
    id: v.id("medicines"),
  },

  handler: async (ctx, args) => {
    const medicine = await ctx.db.get(args.id);

    if (!medicine) {
      return null;
    }

    let frontImageUrl = null;
    let backImageUrl = null;

    // Front Image
    if (medicine.frontImageId) {
      frontImageUrl = await ctx.storage.getUrl(medicine.frontImageId);
    }

    // Back Image
    if (medicine.backImageId) {
      backImageUrl = await ctx.storage.getUrl(medicine.backImageId);
    }

    return {
      ...medicine,

      // View page par dono images
      frontImageUrl,
      backImageUrl,
    };
  },
});

// =====================================================
// Dashboard Statistics
// =====================================================

export const getDashboardStats = query({
  handler: async (ctx) => {
    const medicines = await ctx.db.query("medicines").collect();

    const totalMedicines = medicines.length;

    const totalStock = medicines.reduce(
      (total, medicine) => total + (medicine.currentStock || 0),
      0
    );

    const lowStockMedicines = medicines.filter(
      (medicine) =>
        (medicine.currentStock || 0) > 0 &&
        (medicine.currentStock || 0) <= (medicine.minimumStock || 10)
    ).length;

    const outOfStockMedicines = medicines.filter(
      (medicine) => (medicine.currentStock || 0) === 0
    ).length;

    return {
      totalMedicines,
      totalStock,
      lowStockMedicines,
      outOfStockMedicines,
    };
  },
});

// =====================================================
// Update Medicine
// =====================================================

export const updateMedicine = mutation({
  args: {
    id: v.id("medicines"),

    medicineName: v.string(),
    company: v.string(),
    category: v.string(),
    unit: v.string(),

    batchNumber: v.string(),
    expiryDate: v.string(),

    purchasePrice: v.number(),
    sellingPrice: v.number(),

    currentStock: v.number(),
    minimumStock: v.number(),

    gst: v.number(),

    rackLocation: v.optional(v.string()),
    notes: v.optional(v.string()),

    status: v.string(),

    // Medicine Images
    frontImageId: v.optional(v.id("_storage")),
    backImageId: v.optional(v.id("_storage")),
  },

  handler: async (ctx, args) => {
    const { id, ...data } = args;

    const existingMedicine = await ctx.db.get(id);

    if (!existingMedicine) {
      throw new Error("Medicine not found");
    }

    // =================================================
    // Delete Old Front Image
    // =================================================

    if (
      data.frontImageId &&
      existingMedicine.frontImageId &&
      data.frontImageId !== existingMedicine.frontImageId
    ) {
      await ctx.storage.delete(existingMedicine.frontImageId);
    }

    // =================================================
    // Delete Old Back Image
    // =================================================

    if (
      data.backImageId &&
      existingMedicine.backImageId &&
      data.backImageId !== existingMedicine.backImageId
    ) {
      await ctx.storage.delete(existingMedicine.backImageId);
    }

    // =================================================
    // Update Medicine
    // =================================================

    await ctx.db.patch(id, {
      ...data,
      updatedAt: Date.now(),
    });

    return {
      success: true,
    };
  },
});

// =====================================================
// Delete Medicine
// =====================================================

export const deleteMedicine = mutation({
  args: {
    id: v.id("medicines"),
  },

  handler: async (ctx, args) => {
    const medicine = await ctx.db.get(args.id);

    if (!medicine) {
      throw new Error("Medicine not found");
    }

    // =================================================
    // Delete Front Image
    // =================================================

    if (medicine.frontImageId) {
      await ctx.storage.delete(medicine.frontImageId);
    }

    // =================================================
    // Delete Back Image
    // =================================================

    if (medicine.backImageId) {
      await ctx.storage.delete(medicine.backImageId);
    }

    // =================================================
    // Delete Medicine
    // =================================================

    await ctx.db.delete(args.id);

    return {
      success: true,
    };
  },
});
