import { z } from "zod";

export const medicineSchema = z.object({
  medicineName: z.string().min(2, "Medicine name is required"),
  genericName: z.string().optional(),

  company: z.string().min(2, "Company is required"),

  category: z.string().min(1, "Category is required"),

  unit: z.string().min(1, "Unit is required"),

  batchNumber: z.string().min(1, "Batch number is required"),

  expiryDate: z.string().min(1, "Expiry date is required"),

  purchasePrice: z.coerce.number().min(0),

  sellingPrice: z.coerce.number().min(0),

  mrp: z.coerce.number().min(0),

  stock: z.coerce.number().min(0),

  minimumStock: z.coerce.number().min(0),

  gst: z.string(),

  supplier: z.string().optional(),

  rackLocation: z.string().optional(),

  barcode: z.string().optional(),

  notes: z.string().optional(),
});
