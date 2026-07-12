import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import Medicines from "../pages/Medicines/Medicines";
import Purchase from "../pages/Purchase/Purchase";
import Suppliers from "../pages/Suppliers/Suppliers";
import Reports from "../pages/Reports/Reports";
import Settings from "../pages/Settings/Settings";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="medicines" element={<Medicines />} />
          <Route path="purchase" element={<Purchase />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
