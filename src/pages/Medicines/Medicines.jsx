import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import AppButton from "../../components/common/AppButton";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import MedicineTable from "./MedicineTable";
import EmptyState from "../../components/common/EmptyState";
import { useState } from "react";

const Medicines = () => {
  const navigate = useNavigate();
  const medicines = useQuery(api.medicines.getMedicines);
  const [search, setSearch] = useState("");

  const filteredMedicines =
    medicines?.filter((medicine) => {
      const keyword = search.toLowerCase();

      return (
        medicine.medicineName.toLowerCase().includes(keyword) ||
        medicine.company.toLowerCase().includes(keyword)
      );
    }) || [];
  return (
    <div className="space-y-6">
      <PageHeader
        title="Medicines"
        description="Manage all medicines available in your inventory."
      >
        <AppButton onClick={() => navigate("/medicines/add")}>
          <Plus size={18} />
          Add Medicine
        </AppButton>
      </PageHeader>

      {/* Search */}

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <input
          type="text"
          placeholder="Search medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 outline-none transition focus:border-blue-500"
        />
      </div>

      {/* Empty State */}

      <div className="mt-6">
        {medicines === undefined ? (
          <div className="rounded-3xl bg-white py-16 text-center">
            Loading medicines...
          </div>
        ) : medicines.length === 0 ? (
          <EmptyState />
        ) : filteredMedicines.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">
            <h3 className="text-lg font-semibold text-slate-700">
              No medicines found
            </h3>

            <p className="mt-2 text-slate-500">
              Try searching with another medicine or company name.
            </p>
          </div>
        ) : (
          <MedicineTable medicines={filteredMedicines} />
        )}
      </div>
    </div>
  );
};

export default Medicines;
