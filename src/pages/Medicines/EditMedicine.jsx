import { useEffect, useState } from "react";
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

  const generateUploadUrl = useMutation(api.medicines.generateUploadUrl);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // =====================================================
  // Load Existing Medicine
  // =====================================================

  useEffect(() => {
    if (medicine) {
      reset({
        medicineName: medicine.medicineName || "",
        company: medicine.company || "",
        category: medicine.category || "",
        unit: medicine.unit || "",

        batchNumber: medicine.batchNumber || "",
        expiryDate: medicine.expiryDate || "",

        purchasePrice: medicine.purchasePrice ?? 0,
        sellingPrice: medicine.sellingPrice ?? 0,

        currentStock: medicine.currentStock ?? 0,
        minimumStock: medicine.minimumStock ?? 0,

        gst: medicine.gst ?? 0,

        rackLocation: medicine.rackLocation || "",
        notes: medicine.notes || "",
      });

      // Existing image
      if (medicine.imageUrl) {
        setImagePreview(medicine.imageUrl);
      } else {
        setImagePreview("");
      }
    }
  }, [medicine, reset]);

  // =====================================================
  // Image Change
  // =====================================================

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validate image type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    // 5 MB limit
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5 MB.");
      return;
    }

    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  // =====================================================
  // Submit
  // =====================================================

  const onSubmit = async (data) => {
    try {
      setSaving(true);

      let imageId = medicine.imageId;

      // =================================================
      // Upload New Image
      // =================================================

      if (imageFile) {
        const uploadUrl = await generateUploadUrl();

        const uploadResult = await fetch(uploadUrl, {
          method: "POST",
          headers: {
            "Content-Type": imageFile.type,
          },
          body: imageFile,
        });

        if (!uploadResult.ok) {
          throw new Error("Image upload failed.");
        }

        const uploadData = await uploadResult.json();

        imageId = uploadData.storageId;
      }

      // =================================================
      // Update Medicine
      // =================================================

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

        // IMPORTANT:
        // Backend requires status
        status: medicine.status || "Active",

        imageId,
      });

      toast.success("Medicine updated successfully.");

      navigate("/medicines");
    } catch (err) {
      console.error(err);

      toast.error("Update failed.");
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // Loading
  // =====================================================

  if (medicine === undefined) {
    return <div className="p-6">Loading...</div>;
  }

  // =====================================================
  // Not Found
  // =====================================================

  if (medicine === null) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-700">
            Medicine Not Found
          </h2>

          <button
            onClick={() => navigate("/medicines")}
            className="mt-4 text-blue-600 hover:underline"
          >
            Back to Medicines
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* =====================================================
          Header
      ====================================================== */}

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

      {/* =====================================================
          Form
      ====================================================== */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-slate-200 bg-white p-6"
      >
        {/* =================================================
            Medicine Image
        ================================================== */}

        <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">
            💊 Medicine Image
          </h2>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            {/* Image Preview */}

            <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-300 bg-white">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt={medicine.medicineName}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="text-4xl">💊</div>
              )}
            </div>

            {/* Upload */}

            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Change Medicine Image
              </label>

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
                disabled={saving}
                className="block w-full text-sm text-slate-600
                file:mr-4
                file:rounded-xl
                file:border-0
                file:bg-blue-600
                file:px-4
                file:py-2
                file:font-medium
                file:text-white
                hover:file:bg-blue-700"
              />

              <p className="mt-2 text-xs text-slate-500">
                JPG, PNG or WebP. Maximum size: 5 MB.
              </p>

              {imageFile && (
                <p className="mt-2 text-sm font-medium text-green-600">
                  New image selected: {imageFile.name}
                </p>
              )}

              {!imageFile && medicine.imageUrl && (
                <p className="mt-2 text-sm text-slate-500">
                  Current medicine image is being used.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* =================================================
            Medicine Information
        ================================================== */}

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

        {/* =================================================
            Notes
        ================================================== */}

        <div className="mt-5">
          <AppTextarea label="Notes" {...register("notes")} />
        </div>

        {/* =================================================
            Buttons
        ================================================== */}

        <div className="mt-8 flex justify-end gap-3">
          <AppButton
            variant="secondary"
            type="button"
            disabled={saving}
            onClick={() => navigate("/medicines")}
          >
            Cancel
          </AppButton>

          <AppButton type="submit" disabled={saving}>
            {saving ? "Updating..." : "Update Medicine"}
          </AppButton>
        </div>
      </form>
    </div>
  );
};

export default EditMedicine;
