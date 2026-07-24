import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addTransaction = mutation({
  args: {
    transactionType: v.string(),
    category: v.string(),
    partyName: v.string(),
    amount: v.number(),
    paymentMethod: v.string(),
    transactionDate: v.string(),
    referenceNo: v.optional(v.string()),
    notes: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const transactionId = await ctx.db.insert("transactions", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return transactionId;
  },
});

export const getTransactions = query({
  handler: async (ctx) => {
    return await ctx.db.query("transactions").order("desc").collect();
  },
});

export const deleteTransaction = mutation({
  args: {
    id: v.id("transactions"),
  },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const updateTransaction = mutation({
  args: {
    id: v.id("transactions"),

    transactionType: v.string(),
    category: v.string(),
    partyName: v.string(),
    amount: v.number(),
    paymentMethod: v.string(),
    transactionDate: v.string(),
    referenceNo: v.optional(v.string()),
    notes: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const { id, ...data } = args;

    await ctx.db.patch(id, {
      ...data,
      updatedAt: Date.now(),
    });

    return {
      success: true,
    };
  },
});
