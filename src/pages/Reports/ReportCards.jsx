import { AlertTriangle, PackageSearch, CalendarClock } from "lucide-react";

const ReportCards = ({ activeType, onChange }) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div
        onClick={() => onChange("expiring")}
        className={`cursor-pointer rounded-2xl border p-6 transition-all
        ${
          activeType === "expiring"
            ? "border-red-500 bg-red-50"
            : "border-slate-200 bg-white hover:border-red-300"
        }`}
      >
        <AlertTriangle className="mb-3 text-red-600" size={34} />

        <h2 className="text-xl font-semibold">Expiring Medicines</h2>

        <p className="mt-2 text-sm text-slate-500">
          View medicines expiring in the next 30 days.
        </p>
      </div>

      <div
        onClick={() => onChange("expiringSoon")}
        className={`cursor-pointer rounded-2xl border p-6 transition-all
  ${
    activeType === "expiringSoon"
      ? "border-blue-500 bg-blue-50"
      : "border-slate-200 bg-white hover:border-blue-300"
  }`}
      >
        <CalendarClock className="mb-3 text-blue-600" size={34} />

        <h2 className="text-xl font-semibold">Expiring in 3 Months</h2>

        <p className="mt-2 text-sm text-slate-500">
          Medicines that will expire within the next 3 months.
        </p>
      </div>

      <div
        onClick={() => onChange("lowStock")}
        className={`cursor-pointer rounded-2xl border p-6 transition-all
        ${
          activeType === "lowStock"
            ? "border-orange-500 bg-orange-50"
            : "border-slate-200 bg-white hover:border-orange-300"
        }`}
      >
        <PackageSearch className="mb-3 text-orange-600" size={34} />

        <h2 className="text-xl font-semibold">Low Stock Medicines</h2>

        <p className="mt-2 text-sm text-slate-500">
          Medicines running below minimum stock.
        </p>
      </div>
    </div>
  );
};

export default ReportCards;
