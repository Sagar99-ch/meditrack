import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { api } from "../../../convex/_generated/api";
import AppInput from "../common/AppInput";
import AppSelect from "../common/AppSelect";
import AppTextarea from "../common/AppTextarea";
import AppButton from "../common/AppButton";
import { useEffect } from "react";

const SupplierForm = ({ initialData = null, onSubmit, loading = false }) => {
  const navigate = useNavigate();
  const addSupplierMutation = useMutation(api.suppliers.addSupplier);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (initialData) {
      reset({
        supplierName: initialData.supplierName,
        companyName: initialData.companyName,
        contactPerson: initialData.contactPerson,
        phone: initialData.phone,
        alternatePhone: initialData.alternatePhone,
        email: initialData.email,
        address: initialData.address,
        city: initialData.city,
        state: initialData.state,
        pinCode: initialData.pinCode,
        gstNumber: initialData.gstNumber,
        paymentTerms: initialData.paymentTerms,
        creditLimit: initialData.creditLimit,
        notes: initialData.notes,
        status: initialData.status,
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data) => {
    if (onSubmit) {
      return onSubmit(data);
    }

    try {
      await addSupplierMutation({
        supplierName: data.supplierName,
        companyName: data.companyName,
        contactPerson: data.contactPerson,
        phone: data.phone,
        alternatePhone: data.alternatePhone || "",
        email: data.email || "",
        address: data.address,
        city: data.city,
        state: data.state,
        pinCode: data.pinCode,
        gstNumber: data.gstNumber || "",
        paymentTerms: data.paymentTerms || "",
        creditLimit: Number(data.creditLimit) || 0,
        notes: data.notes || "",
        status: data.status,
      });

      toast.success("Supplier Added Successfully");

      navigate("/suppliers");
    } catch (err) {
      console.error(err);

      toast.error("Failed to save supplier");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Basic Information */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">🏢 Basic Information</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AppInput
            label="Supplier Name"
            placeholder="ABC Medical Agency"
            required
            {...register("supplierName", {
              required: "Supplier Name is required",
            })}
            error={errors.supplierName}
          />

          <AppInput
            label="Company Name"
            required
            placeholder="ABC Pharma Pvt Ltd"
            {...register("companyName", {
              required: "Company Name is required",
            })}
            error={errors.companyName}
          />

          <AppInput
            label="Contact Person"
            required
            placeholder="Ramesh Sharma"
            {...register("contactPerson", {
              required: "Contact Person is required",
            })}
            error={errors.contactPerson}
          />
          <AppInput
            label="Phone Number"
            required
            placeholder="+91 9876543210"
            {...register("phone", {
              required: "Phone Number is required",
            })}
            error={errors.phone}
          />

          <AppInput
            label="Alternate Phone"
            placeholder="+91 9876543210"
            {...register("alternatePhone")}
          />

          <AppInput
            label="Email"
            placeholder="supplier@gmail.com"
            {...register("email")}
          />
        </div>
      </div>

      {/* Address */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">📍 Address Information</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AppInput
            label="Address"
            placeholder="Enter Address"
            {...register("address", {
              required: "Address is required",
            })}
            error={errors.address}
          />

          <AppInput
            label="City"
            placeholder="Indore"
            {...register("city", {
              required: "City is required",
            })}
            error={errors.city}
          />

          <AppInput
            label="State"
            placeholder="Madhya Pradesh"
            {...register("state", {
              required: "State is required",
            })}
            error={errors.state}
          />

          <AppInput
            label="PIN Code"
            placeholder="452001"
            {...register("pinCode", {
              required: "PIN Code is required",
            })}
            error={errors.pinCode}
          />
        </div>
      </div>

      {/* Business */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">💳 Business Information</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AppInput
            label="GST Number"
            placeholder="23ABCDE1234F1Z5"
            {...register("gstNumber")}
          />

          <AppInput
            label="Payment Terms"
            placeholder="30 Days"
            {...register("paymentTerms")}
          />

          <AppInput
            type="number"
            label="Credit Limit"
            placeholder="50000"
            {...register("creditLimit")}
          />
          <AppSelect
            label="Status"
            options={[
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ]}
            {...register("status", {
              required: "Status is required",
            })}
            error={errors.status}
          />
        </div>
      </div>

      {/* Notes */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">📝 Notes</h2>

        <AppTextarea
          label="Notes"
          placeholder="Additional information..."
          {...register("notes")}
        />
      </div>

      <div className="flex justify-end gap-4">
        <AppButton variant="secondary">Cancel</AppButton>

        <AppButton type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : initialData
              ? "Update Supplier"
              : "Save Supplier"}
        </AppButton>
      </div>
    </form>
  );
};

export default SupplierForm;
