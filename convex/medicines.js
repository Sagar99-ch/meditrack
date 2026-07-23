import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Add Medicine
export const addMedicine = mutation({
  args: {
    medicineName: v.string(),
    genericName: v.optional(v.string()),
    company: v.optional(v.string()),
    category: v.string(),
    unit: v.string(),

    batchNumber: v.string(),
    manufacturingDate: v.optional(v.string()),
    expiryDate: v.string(),

    purchasePrice: v.number(),
    sellingPrice: v.number(),
    gst: v.number(),

    currentStock: v.number(),

    rackLocation: v.optional(v.string()),

    status: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db.insert("medicines", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Get All Medicines
export const getMedicines = query({
  handler: async (ctx) => {
    return await ctx.db.query("medicines").order("desc").collect();
  },
});

export const getMedicineById = query({
  args: {
    id: v.id("medicines"),
  },

  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

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
  },

  handler: async (ctx, args) => {
    const { id, ...data } = args;
    await ctx.db.patch(id, {
      ...data,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

export const deleteMedicine = mutation({
  args: {
    id: v.id("medicines"),
  },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);

    return {
      success: true,
    };
  },
});
