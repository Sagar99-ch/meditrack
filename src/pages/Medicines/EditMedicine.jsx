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

  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  const [frontPreview, setFrontPreview] = useState("");
  const [backPreview, setBackPreview] = useState("");

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

      // Existing Front Image
      if (medicine.frontImageUrl) {
        setFrontPreview(medicine.frontImageUrl);
      } else {
        setFrontPreview("");
      }

      // Existing Back Image
      if (medicine.backImageUrl) {
        setBackPreview(medicine.backImageUrl);
      } else {
        setBackPreview("");
      }
    }
  }, [medicine, reset]);

  // =====================================================
  // Validate Image
  // =====================================================

  const validateImage = (file) => {
    if (!file) return false;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5 MB.");
      return false;
    }

    return true;
  };

  // =====================================================
  // Front Image Change
  // =====================================================

  const handleFrontImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!validateImage(file)) return;

    setFrontImage(file);
    setFrontPreview(URL.createObjectURL(file));
  };

  // =====================================================
  // Back Image Change
  // =====================================================

  const handleBackImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!validateImage(file)) return;

    setBackImage(file);
    setBackPreview(URL.createObjectURL(file));
  };

  // =====================================================
  // Upload Image
  // =====================================================

  const uploadImage = async (file) => {
    if (!file) return null;

    const uploadUrl = await generateUploadUrl();

    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!result.ok) {
      throw new Error("Image upload failed.");
    }

    const data = await result.json();

    return data.storageId;
  };

  // =====================================================
  // Submit
  // =====================================================

  const onSubmit = async (data) => {
    try {
      setSaving(true);

      // Keep existing images if user doesn't select new ones
      let frontImageId = medicine.frontImageId;
      let backImageId = medicine.backImageId;

      // Upload new Front Image
      if (frontImage) {
        frontImageId = await uploadImage(frontImage);
      }

      // Upload new Back Image
      if (backImage) {
        backImageId = await uploadImage(backImage);
      }

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

        // Required backend field
        status: medicine.status || "Active",

        // Images
        frontImageId,
        backImageId,
      });

      toast.success("Medicine updated successfully.");

      navigate("/medicines");
    } catch (error) {
      console.error(error);

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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-slate-200 bg-white p-6"
      >
        {/* =================================================
            Medicine Images
        ================================================== */}

        <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="mb-6 text-xl font-bold text-slate-800">
            💊 Medicine Images
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* =================================================
                Front Image
            ================================================== */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <label className="mb-3 block text-sm font-medium text-slate-700">
                Front Image
              </label>

              <div className="mb-4 flex h-56 items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50">
                {frontPreview ? (
                  <img
                    src={frontPreview}
                    alt={`${medicine.medicineName} Front`}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="text-center text-slate-400">
                    <div className="text-5xl">💊</div>

                    <p className="mt-2 text-sm">No front image</p>
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFrontImageChange}
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

              {frontImage && (
                <p className="mt-2 text-xs text-green-600">
                  New front image: {frontImage.name}
                </p>
              )}
            </div>

            {/* =================================================
                Back Image
            ================================================== */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <label className="mb-3 block text-sm font-medium text-slate-700">
                Back Image
              </label>

              <div className="mb-4 flex h-56 items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50">
                {backPreview ? (
                  <img
                    src={backPreview}
                    alt={`${medicine.medicineName} Back`}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="text-center text-slate-400">
                    <div className="text-5xl">📦</div>

                    <p className="mt-2 text-sm">No back image</p>
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleBackImageChange}
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

              {backImage && (
                <p className="mt-2 text-xs text-green-600">
                  New back image: {backImage.name}
                </p>
              )}
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            JPG, PNG or WebP. Maximum size: 5 MB per image.
          </p>
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
