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

        quantity: v.number(),
        rackLocation: v.optional(v.string()),
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
    const purchaseItems = [];

    // Process every purchase item
    for (const item of args.items) {
      const amount = item.quantity * item.purchasePrice * (1 + item.gst / 100);

      // Find medicine by name
      const existingMedicine = await ctx.db
        .query("medicines")
        .withIndex("by_name", (q) => q.eq("medicineName", item.medicineName))
        .unique();

      if (existingMedicine) {
        // Update existing medicine
        await ctx.db.patch(existingMedicine._id, {
          genericName: item.genericName || "",
          company: item.company || "",
          category: item.category,
          unit: item.unit,

          batchNumber: item.batchNumber,
          manufacturingDate: item.manufacturingDate || "",
          expiryDate: item.expiryDate,

          purchasePrice: item.purchasePrice,
          sellingPrice: item.sellingPrice,
          gst: item.gst,

          currentStock: existingMedicine.currentStock + item.quantity,

          rackLocation: item.rackLocation || "",

          updatedAt: Date.now(),
        });
      } else {
        // Create new medicine
        await ctx.db.insert("medicines", {
          medicineName: item.medicineName,
          genericName: item.genericName || "",
          company: item.company || "",
          category: item.category,
          unit: item.unit,

          batchNumber: item.batchNumber,
          manufacturingDate: item.manufacturingDate || "",
          expiryDate: item.expiryDate,

          purchasePrice: item.purchasePrice,
          sellingPrice: item.sellingPrice,
          gst: item.gst,

          currentStock: item.quantity,

          rackLocation: "",

          status: "Active",

          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      }

      purchaseItems.push({
        ...item,
        amount,
      });
    }

    // Save Purchase
    const purchaseId = await ctx.db.insert("purchases", {
      supplierId: args.supplierId,
      supplierName: args.supplierName,

      invoiceNumber: args.invoiceNumber,
      purchaseDate: args.purchaseDate,
      paymentMethod: args.paymentMethod,

      items: purchaseItems,

      subtotal: args.subtotal,
      gstTotal: args.gstTotal,
      discount: args.discount,
      grandTotal: args.grandTotal,

      paidAmount: args.paidAmount,
      dueAmount: args.dueAmount,

      notes: args.notes,

      createdAt: Date.now(),
    });

    // Update supplier totals
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

        quantity: v.number(),
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
