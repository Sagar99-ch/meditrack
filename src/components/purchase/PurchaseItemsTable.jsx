import { Plus } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

import AppButton from "../common/AppButton";
import PurchaseItemRow from "./PurchaseItemRow";

const PurchaseItemsTable = ({ fields, append, remove }) => {
  const { control } = useFormContext();

  const items =
    useWatch({
      control,
      name: "items",
    }) || [];

  const grandTotal = items.reduce((total, item) => {
    const qty = Number(item.quantity) || 0;
    const price = Number(item.purchasePrice) || 0;
    const gst = Number(item.gst) || 0;

    const subtotal = qty * price;
    const gstAmount = (subtotal * gst) / 100;

    return total + subtotal + gstAmount;
  }, 0);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Purchase Items</h2>

        <AppButton
          type="button"
          onClick={() =>
            append({
              medicineId: "",
              medicineName: "",
              batchNumber: "",
              expiryDate: "",

              quantity: 1,
              purchasePrice: 0,
              gst: 0,
              amount: 0,
            })
          }
        >
          <Plus size={18} />
          Add Item
        </AppButton>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-3 py-3 text-left">Medicine</th>

              <th className="px-3 py-3 text-left">Batch</th>

              <th className="px-3 py-3 text-left">Expiry</th>

              <th className="px-3 py-3 text-left">Qty</th>

              <th className="px-3 py-3 text-left">Price</th>

              <th className="px-3 py-3 text-left">GST</th>

              <th className="px-3 py-3 text-center">Amount</th>

              <th className="px-3 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {fields.map((field, index) => (
              <PurchaseItemRow key={field.id} index={index} remove={remove} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between border-t pt-5">
        <span className="font-medium text-slate-600">
          Total Items : {items.length}
        </span>

        <h3 className="text-2xl font-bold text-blue-600">
          ₹ {grandTotal.toFixed(2)}
        </h3>
      </div>
    </div>
  );
};

export default PurchaseItemsTable;
