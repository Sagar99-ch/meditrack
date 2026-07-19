import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// =========================
// Get All Purchases
// =========================
export const getPurchases = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("purchases").order("desc").collect();
  },
});

// =========================
// Get Purchase By Id
// =========================
export const getPurchaseById = query({
  args: {
    id: v.id("purchases"),
  },

  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// =========================
// Add Purchase
// =========================
export const addPurchase = mutation({
  args: {
    supplierId: v.id("suppliers"),
    supplierName: v.string(),

    invoiceNumber: v.string(),
    purchaseDate: v.string(),
    paymentMethod: v.string(),

    items: v.array(
      v.object({
        medicineId: v.id("medicines"),
        medicineName: v.string(),

        batchNumber: v.string(),
        expiryDate: v.string(),

        quantity: v.number(),
        purchasePrice: v.number(),
        gst: v.number(),
        amount: v.number(),
      })
    ),

    subtotal: v.number(),
    gstTotal: v.number(),
    discount: v.number(),
    grandTotal: v.number(),

    paidAmount: v.number(),
    dueAmount: v.number(),

    notes: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    // Save Purchase
    const purchaseId = await ctx.db.insert("purchases", {
      ...args,
      createdAt: Date.now(),
    });

    // Update Medicine Stock
    for (const item of args.items) {
      const medicine = await ctx.db.get(item.medicineId);

      if (!medicine) continue;

      await ctx.db.patch(item.medicineId, {
        stock: medicine.stock + item.quantity,
      });
    }

    // Update Supplier Totals
    const supplier = await ctx.db.get(args.supplierId);

    if (supplier) {
      await ctx.db.patch(args.supplierId, {
        totalPurchase: (supplier.totalPurchase || 0) + args.grandTotal,
        totalPaid: (supplier.totalPaid || 0) + args.paidAmount,
        totalDue: (supplier.totalDue || 0) + args.dueAmount,
      });
    }

    return purchaseId;
  },
});

// =========================
// Update Purchase
// =========================
export const updatePurchase = mutation({
  args: {
    id: v.id("purchases"),

    supplierId: v.id("suppliers"),
    supplierName: v.string(),

    invoiceNumber: v.string(),
    purchaseDate: v.string(),
    paymentMethod: v.string(),

    items: v.array(
      v.object({
        medicineId: v.id("medicines"),
        medicineName: v.string(),

        batchNumber: v.string(),
        expiryDate: v.string(),

        quantity: v.number(),
        purchasePrice: v.number(),
        gst: v.number(),
        amount: v.number(),
      })
    ),

    subtotal: v.number(),
    gstTotal: v.number(),
    discount: v.number(),
    grandTotal: v.number(),

    paidAmount: v.number(),
    dueAmount: v.number(),

    notes: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const { id, ...data } = args;

    await ctx.db.patch(id, data);

    return {
      success: true,
    };
  },
});

// =========================
// Delete Purchase
// =========================
export const deletePurchase = mutation({
  args: {
    id: v.id("purchases"),
  },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);

    return {
      success: true,
    };
  },
});
