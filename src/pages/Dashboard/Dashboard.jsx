import { Pill, Boxes, AlertTriangle, Clock3 } from "lucide-react";
import { Button } from "../../components/ui/button";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <PageHeader
        title="Medicines"
        description="Manage all medicines available in inventory."
      >
        {/* <Button>Add Medicine</Button> */}
      </PageHeader>

      {/* Cards */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Medicines"
          value="1,254"
          subtitle="12 added this month"
          icon={Pill}
          color="bg-blue-600"
        />

        <StatCard
          title="Total Stock"
          value="8,420"
          subtitle="Healthy Inventory"
          icon={Boxes}
          color="bg-green-600"
        />

        <StatCard
          title="Low Stock"
          value="17"
          subtitle="Need Reorder"
          icon={AlertTriangle}
          color="bg-orange-500"
        />

        <StatCard
          title="Expiring Soon"
          value="9"
          subtitle="Next 30 Days"
          icon={Clock3}
          color="bg-red-600"
        />
      </div>
    </div>
  );
};

export default Dashboard;
