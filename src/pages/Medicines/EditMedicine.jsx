import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Pencil } from "lucide-react";
import AppInput from "../../components/common/AppInput";
import AppSelect from "../../components/common/AppSelect";
import AppTextarea from "../../components/common/AppTextarea";
import AppButton from "../../components/common/AppButton";
import { toast } from "sonner";

import {
  medicineCategories,
  medicineUnits,
  gstRates,
} from "../../data/medicineOptions";

const EditMedicine = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const medicine = useQuery(api.medicines.getMedicineById, {
    id,
  });

  const updateMedicine = useMutation(api.medicines.updateMedicine);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (medicine) {
      reset({
        medicineName: medicine.medicineName,
        company: medicine.company,
        category: medicine.category,
        unit: medicine.unit,
        batchNumber: medicine.batchNumber,
        expiryDate: medicine.expiryDate,
        purchasePrice: medicine.purchasePrice,
        sellingPrice: medicine.sellingPrice,
        currentStock: medicine.currentStock,
        minimumStock: medicine.minimumStock,
        gst: medicine.gst,
        rackLocation: medicine.rackLocation,
        notes: medicine.notes,
      });
    }
  }, [medicine, reset]);

  if (medicine === undefined) {
    return <div className="p-6">Loading...</div>;
  }

  const onSubmit = async (data) => {
    try {
      await updateMedicine({
        id,

        medicineName: data.medicineName,
        company: data.company,
        category: data.category,
        unit: data.unit,

        batchNumber: data.batchNumber,
        expiryDate: data.expiryDate,

        purchasePrice: Number(data.purchasePrice),
        sellingPrice: Number(data.sellingPrice),

        currentStock: Number(data.currentStock),
        minimumStock: Number(data.minimumStock),

        gst: Number(data.gst),

        rackLocation: data.rackLocation || "",
        notes: data.notes || "",
      });

      toast.success("Medicine updated successfully.");

      navigate("/medicines");
    } catch (err) {
      console.error(err);
      toast.error("Update failed.");
    }
  };
  return (
    <div className="space-y-6">
      <div className="mb-8 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Edit Medicine
          </h1>

          <p className="mt-2 text-base text-slate-500">
            Update medicine information.
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
          <Pencil className="h-7 w-7 text-blue-600" />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-slate-200 bg-white p-6"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <AppInput
            label="Medicine Name"
            required
            {...register("medicineName", {
              required: "Medicine Name is required",
            })}
            error={errors.medicineName}
          />

          <AppInput
            label="Company"
            required
            {...register("company", {
              required: "Company is required",
            })}
            error={errors.company}
          />

          <AppSelect
            label="Category"
            required
            options={medicineCategories}
            {...register("category")}
          />

          <AppSelect
            label="Unit"
            required
            options={medicineUnits}
            {...register("unit")}
          />

          <AppInput
            label="Batch Number"
            required
            {...register("batchNumber")}
          />

          <AppInput
            type="date"
            label="Expiry Date"
            {...register("expiryDate")}
          />

          <AppInput
            type="number"
            label="Purchase Price"
            {...register("purchasePrice")}
          />

          <AppInput
            type="number"
            label="Selling Price"
            {...register("sellingPrice")}
          />

          <AppInput
            type="number"
            label="Current Stock"
            {...register("currentStock")}
          />

          <AppInput
            type="number"
            label="Minimum Stock"
            {...register("minimumStock")}
          />

          <AppSelect label="GST" options={gstRates} {...register("gst")} />

          <AppInput label="Rack Location" {...register("rackLocation")} />
        </div>

        <div className="mt-5">
          <AppTextarea label="Notes" {...register("notes")} />
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <AppButton
            variant="secondary"
            type="button"
            onClick={() => navigate("/medicines")}
          >
            Cancel
          </AppButton>

          <AppButton type="submit">Update Medicine</AppButton>
        </div>
      </form>
    </div>
  );
};

export default EditMedicine;
