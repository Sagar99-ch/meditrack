import { Trash2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

import AppInput from "../common/AppInput";
import AppSelect from "../common/AppSelect";
import AppButton from "../common/AppButton";

const unitOptions = [
  { value: "Tablet", label: "Tablet" },
  { value: "Capsule", label: "Capsule" },
  { value: "Bottle", label: "Bottle" },
  { value: "Strip", label: "Strip" },
  { value: "Tube", label: "Tube" },
  { value: "Injection", label: "Injection" },
  { value: "Syrup", label: "Syrup" },
  { value: "Vial", label: "Vial" },
  { value: "Packet", label: "Packet" },
  { value: "Box", label: "Box" },
];

const PurchaseMedicineCard = ({ index, remove }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h3 className="text-lg font-semibold text-slate-800">
          Medicine #{index + 1}
        </h3>

        <AppButton type="button" variant="danger" onClick={() => remove(index)}>
          <Trash2 size={18} />
        </AppButton>
      </div>

      {/* ================= Medicine Information ================= */}

      <div className="space-y-4">
        <h4 className="text-base font-semibold text-slate-800">
          Medicine Information
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AppInput
            label="Medicine Name"
            required
            placeholder="Enter medicine name"
            {...register(`items.${index}.medicineName`, {
              required: "Medicine name is required",
            })}
            error={errors?.items?.[index]?.medicineName}
          />

          <AppInput
            label="Generic Name"
            placeholder="Enter generic name"
            {...register(`items.${index}.genericName`)}
            error={errors?.items?.[index]?.genericName}
          />

          <AppInput
            label="Company"
            placeholder="Enter company"
            {...register(`items.${index}.company`)}
            error={errors?.items?.[index]?.company}
          />

          <AppInput
            label="Category"
            placeholder="Enter category"
            {...register(`items.${index}.category`)}
            error={errors?.items?.[index]?.category}
          />

          <AppSelect
            label="Unit"
            required
            options={unitOptions}
            {...register(`items.${index}.unit`, {
              required: "Unit is required",
            })}
            error={errors?.items?.[index]?.unit}
          />
        </div>
      </div>

      {/* ================= Inventory Information ================= */}

      <div className="space-y-4">
        <h4 className="text-base font-semibold text-slate-800">
          Inventory Information
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <AppInput
            label="Batch Number"
            placeholder="Enter batch number"
            {...register(`items.${index}.batchNumber`)}
            error={errors?.items?.[index]?.batchNumber}
          />

          <AppInput
            type="date"
            label="Manufacturing Date"
            {...register(`items.${index}.manufacturingDate`)}
            error={errors?.items?.[index]?.manufacturingDate}
          />

          <AppInput
            type="date"
            label="Expiry Date"
            required
            {...register(`items.${index}.expiryDate`, {
              required: "Expiry date is required",
            })}
            error={errors?.items?.[index]?.expiryDate}
          />

          <AppInput
            label="Rack Location"
            placeholder="e.g. A-12"
            {...register(`items.${index}.rackLocation`)}
            error={errors?.items?.[index]?.rackLocation}
          />
        </div>
      </div>

      {/* ================= Pricing ================= */}

      <div className="space-y-4">
        <h4 className="text-base font-semibold text-slate-800">Pricing</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <AppInput
            type="number"
            label="Purchase Price"
            required
            min={0}
            step="0.01"
            placeholder="0.00"
            {...register(`items.${index}.purchasePrice`, {
              required: "Purchase price is required",
              valueAsNumber: true,
            })}
            error={errors?.items?.[index]?.purchasePrice}
          />

          <AppInput
            type="number"
            label="Selling Price"
            required
            min={0}
            step="0.01"
            placeholder="0.00"
            {...register(`items.${index}.sellingPrice`, {
              required: "Selling price is required",
              valueAsNumber: true,
            })}
            error={errors?.items?.[index]?.sellingPrice}
          />

          <AppInput
            type="number"
            label="GST (%)"
            min={0}
            max={100}
            placeholder="0"
            {...register(`items.${index}.gst`, {
              valueAsNumber: true,
            })}
            error={errors?.items?.[index]?.gst}
          />

          <AppInput
            type="number"
            label="Quantity"
            required
            min={1}
            placeholder="1"
            {...register(`items.${index}.quantity`, {
              required: "Quantity is required",
              valueAsNumber: true,
              min: 1,
            })}
            error={errors?.items?.[index]?.quantity}
          />
        </div>
      </div>
    </div>
  );
};

export default PurchaseMedicineCard;
