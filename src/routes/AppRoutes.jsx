import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import EditMedicine from "../pages/Medicines/EditMedicine";
import Dashboard from "../pages/Dashboard/Dashboard";
import Medicines from "../pages/Medicines/Medicines";
import Purchase from "../pages/Purchase/Purchase";
import Suppliers from "../pages/Suppliers/Suppliers";
import Reports from "../pages/Reports/Reports";
import Settings from "../pages/Settings/Settings";
import AddMedicine from "../pages/Medicines/AddMedicine";
import ViewMedicine from "../pages/Medicines/ViewMedicine";
import AddSupplier from "../pages/Suppliers/AddSupplier";
import ViewSupplier from "../pages/Suppliers/ViewSupplier";
import EditSupplier from "../pages/Suppliers/EditSupplier";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/suppliers/edit/:id" element={<EditSupplier />} />
        <Route path="/suppliers/view/:id" element={<ViewSupplier />} />
        <Route path="/suppliers/add" element={<AddSupplier />} />
        <Route path="/medicines/edit/:id" element={<EditMedicine />} />
        <Route path="/medicines/view/:id" element={<ViewMedicine />} />
        <Route path="/medicines/add" element={<AddMedicine />} />
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
