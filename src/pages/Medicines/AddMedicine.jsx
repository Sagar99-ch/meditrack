import { useState } from "react";
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
  const generateUploadUrl = useMutation(api.medicines.generateUploadUrl);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // =====================================================
  // Image Selection
  // =====================================================

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

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

      let imageId = undefined;

      // Upload image to Convex Storage
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

      // Save medicine
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
        minimumStock: Number(data.minimumStock),

        gst: Number(data.gst),

        rackLocation: data.rackLocation || "",
        notes: data.notes || "",

        status: "Active",

        imageId,
      });

      toast.success("Medicine added successfully.");

      navigate("/medicines");
    } catch (error) {
      console.error(error);

      toast.error("Failed to save medicine.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <PageHeader
        title="Add Medicine"
        description="Add a new medicine to your inventory."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-slate-200 bg-white p-6"
      >
        {/* =====================================================
            Medicine Image
        ====================================================== */}

        <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="mb-4 text-lg font-semibold text-slate-800">
            💊 Medicine Image
          </h2>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            {/* Preview */}

            <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-300 bg-white">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Medicine preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm text-slate-400">No Image</span>
              )}
            </div>

            {/* Upload */}

            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Upload Medicine Image
              </label>

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
                disabled={saving}
                className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-medium file:text-white hover:file:bg-blue-700"
              />

              <p className="mt-2 text-xs text-slate-500">
                Supported formats: JPG, PNG, WebP. Maximum size: 5 MB.
              </p>

              {imageFile && (
                <p className="mt-2 text-sm font-medium text-green-600">
                  Selected: {imageFile.name}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* =====================================================
            Medicine Information
        ====================================================== */}

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

        {/* =====================================================
            Notes
        ====================================================== */}

        <div className="mt-5">
          <AppTextarea
            label="Notes"
            placeholder="Additional information..."
            {...register("notes")}
          />
        </div>

        {/* =====================================================
            Buttons
        ====================================================== */}

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
            {saving ? "Saving..." : "Save Medicine"}
          </AppButton>
        </div>
      </form>
    </div>
  );
};

export default AddMedicine;
