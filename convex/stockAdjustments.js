import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAdjustments = query({
  handler: async (ctx) => {
    return await ctx.db.query("stockAdjustments").order("desc").collect();
  },
});

export const updateStock = mutation({
  args: {
    medicineId: v.id("medicines"),
    adjustmentType: v.string(),
    quantity: v.number(),
    reason: v.string(),
    notes: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const medicine = await ctx.db.get(args.medicineId);

    if (!medicine) {
      throw new Error("Medicine not found");
    }

    const previousStock = medicine.currentStock;

    let newStock = previousStock;

    if (args.adjustmentType === "Increase") {
      newStock += args.quantity;
    } else {
      newStock -= args.quantity;
    }

    if (newStock < 0) {
      throw new Error("Stock cannot be negative");
    }

    await ctx.db.patch(args.medicineId, {
      currentStock: newStock,
      updatedAt: Date.now(),
    });

    await ctx.db.insert("stockAdjustments", {
      medicineId: args.medicineId,
      medicineName: medicine.medicineName,

      previousStock,

      adjustmentType: args.adjustmentType,
      quantity: args.quantity,

      newStock,

      reason: args.reason,
      notes: args.notes,

      createdAt: Date.now(),
    });

    return {
      success: true,
    };
  },
});
