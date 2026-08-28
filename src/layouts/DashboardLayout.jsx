import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import AutoLogout from "../pages/auth/AutoLogout";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Auto Logout */}
      <AutoLogout />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="min-w-0 flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
