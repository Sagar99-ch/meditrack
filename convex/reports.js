import { query } from "./_generated/server";

// ================================
// Expiring Medicines (Next 30 Days)
// ================================
export const getExpiringMedicines = query({
  args: {},
  handler: async (ctx) => {
    const medicines = await ctx.db.query("medicines").collect();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const next30Days = new Date(today);
    next30Days.setDate(today.getDate() + 30);

    return medicines
      .filter((medicine) => {
        const expiry = new Date(medicine.expiryDate);
        expiry.setHours(0, 0, 0, 0);

        return expiry >= today && expiry <= next30Days;
      })
      .map((medicine) => {
        const expiry = new Date(medicine.expiryDate);
        expiry.setHours(0, 0, 0, 0);

        const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

        return {
          ...medicine,
          daysLeft,
        };
      })
      .sort((a, b) => a.daysLeft - b.daysLeft);
  },
});

// ================================
// Low Stock Medicines
// ================================
export const getLowStockMedicines = query({
  args: {},
  handler: async (ctx) => {
    const medicines = await ctx.db.query("medicines").collect();

    return medicines
      .filter((medicine) => medicine.currentStock <= medicine.minimumStock)
      .sort((a, b) => a.currentStock - b.currentStock);
  },
});

export const getTodayExpiringMedicines = query({
  args: {},
  handler: async (ctx) => {
    const medicines = await ctx.db.query("medicines").collect();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return medicines.filter((medicine) => {
      const expiry = new Date(medicine.expiryDate);
      expiry.setHours(0, 0, 0, 0);

      return expiry.getTime() === today.getTime();
    });
  },
});
