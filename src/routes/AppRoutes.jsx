// import Login from "../pages/auth/Login";
// import ProtectedRoute from "./ProtectedRoute";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/auth/Login";

import Dashboard from "../pages/Dashboard/Dashboard";

import Medicines from "../pages/Medicines/Medicines";
import AddMedicine from "../pages/Medicines/AddMedicine";
import EditMedicine from "../pages/Medicines/EditMedicine";
import ViewMedicine from "../pages/Medicines/ViewMedicine";

import Suppliers from "../pages/Suppliers/Suppliers";
import AddSupplier from "../pages/Suppliers/AddSupplier";
import EditSupplier from "../pages/Suppliers/EditSupplier";
import ViewSupplier from "../pages/Suppliers/ViewSupplier";

import Purchase from "../pages/Purchase/Purchase";
import AddPurchase from "../pages/Purchase/AddPurchase";
import EditPurchase from "../pages/Purchase/EditPurchase";
import ViewPurchase from "../pages/Purchase/ViewPurchase";

import Reports from "../pages/reports/Reports";
import Settings from "../pages/Settings/Settings";

import StockUpdate from "../pages/stock/StockUpdate";

import Transactions from "../pages/accounts/Transactions";
import AddTransaction from "../pages/accounts/AddTransaction";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Pages */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="medicines" element={<Medicines />} />
          <Route path="purchase" element={<Purchase />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="stock-update" element={<StockUpdate />} />

          <Route path="accounts/transactions" element={<Transactions />} />

          <Route path="accounts/add-transaction" element={<AddTransaction />} />
        </Route>

        {/* Standalone Pages */}

        <Route
          path="/medicines/add"
          element={
            <ProtectedRoute>
              <AddMedicine />
            </ProtectedRoute>
          }
        />

        <Route
          path="/medicines/edit/:id"
          element={
            <ProtectedRoute>
              <EditMedicine />
            </ProtectedRoute>
          }
        />

        <Route
          path="/medicines/view/:id"
          element={
            <ProtectedRoute>
              <ViewMedicine />
            </ProtectedRoute>
          }
        />

        <Route
          path="/suppliers/add"
          element={
            <ProtectedRoute>
              <AddSupplier />
            </ProtectedRoute>
          }
        />

        <Route
          path="/suppliers/edit/:id"
          element={
            <ProtectedRoute>
              <EditSupplier />
            </ProtectedRoute>
          }
        />

        <Route
          path="/suppliers/view/:id"
          element={
            <ProtectedRoute>
              <ViewSupplier />
            </ProtectedRoute>
          }
        />

        <Route
          path="/purchase/add"
          element={
            <ProtectedRoute>
              <AddPurchase />
            </ProtectedRoute>
          }
        />

        <Route
          path="/purchase/edit/:id"
          element={
            <ProtectedRoute>
              <EditPurchase />
            </ProtectedRoute>
          }
        />

        <Route
          path="/purchase/view/:id"
          element={
            <ProtectedRoute>
              <ViewPurchase />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
