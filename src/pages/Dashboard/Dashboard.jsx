import { useEffect, useState } from "react";
import { Pill, Boxes, AlertTriangle, Clock3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import ExpiryAlertModal from "../../components/common/ExpiryAlertModal";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = useQuery(api.medicines.getDashboardStats);

  const todayExpiring = useQuery(api.reports.getTodayExpiringMedicines);

  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    if (todayExpiring && todayExpiring.length > 0) {
      setOpenAlert(true);
    }
  }, [todayExpiring]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Manage all medicines available in inventory."
      />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Medicines"
          value={stats?.totalMedicines ?? 0}
          subtitle="Available Medicines"
          icon={Pill}
          color="bg-blue-600"
        />

        <StatCard
          title="Total Stock"
          value={stats?.totalStock ?? 0}
          subtitle="Healthy Inventory"
          icon={Boxes}
          color="bg-green-600"
        />

        <StatCard
          title="Low Stock"
          value={stats?.lowStock ?? 0}
          subtitle="Need Restocking"
          icon={AlertTriangle}
          color="bg-orange-500"
          onClick={() => navigate("/reports?type=low-stock")}
        />

        <StatCard
          title="Expiring Soon"
          value={stats?.expiringSoon ?? 0}
          subtitle="Next 30 Days"
          icon={Clock3}
          color="bg-red-500"
          onClick={() => navigate("/reports?type=expiring")}
        />
      </div>

      <ExpiryAlertModal
        open={openAlert}
        medicines={todayExpiring || []}
        onClose={() => setOpenAlert(false)}
        onViewReport={() => {
          setOpenAlert(false);
          navigate("/reports?type=expiring");
        }}
      />
    </div>
  );
};

export default Dashboard;
