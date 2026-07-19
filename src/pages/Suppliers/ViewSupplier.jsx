import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { ArrowLeft, Building2, Phone, Mail, MapPin } from "lucide-react";
import AppButton from "../../components/common/AppButton";

const ViewSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const supplier = useQuery(api.suppliers.getSupplierById, { id });

  if (!supplier) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-lg text-slate-500">Loading Supplier...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            Supplier Details
          </h1>
          <p className="mt-2 text-slate-500">Complete supplier information.</p>
        </div>

        <AppButton variant="secondary" onClick={() => navigate("/suppliers")}>
          <ArrowLeft size={18} />
          Back
        </AppButton>
      </div>

      {/* Card */}
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
            <Building2 className="text-blue-600" size={30} />
          </div>

          <div>
            <h2 className="text-2xl font-bold">{supplier.supplierName}</h2>

            <p className="text-slate-500">{supplier.companyName}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-slate-500">Contact Person</p>
            <p className="font-semibold">{supplier.contactPerson}</p>
          </div>

          <div>
            <p className="text-slate-500 flex items-center gap-2">
              <Phone size={16} />
              Phone
            </p>
            <p className="font-semibold">{supplier.phone}</p>
          </div>

          <div>
            <p className="text-slate-500 flex items-center gap-2">
              <Mail size={16} />
              Email
            </p>
            <p>{supplier.email || "-"}</p>
          </div>

          <div>
            <p className="text-slate-500">GST Number</p>
            <p>{supplier.gstNumber || "-"}</p>
          </div>

          <div>
            <p className="text-slate-500 flex items-center gap-2">
              <MapPin size={16} />
              Address
            </p>
            <p>
              {supplier.address}, {supplier.city}, {supplier.state}
            </p>
          </div>

          <div>
            <p className="text-slate-500">PIN Code</p>
            <p>{supplier.pinCode}</p>
          </div>

          <div>
            <p className="text-slate-500">Payment Terms</p>
            <p>{supplier.paymentTerms || "-"}</p>
          </div>

          <div>
            <p className="text-slate-500">Credit Limit</p>
            <p>₹ {supplier.creditLimit}</p>
          </div>

          <div>
            <p className="text-slate-500">Status</p>

            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              {supplier.status}
            </span>
          </div>

          <div className="md:col-span-2">
            <p className="text-slate-500">Notes</p>
            <p>{supplier.notes || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSupplier;
