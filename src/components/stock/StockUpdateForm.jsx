import { useForm } from "react-hook-form";
import AppInput from "../common/AppInput";
import AppSelect from "../common/AppSelect";
import AppTextarea from "../common/AppTextarea";
import AppButton from "../common/AppButton";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

const StockUpdateForm = () => {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      adjustmentType: "Increase",
      reason: "Physical Count",
    },
  });

  const medicines = useQuery(api.medicines.getMedicines);
  const selectedMedicineId = watch("medicineId");
  const adjustmentType = watch("adjustmentType");
  const updateStock = useMutation(api.stockAdjustments.updateStock);

  const selectedMedicine = medicines?.find(
    (medicine) => medicine._id === selectedMedicineId
  );
  const onSubmit = async (data) => {
    try {
      await updateStock({
        medicineId: data.medicineId,
        adjustmentType: data.adjustmentType,
        quantity: data.quantity,
        reason: data.reason,
        notes: data.notes,
      });

      toast.success("Stock Updated Successfully");

      // console.log("Stock Updated");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Medicine Information */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">💊 Medicine Information</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AppSelect
            label="Select Medicine"
            required
            options={
              medicines
                ? medicines.map((medicine) => ({
                    label: medicine.medicineName,
                    value: medicine._id,
                  }))
                : []
            }
            {...register("medicineId")}
          />

          <AppInput
            label="Current Stock"
            value={selectedMedicine?.currentStock ?? ""}
            disabled
          />
        </div>
      </div>

      {/* Stock Adjustment */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">📦 Stock Adjustment</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AppSelect
            label="Adjustment Type"
            required
            options={[
              {
                label: "Increase",
                value: "Increase",
              },
              {
                label: "Decrease",
                value: "Decrease",
              },
            ]}
            {...register("adjustmentType")}
          />

          <AppInput
            type="number"
            label="Quantity"
            placeholder="Enter quantity"
            required
            {...register("quantity", {
              valueAsNumber: true,
            })}
          />
        </div>

        <div className="mt-6">
          <AppSelect
            label="Reason"
            options={[
              {
                label: "Physical Count",
                value: "Physical Count",
              },
              {
                label: "Damaged",
                value: "Damaged",
              },
              {
                label: "Expired",
                value: "Expired",
              },
              {
                label: "Lost",
                value: "Lost",
              },
              {
                label: "Returned",
                value: "Returned",
              },
              {
                label: "Other",
                value: "Other",
              },
            ]}
            {...register("reason")}
          />
        </div>

        <div className="mt-6">
          <AppTextarea
            label="Notes"
            placeholder="Write adjustment notes..."
            {...register("notes")}
          />
        </div>
      </div>

      {/* Preview */}

      <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
        <h2 className="mb-4 text-xl font-semibold text-blue-700">
          📋 Adjustment Preview
        </h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Adjustment Type :</span>{" "}
            {adjustmentType}
          </div>

          <div>
            <span className="font-medium">Status :</span> Ready to Update
          </div>
        </div>
      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-4">
        <AppButton variant="secondary">Cancel</AppButton>

        <AppButton type="submit">Update Stock</AppButton>
      </div>
    </form>
  );
};

export default StockUpdateForm;
