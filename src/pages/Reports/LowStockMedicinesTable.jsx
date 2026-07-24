import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const LowStockMedicinesTable = ({ search }) => {
  const medicines = useQuery(api.reports.getLowStockMedicines);

  if (medicines === undefined) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.medicineName.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredMedicines.length === 0) {
    return (
      <div className="p-6 text-center text-slate-500">
        No low stock medicines found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="px-4 py-3 text-left">Medicine</th>
            <th className="px-4 py-3 text-left">Company</th>
            <th className="px-4 py-3 text-center">Current Stock</th>
            <th className="px-4 py-3 text-center">Minimum Stock</th>
            <th className="px-4 py-3 text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredMedicines.map((medicine) => (
            <tr key={medicine._id} className="border-b hover:bg-slate-50">
              <td className="px-4 py-3 font-medium">{medicine.medicineName}</td>

              <td className="px-4 py-3">{medicine.company || "-"}</td>

              <td className="px-4 py-3 text-center">{medicine.currentStock}</td>

              <td className="px-4 py-3 text-center">{medicine.minimumStock}</td>

              <td className="px-4 py-3 text-center">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    medicine.currentStock === 0
                      ? "bg-red-100 text-red-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {medicine.currentStock === 0 ? "Out of Stock" : "Low Stock"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LowStockMedicinesTable;
