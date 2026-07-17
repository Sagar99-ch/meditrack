import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Add Supplier
export const addSupplier = mutation({
  args: {
    supplierName: v.string(),
    companyName: v.string(),
    contactPerson: v.string(),

    phone: v.string(),
    alternatePhone: v.optional(v.string()),

    email: v.optional(v.string()),
    gstNumber: v.optional(v.string()),

    address: v.string(),
    city: v.string(),
    state: v.string(),
    pinCode: v.string(),

    paymentTerms: v.optional(v.string()),
    creditLimit: v.optional(v.number()),

    notes: v.optional(v.string()),

    status: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db.insert("suppliers", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// Get All Suppliers
export const getSuppliers = query({
  handler: async (ctx) => {
    return await ctx.db.query("suppliers").order("desc").collect();
  },
});

// Get Supplier By ID
export const getSupplierById = query({
  args: {
    id: v.id("suppliers"),
  },

  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Update Supplier
export const updateSupplier = mutation({
  args: {
    id: v.id("suppliers"),

    supplierName: v.string(),
    contactPerson: v.string(),

    phone: v.string(),
    alternatePhone: v.optional(v.string()),

    email: v.optional(v.string()),
    gstNumber: v.optional(v.string()),

    address: v.string(),
    city: v.string(),
    state: v.string(),
    pinCode: v.string(),

    paymentTerms: v.optional(v.string()),
    creditLimit: v.optional(v.number()),

    notes: v.optional(v.string()),

    status: v.string(),
    companyName: v.string(),
  },

  handler: async (ctx, args) => {
    const { id, ...data } = args;

    await ctx.db.patch(id, data);

    return {
      success: true,
    };
  },
});

// Delete Supplier
export const deleteSupplier = mutation({
  args: {
    id: v.id("suppliers"),
  },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);

    return {
      success: true,
    };
  },
});
