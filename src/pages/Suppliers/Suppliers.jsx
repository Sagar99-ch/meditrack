import {
  Plus,
  Users,
  Search,
  Download,
  Filter,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import { useMutation } from "convex/react";
import { toast } from "sonner";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useNavigate } from "react-router-dom";
import AppButton from "../../components/common/AppButton";

const Suppliers = () => {
  const navigate = useNavigate();
  const suppliers = useQuery(api.suppliers.getSuppliers);
  const deleteSupplier = useMutation(api.suppliers.deleteSupplier);

  const handleExport = () => {
    if (!suppliers || suppliers.length === 0) {
      toast.error("No suppliers found to export.");
      return;
    }

    const exportData = suppliers.map((supplier, index) => ({
      "S.No": index + 1,
      "Supplier Name": supplier.supplierName,
      "Company Name": supplier.companyName,
      "Contact Person": supplier.contactPerson,
      Phone: supplier.phone,
      Email: supplier.email || "-",
      Address: supplier.address,
      City: supplier.city,
      State: supplier.state,
      "PIN Code": supplier.pinCode,
      "GST Number": supplier.gstNumber || "-",
      "Payment Terms": supplier.paymentTerms || "-",
      "Credit Limit": supplier.creditLimit || 0,
      Status: supplier.status,
      Notes: supplier.notes || "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Suppliers");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(data, `Suppliers_${new Date().toLocaleDateString("en-GB")}.xlsx`);
  };

  // console.log(suppliers);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this supplier?"
    );

    if (!confirmDelete) return;

    try {
      await deleteSupplier({ id });

      toast.success("Supplier deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete supplier");
    }
  };
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">Suppliers</h1>

          <p className="mt-2 text-lg text-slate-500">
            Manage your suppliers and their information.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      {/* Search & Actions */}

      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}

        <div className="flex flex-1 flex-col gap-4 md:flex-row">
          {/* Search */}

          <div className="relative w-full md:max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search supplier..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition-all focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Filter */}

          <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 hover:bg-slate-100">
            <Filter size={18} />
            Filter
          </button>
        </div>

        {/* Right */}

        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 hover:bg-slate-100"
          >
            <Download size={18} />
            Export
          </button>

          <AppButton onClick={() => navigate("/suppliers/add")}>
            <Plus size={18} />
            Add Supplier
          </AppButton>
        </div>
      </div>

      {/* Supplier Table */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr className="text-left text-sm text-slate-700">
              <th className="px-6 py-4">Supplier</th>

              <th className="px-6 py-4">Contact Person</th>

              <th className="px-6 py-4">Phone</th>

              <th className="px-6 py-4">City</th>

              <th className="px-6 py-4">Status</th>

              <th className="px-6 py-4">Purchase</th>

              <th className="px-6 py-4">Due</th>

              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {suppliers?.length === 0 ? (
              <tr>
                <td colSpan="8" className="py-16">
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
                      <Users size={42} className="text-blue-500" />
                    </div>

                    <h2 className="mt-6 text-2xl font-bold text-slate-700">
                      No Suppliers Found
                    </h2>

                    <p className="mt-2 max-w-md text-center text-slate-500">
                      Start by adding your first supplier.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              suppliers?.map((supplier) => (
                <tr key={supplier._id} className="border-t hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold">{supplier.supplierName}</p>
                      <p className="text-sm text-slate-500">
                        {supplier.companyName}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">{supplier.contactPerson}</td>

                  <td className="px-6 py-4">{supplier.phone}</td>

                  <td className="px-6 py-4">{supplier.city}</td>

                  <td className="px-6 py-4">{supplier.status}</td>

                  <td className="px-6 py-4">₹0</td>

                  <td className="px-6 py-4 text-red-500">₹0</td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() =>
                          navigate(`/suppliers/view/${supplier._id}`)
                        }
                        className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100 transition"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/suppliers/edit/${supplier._id}`)
                        }
                        className="rounded-lg bg-green-50 p-2 text-green-600 hover:bg-green-100 transition"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(supplier._id)}
                        className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Suppliers;
