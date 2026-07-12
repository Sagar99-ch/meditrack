import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import PageContainer from "../components/layout/PageContainer";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Navbar />

        <PageContainer>
          <Outlet />
        </PageContainer>
      </div>
    </div>
  );
};

export default DashboardLayout;
