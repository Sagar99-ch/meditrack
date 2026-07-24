import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ReportCards from "./ReportCards";
import ReportHeader from "./components/ReportHeader";
import ExpiringMedicinesTable from "./ExpiringMedicinesTable";
import LowStockMedicinesTable from "./LowStockMedicinesTable";
import { Search } from "lucide-react";

const Reports = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const reportType = searchParams.get("type") || "expiring";
  const [search, setSearch] = useState("");

  const changeReport = (type) => {
    setSearchParams({ type });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <ReportHeader />

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-3 text-slate-400" />

        <input
          type="text"
          placeholder="Search medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white py-2 pl-10 pr-4 outline-none focus:border-blue-500"
        />
      </div>

      {/* Report Cards */}
      <ReportCards activeType={reportType} onChange={changeReport} />

      {/* Tables */}
      <div className="rounded-xl bg-white shadow">
        {reportType === "expiring" ? (
          <ExpiringMedicinesTable search={search} />
        ) : (
          <LowStockMedicinesTable search={search} />
        )}
      </div>
    </div>
  );
};

export default Reports;
