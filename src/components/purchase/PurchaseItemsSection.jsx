import { Plus } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

import AppButton from "../common/AppButton";
import PurchaseMedicineCard from "./PurchaseMedicineCard";

const PurchaseItemsSection = ({ fields, append, remove }) => {
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

  const addMedicine = () => {
    append({
      medicineName: "",
      genericName: "",
      company: "",
      category: "",
      unit: "",

      batchNumber: "",
      manufacturingDate: "",
      expiryDate: "",
      rackLocation: "",

      purchasePrice: 0,
      sellingPrice: 0,
      gst: 0,
      quantity: 1,
    });
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Purchase Medicines</h2>

        <AppButton type="button" onClick={addMedicine}>
          <Plus size={18} />
          Add Medicine
        </AppButton>
      </div>

      {/* Cards */}

      <div className="space-y-6">
        {fields.map((field, index) => (
          <PurchaseMedicineCard
            key={field.id}
            index={index}
            remove={remove}
            totalItems={fields.length}
          />
        ))}
      </div>

      {/* Footer */}

      <div className="mt-8 flex items-center justify-between border-t pt-6">
        <span className="font-medium text-slate-600">
          Total Medicines : {items.length}
        </span>

        <h3 className="text-2xl font-bold text-blue-600">
          ₹ {grandTotal.toFixed(2)}
        </h3>
      </div>
    </div>
  );
};

export default PurchaseItemsSection;
