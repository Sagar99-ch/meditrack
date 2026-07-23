import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  medicines: defineTable({
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

    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_name", ["medicineName"]),
  suppliers: defineTable({
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

    totalPurchase: v.optional(v.number()),
    totalPaid: v.optional(v.number()),
    totalDue: v.optional(v.number()),

    createdAt: v.number(),
  }),

  purchases: defineTable({
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

    createdAt: v.number(),
  })
    .index("by_invoice", ["invoiceNumber"])
    .index("by_supplier", ["supplierId"])
    .index("by_date", ["purchaseDate"]),

  stockAdjustments: defineTable({
    medicineId: v.id("medicines"),
    medicineName: v.string(),

    previousStock: v.number(),
    adjustmentType: v.string(), // Increase | Decrease
    quantity: v.number(),
    newStock: v.number(),

    reason: v.string(),
    notes: v.optional(v.string()),

    createdAt: v.number(),
  })
    .index("by_medicine", ["medicineId"])
    .index("by_date", ["createdAt"]),
});
