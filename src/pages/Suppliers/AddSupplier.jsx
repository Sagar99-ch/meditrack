import { Building2 } from "lucide-react";

import SupplierForm from "../../components/suppliers/SupplierForm";

const AddSupplier = () => {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 p-8 text-white shadow-lg">
        <div className="flex items-center gap-5">
          <div className="rounded-3xl bg-white/20 p-4 backdrop-blur">
            <Building2 size={42} />
          </div>

          <div>
            <h1 className="text-4xl font-bold">Add Supplier</h1>

            <p className="mt-2 text-blue-100">
              Add a new supplier for managing purchases and inventory.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}

      <SupplierForm />
    </div>
  );
};

export default AddSupplier;
