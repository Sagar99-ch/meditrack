import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import AppInput from "../../components/common/AppInput";
import AppSelect from "../../components/common/AppSelect";
import AppTextarea from "../../components/common/AppTextarea";
import AppButton from "../../components/common/AppButton";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

import {
  medicineCategories,
  medicineUnits,
  gstRates,
} from "../../data/medicineOptions";

const AddMedicine = () => {
  const navigate = useNavigate();
  const addMedicine = useMutation(api.medicines.addMedicine);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addMedicine({
        medicineName: data.medicineName,
        company: data.company,
        category: data.category,
        unit: data.unit,
        batchNumber: data.batchNumber,
        expiryDate: data.expiryDate,

        purchasePrice: Number(data.purchasePrice),
        sellingPrice: Number(data.sellingPrice),

        currentStock: Number(data.currentStock),
        status: "Active", 
        minimumStock: Number(data.minimumStock),

        gst: Number(data.gst),

        rackLocation: data.rackLocation || "",
        notes: data.notes || "",
      });

      toast.success("Medicine added successfully.");

      navigate("/medicines");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save medicine.");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add Medicine"
        description="Add a new medicine to your inventory."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-slate-200 bg-white p-6"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <AppInput
            label="Medicine Name"
            required
            placeholder="Paracetamol 650"
            {...register("medicineName", {
              required: "Medicine Name is required",
            })}
            error={errors.medicineName}
          />

          <AppInput
            label="Company"
            required
            placeholder="Cipla"
            {...register("company", {
              required: "Company is required",
            })}
            error={errors.company}
          />

          <AppSelect
            label="Category"
            required
            options={medicineCategories}
            {...register("category", {
              required: "Category is required",
            })}
            error={errors.category}
          />

          <AppSelect
            label="Unit"
            required
            options={medicineUnits}
            {...register("unit", {
              required: "Unit is required",
            })}
            error={errors.unit}
          />

          <AppInput
            label="Batch Number"
            required
            placeholder="BT2026001"
            {...register("batchNumber", {
              required: "Batch Number is required",
            })}
            error={errors.batchNumber}
          />

          <AppInput
            type="date"
            label="Expiry Date"
            required
            {...register("expiryDate", {
              required: "Expiry Date is required",
            })}
            error={errors.expiryDate}
          />

          <AppInput
            type="number"
            label="Purchase Price"
            required
            placeholder="0.00"
            {...register("purchasePrice")}
          />

          <AppInput
            type="number"
            label="Selling Price"
            required
            placeholder="0.00"
            {...register("sellingPrice")}
          />

          <AppInput
            type="number"
            label="Current Stock"
            required
            placeholder="0"
            {...register("currentStock")}
          />

          <AppInput
            type="number"
            label="Minimum Stock"
            required
            placeholder="10"
            {...register("minimumStock")}
          />

          <AppSelect label="GST" options={gstRates} {...register("gst")} />

          <AppInput
            label="Rack Location"
            placeholder="Rack A-2"
            {...register("rackLocation")}
          />
        </div>

        <div className="mt-5">
          <AppTextarea
            label="Notes"
            placeholder="Additional information..."
            {...register("notes")}
          />
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <AppButton
            variant="secondary"
            type="button"
            onClick={() => navigate("/medicines")}
          >
            Cancel
          </AppButton>

          <AppButton type="submit">Save Medicine</AppButton>
        </div>
      </form>
    </div>
  );
};

export default AddMedicine;
