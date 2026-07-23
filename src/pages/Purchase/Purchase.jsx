import {
  Plus,
  Search,
  Download,
  Filter,
  ShoppingCart,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import AppButton from "../../components/common/AppButton";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";

const Purchase = () => {
  const navigate = useNavigate();
  const purchases = useQuery(api.purchases.getPurchases) || [];
  const deletePurchase = useMutation(api.purchases.deletePurchase);

  console.log(purchases);

  const handleDelete = async (id, invoiceNumber) => {
    const confirmed = window.confirm(`Delete Purchase "${invoiceNumber}" ?`);

    if (!confirmed) return;

    try {
      await deletePurchase({ id });

      toast.success("Purchase deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete purchase.");
    }
  };
  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">Purchases</h1>

          <p className="mt-2 text-lg text-slate-500">
            Manage medicine purchases and supplier invoices.
          </p>
        </div>
      </div>

      {/* Search & Actions */}

      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-4 md:flex-row">
          <div className="relative w-full md:max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search purchase..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 hover:bg-slate-100">
            <Filter size={18} />
            Filter
          </button>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 hover:bg-slate-100">
            <Download size={18} />
            Export
          </button>

          <AppButton onClick={() => navigate("/purchase/add")}>
            <Plus size={18} />
            Add Purchase
          </AppButton>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr className="text-left text-sm text-slate-700">
              <th className="px-6 py-4">Invoice</th>

              <th className="px-6 py-4">Supplier</th>

              <th className="px-6 py-4">Date</th>

              <th className="px-6 py-4">Items</th>

              <th className="px-6 py-4">Total</th>

              <th className="px-6 py-4">Paid</th>

              <th className="px-6 py-4">Due</th>

              <th className="px-6 py-4">Status</th>

              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {purchases.length === 0 ? (
              <tr>
                <td colSpan="9" className="py-16">
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
                      <ShoppingCart size={42} className="text-blue-500" />
                    </div>

                    <h2 className="mt-6 text-2xl font-bold text-slate-700">
                      No Purchases Found
                    </h2>

                    <p className="mt-2 max-w-md text-center text-slate-500">
                      Start by creating your first purchase invoice.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              purchases.map((purchase) => (
                <tr key={purchase._id} className="border-t hover:bg-slate-50">
                  <td className="px-6 py-4">{purchase.invoiceNumber}</td>

                  <td className="px-6 py-4">{purchase.supplierName}</td>

                  <td className="px-6 py-4">{purchase.purchaseDate}</td>

                  <td className="px-6 py-4">{purchase.items.length}</td>

                  <td className="px-6 py-4">₹{purchase.grandTotal}</td>

                  <td className="px-6 py-4">₹{purchase.paidAmount}</td>

                  <td className="px-6 py-4">₹{purchase.dueAmount}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        purchase.dueAmount === 0
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {purchase.dueAmount === 0 ? "Paid" : "Due"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          navigate(`/purchase/view/${purchase._id}`)
                        }
                        className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100"
                        title="View"
                      >
                        <Eye size={18} className="text-slate-600" />
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/purchase/edit/${purchase._id}`)
                        }
                        className="rounded-lg border border-slate-200 p-2 transition hover:bg-blue-50"
                        title="Edit"
                      >
                        <Pencil size={18} className="text-blue-600" />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(purchase._id, purchase.invoiceNumber)
                        }
                        className="rounded-lg border border-slate-200 p-2 transition hover:bg-red-50"
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

export default Purchase;
