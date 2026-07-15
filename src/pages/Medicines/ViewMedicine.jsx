import {
  ArrowLeft,
  Pencil,
  Pill,
  Package,
  CalendarDays,
  Boxes,
  IndianRupee,
  FileText,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "convex/react";

import { api } from "../../../convex/_generated/api";

import PageHeader from "../../components/common/PageHeader";
import AppButton from "../../components/common/AppButton";

import InfoCard from "../../components/common/InfoCard";
import InfoRow from "../../components/common/InfoRow";

const ViewMedicine = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const medicine = useQuery(api.medicines.getMedicineById, {
    id,
  });

  if (medicine === undefined) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Medicine Details
            </h1>

            <p className="mt-3 text-lg text-slate-500">
              View complete information about this medicine.
            </p>
          </div>

          <div className="flex gap-3">
            <AppButton
              variant="secondary"
              onClick={() => navigate("/medicines")}
            >
              <ArrowLeft size={18} />
              Back
            </AppButton>

            <AppButton
              onClick={() => navigate(`/medicines/edit/${medicine._id}`)}
            >
              <Pencil size={18} />
              Edit Medicine
            </AppButton>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="rounded-3xl bg-[#EAF8F3] p-8">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8">
          {/* LEFT */}

          <div className="rounded-3xl bg-gradient-to-br from-emerald-400 to-emerald-600 p-8 text-white">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white">
              <Pill size={46} className="text-emerald-600" />
            </div>

            <h2 className="mt-8 text-3xl font-bold">{medicine.medicineName}</h2>

            <p className="mt-2 text-emerald-100">{medicine.company}</p>

            <div className="mt-8 space-y-3">
              <div className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700">
                {medicine.category}
              </div>

              <div>
                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    medicine.stock > medicine.minimumStock
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {medicine.stock > medicine.minimumStock
                    ? "In Stock"
                    : "Low Stock"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          {/* RIGHT */}

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="grid grid-cols-2 gap-8">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Batch Number</p>

                <h3 className="mt-2 text-2xl font-bold text-slate-800">
                  {medicine.batchNumber}
                </h3>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Expiry Date</p>

                <h3 className="mt-2 text-2xl font-bold text-slate-800">
                  {medicine.expiryDate}
                </h3>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Current Stock</p>

                <h3 className="mt-2 text-2xl font-bold text-slate-800">
                  {medicine.stock}
                </h3>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Rack Location</p>

                <h3 className="mt-2 text-2xl font-bold text-slate-800">
                  {medicine.rackLocation || "-"}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Medicine Information */}

        <InfoCard
          icon={<Pill className="h-5 w-5 text-blue-600" />}
          title="Medicine Information"
        >
          <InfoRow label="Medicine Name" value={medicine.medicineName} />

          <InfoRow label="Company" value={medicine.company} />

          <InfoRow label="Category" value={medicine.category} />

          <InfoRow label="Unit" value={medicine.unit} />

          <InfoRow label="Batch Number" value={medicine.batchNumber} />

          <InfoRow label="Expiry Date" value={medicine.expiryDate} />
        </InfoCard>

        {/* Inventory */}

        <InfoCard
          icon={<Boxes className="h-5 w-5 text-green-600" />}
          title="Inventory"
        >
          <InfoRow label="Current Stock" value={medicine.stock} />

          <InfoRow label="Minimum Stock" value={medicine.minimumStock} />

          <InfoRow label="Rack Location" value={medicine.rackLocation || "-"} />

          <InfoRow
            label="Status"
            value={
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  medicine.stock === 0
                    ? "bg-red-100 text-red-700"
                    : medicine.stock <= medicine.minimumStock
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                }`}
              >
                {medicine.stock === 0
                  ? "Out of Stock"
                  : medicine.stock <= medicine.minimumStock
                    ? "Low Stock"
                    : "In Stock"}
              </span>
            }
          />
        </InfoCard>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pricing */}

        <InfoCard
          icon={<IndianRupee className="h-5 w-5 text-orange-600" />}
          title="Pricing"
        >
          <InfoRow
            label="Purchase Price"
            value={`₹ ${medicine.purchasePrice}`}
          />

          <InfoRow label="Selling Price" value={`₹ ${medicine.sellingPrice}`} />

          <InfoRow label="GST" value={`${medicine.gst}%`} />
        </InfoCard>

        {/* Notes */}

        <InfoCard
          icon={<FileText className="h-8 w-8 text-orange-600" />}
          title="Notes"
        >
          <div className="rounded-xl bg-slate-50 p-4 text-slate-600">
            {medicine.notes || "No notes available."}
          </div>
        </InfoCard>
      </div>
    </div>
  );
};

export default ViewMedicine;
