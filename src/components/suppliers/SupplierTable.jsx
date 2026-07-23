import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import { api } from "../../../convex/_generated/api";

const SupplierTable = ({ suppliers, handleDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr className="text-left text-sm text-slate-700">
              <th className="px-5 py-4">Supplier</th>
              <th className="px-5 py-4">Company</th>
              <th className="px-5 py-4">Contact</th>
              <th className="px-5 py-4">Phone</th>
              <th className="px-5 py-4">City</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {suppliers.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-10 text-center text-slate-500"
                >
                  No Suppliers Found
                </td>
              </tr>
            ) : (
              suppliers.map((supplier) => (
                <tr
                  key={supplier._id}
                  className="border-t border-slate-200 hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {supplier.supplierName}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {supplier.contactPerson}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4">{supplier.companyName}</td>

                  <td className="px-5 py-4">{supplier.contactPerson}</td>

                  <td className="px-5 py-4">{supplier.phone}</td>

                  <td className="px-5 py-4">{supplier.city}</td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        supplier.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {supplier.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          navigate(`/suppliers/view/${supplier._id}`)
                        }
                        className="rounded-lg border border-slate-200 p-2 hover:bg-slate-100"
                        title="View"
                      >
                        <Eye size={18} className="text-slate-600" />
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/suppliers/edit/${supplier._id}`)
                        }
                        className="rounded-lg border border-slate-200 p-2 hover:bg-blue-50"
                        title="Edit"
                      >
                        <Pencil size={18} className="text-blue-600" />
                      </button>

                      <button
                        onClick={() => handleDelete(supplier._id)}
                        className="rounded-lg border border-slate-200 p-2 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 size={18} className="text-red-600" />
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

export default SupplierTable;
