import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { ArrowLeft, Pencil } from "lucide-react";

import { api } from "../../../convex/_generated/api";
import SupplierForm from "../../components/suppliers/SupplierForm";
import AppButton from "../../components/common/AppButton";

const EditSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const supplier = useQuery(
    api.suppliers.getSupplierById,
    id ? { id } : "skip"
  );

  const updateSupplier = useMutation(api.suppliers.updateSupplier);

  const [loading, setLoading] = useState(false);

  const handleUpdate = async (data) => {
    try {
      setLoading(true);

      await updateSupplier({
        id,

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

      toast.success("Supplier Updated Successfully");

      navigate("/suppliers");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update supplier");
    } finally {
      setLoading(false);
    }
  };

  if (supplier === undefined) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  if (supplier === null) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        Supplier not found
      </div>
    );
  }
  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="rounded-3xl bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Pencil size={30} />

              <h1 className="text-3xl font-bold">Edit Supplier</h1>
            </div>

            <p className="mt-2 text-green-100">Update supplier information.</p>
          </div>

          <AppButton variant="secondary" onClick={() => navigate("/suppliers")}>
            <ArrowLeft size={18} />
            Back
          </AppButton>
        </div>
      </div>

      <SupplierForm
        initialData={supplier}
        onSubmit={handleUpdate}
        loading={loading}
      />
    </div>
  );
};

export default EditSupplier;
