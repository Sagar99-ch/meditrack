import { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useQuery } from "convex/react";
import { useFormContext, useWatch } from "react-hook-form";

import { api } from "../../../convex/_generated/api";

import AppInput from "../common/AppInput";
import AppSelect from "../common/AppSelect";

const PurchaseItemRow = ({ index, remove }) => {
  const { register, control, setValue } = useFormContext();

  const medicines = useQuery(api.medicines.getMedicines) || [];

  const medicineOptions = medicines.map((medicine) => ({
    value: medicine._id,
    label: medicine.medicineName,
  }));

  const selectedMedicineId = useWatch({
    control,
    name: `items.${index}.medicineId`,
  });

  const selectedMedicine = medicines.find(
    (medicine) => medicine._id === selectedMedicineId
  );

  useEffect(() => {
    if (!selectedMedicine) return;

    setValue(`items.${index}.medicineName`, selectedMedicine.medicineName);

    setValue(`items.${index}.batchNumber`, selectedMedicine.batchNumber);

    setValue(`items.${index}.expiryDate`, selectedMedicine.expiryDate);

    setValue(`items.${index}.purchasePrice`, selectedMedicine.purchasePrice);

    setValue(`items.${index}.gst`, selectedMedicine.gst);
  }, [selectedMedicine, index, setValue]);

  const gst = useWatch({
    control,
    name: `items.${index}.gst`,
  });

  const quantity = useWatch({
    control,
    name: `items.${index}.quantity`,
  });

  const purchasePrice = useWatch({
    control,
    name: `items.${index}.purchasePrice`,
  });

  const subtotal = (Number(quantity) || 0) * (Number(purchasePrice) || 0);

  const gstAmount = subtotal * ((Number(gst) || 0) / 100);

  const amount = subtotal + gstAmount;
  useEffect(() => {
    setValue(`items.${index}.amount`, amount);
  }, [amount, index, setValue]);
  return (
    <tr className="border-b">
      <td className="p-3 w-72">
        <AppSelect
          options={medicineOptions}
          {...register(`items.${index}.medicineId`)}
        />
      </td>

      <td className="p-3">
        <AppInput value={selectedMedicine?.batchNumber || ""} disabled />
      </td>

      <td className="p-3">
        <AppInput value={selectedMedicine?.expiryDate || ""} disabled />
      </td>

      <td className="p-3">
        <AppInput
          type="number"
          min={1}
          {...register(`items.${index}.quantity`, {
            required: true,
            valueAsNumber: true,
            min: 1,
          })}
        />
      </td>

      <td className="p-3">
        <AppInput
          type="number"
          step="0.01"
          {...register(`items.${index}.purchasePrice`, {
            required: true,
            valueAsNumber: true,
            min: 0,
          })}
        />
      </td>

      <td className="p-3">
        <AppInput
          {...register(`items.${index}.gst`, {
            valueAsNumber: true,
          })}
          disabled
        />
      </td>

      <td className="text-center font-semibold">₹{amount.toFixed(2)}</td>

      <td className="text-center">
        <button
          type="button"
          onClick={() => remove(index)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
};

export default PurchaseItemRow;
