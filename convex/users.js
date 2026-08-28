import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// =====================================================
// Get User
// =====================================================

export const getUser = query({
  args: {
    userId: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();
  },
});

// =====================================================
// Create Default Admin
// =====================================================

export const createDefaultAdmin = mutation({
  args: {},

  handler: async (ctx) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", "admin"))
      .first();

    if (existingUser) {
      return {
        success: true,
        message: "Admin already exists",
      };
    }

    await ctx.db.insert("users", {
      userId: "admin",
      name: "Administrator",
      role: "Admin",
      password: "admin123",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return {
      success: true,
      message: "Default admin created",
    };
  },
});

// =====================================================
// Login
// =====================================================

export const loginUser = query({
  args: {
    userId: v.string(),
    password: v.string(),
  },

  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (!user) {
      return null;
    }

    if (user.password !== args.password) {
      return null;
    }

    return {
      userId: user.userId,
      name: user.name,
      role: user.role,
    };
  },
});

// =====================================================
// Change Password
// =====================================================

export const changePassword = mutation({
  args: {
    userId: v.string(),
    oldPassword: v.string(),
    newPassword: v.string(),
  },

  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (!user) {
      throw new Error("User not found.");
    }

    if (user.password !== args.oldPassword) {
      throw new Error("Old password is incorrect.");
    }

    if (args.newPassword.length < 6) {
      throw new Error("New password must be at least 6 characters.");
    }

    if (args.oldPassword === args.newPassword) {
      throw new Error("New password must be different from old password.");
    }

    await ctx.db.patch(user._id, {
      password: args.newPassword,
      updatedAt: Date.now(),
    });

    return {
      success: true,
    };
  },
});

// =====================================================
// Reset Admin Password
// TEMPORARY - REMOVE AFTER TESTING
// =====================================================

export const resetAdminPassword = mutation({
  args: {},

  handler: async (ctx) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", "admin"))
      .first();

    if (!user) {
      throw new Error("Admin user not found.");
    }

    await ctx.db.patch(user._id, {
      password: "admin123",
      updatedAt: Date.now(),
    });

    return {
      success: true,
      message: "Admin password reset to admin123",
    };
  },
});
