import {
  ArrowLeft,
  Pencil,
  Pill,
  Boxes,
  IndianRupee,
  FileText,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

import AppButton from "../../components/common/AppButton";
import InfoCard from "../../components/common/InfoCard";
import InfoRow from "../../components/common/InfoRow";

const ViewMedicine = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const medicine = useQuery(
    api.medicines.getMedicineById,
    id ? { id } : "skip"
  );

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

  // =====================================================
  // Stock Status
  // =====================================================

  const currentStock = medicine.currentStock || 0;
  const minimumStock = medicine.minimumStock || 0;

  const stockStatus =
    currentStock === 0
      ? {
          text: "Out of Stock",
          className: "bg-red-100 text-red-700",
        }
      : currentStock <= minimumStock
        ? {
            text: "Low Stock",
            className: "bg-yellow-100 text-yellow-700",
          }
        : {
            text: "In Stock",
            className: "bg-green-100 text-green-700",
          };

  return (
    <div className="space-y-6">
      {/* =====================================================
          Header
      ====================================================== */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
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

      {/* =====================================================
          Summary
      ====================================================== */}

      <div className="rounded-3xl bg-[#EAF8F3] p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[340px_1fr]">
          {/* =================================================
              LEFT - Front Image
          ================================================== */}

          <div className="rounded-3xl bg-gradient-to-br from-emerald-400 to-emerald-600 p-8 text-white">
            <div className="flex h-72 w-full items-center justify-center overflow-hidden rounded-2xl bg-white">
              {medicine.frontImageUrl ? (
                <img
                  src={medicine.frontImageUrl}
                  alt={`${medicine.medicineName} Front`}
                  className="h-full w-full object-contain"
                />
              ) : (
                <Pill size={90} className="text-emerald-500" />
              )}
            </div>

            <h2 className="mt-8 text-3xl font-bold">{medicine.medicineName}</h2>

            <p className="mt-2 text-emerald-100">{medicine.company || "-"}</p>

            <div className="mt-8 space-y-4">
              <div className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700">
                {medicine.category}
              </div>

              <div>
                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${stockStatus.className}`}
                >
                  {stockStatus.text}
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT - Summary Information
          ================================================== */}

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                  {currentStock}
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

      {/* =====================================================
          Front + Back Images
      ====================================================== */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            📷 Medicine Images
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Front and back images of the medicine.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Front */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="mb-4 text-lg font-semibold text-slate-700">
              Front Image
            </h3>

            <div className="flex h-80 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white">
              {medicine.frontImageUrl ? (
                <img
                  src={medicine.frontImageUrl}
                  alt={`${medicine.medicineName} Front`}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="text-center text-slate-400">
                  <Pill size={60} className="mx-auto" />

                  <p className="mt-3 text-sm">No front image available</p>
                </div>
              )}
            </div>
          </div>

          {/* Back */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="mb-4 text-lg font-semibold text-slate-700">
              Back Image
            </h3>

            <div className="flex h-80 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white">
              {medicine.backImageUrl ? (
                <img
                  src={medicine.backImageUrl}
                  alt={`${medicine.medicineName} Back`}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="text-center text-slate-400">
                  <Boxes size={60} className="mx-auto" />

                  <p className="mt-3 text-sm">No back image available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          Medicine Information + Inventory
      ====================================================== */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Medicine Information */}

        <InfoCard
          icon={<Pill className="h-5 w-5 text-blue-600" />}
          title="Medicine Information"
        >
          <InfoRow label="Medicine Name" value={medicine.medicineName} />

          <InfoRow label="Company" value={medicine.company || "-"} />

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
          <InfoRow label="Current Stock" value={currentStock} />

          <InfoRow label="Minimum Stock" value={minimumStock} />

          <InfoRow label="Rack Location" value={medicine.rackLocation || "-"} />

          <InfoRow
            label="Status"
            value={
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${stockStatus.className}`}
              >
                {stockStatus.text}
              </span>
            }
          />
        </InfoCard>
      </div>

      {/* =====================================================
          Pricing + Notes
      ====================================================== */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
          icon={<FileText className="h-5 w-5 text-orange-600" />}
          title="Notes"
        >
          <div className="rounded-xl bg-slate-50 p-4 text-slate-600 whitespace-pre-wrap">
            {medicine.notes || "No notes available."}
          </div>
        </InfoCard>
      </div>
    </div>
  );
};

export default ViewMedicine;
