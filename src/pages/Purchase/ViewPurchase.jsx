import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { ArrowLeft, Printer, Pencil } from "lucide-react";

const ViewPurchase = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const purchase = useQuery(api.purchases.getPurchaseById, {
    id,
  });

  if (purchase === undefined) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-semibold">
        Loading...
      </div>
    );
  }

  if (purchase === null) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-semibold text-red-500">
        Purchase Not Found
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">View Purchase</h1>

          <p className="text-slate-500">Purchase Invoice Details</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/purchase")}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-100"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            <Printer size={18} />
            Print
          </button>

          <button
            onClick={() => navigate(`/purchase/edit/${purchase._id}`)}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Pencil size={18} />
            Edit
          </button>
        </div>
      </div>

      {/* Purchase Information */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-semibold">Purchase Information</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm text-slate-500">Invoice Number</p>

            <p className="font-semibold">{purchase.invoiceNumber}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Supplier</p>

            <p className="font-semibold">{purchase.supplierName}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Purchase Date</p>

            <p className="font-semibold">{purchase.purchaseDate}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Payment Method</p>

            <p className="font-semibold">{purchase.paymentMethod}</p>
          </div>
        </div>
      </div>

      {/* Purchased Medicines */}

      <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
        <div className="border-b p-5">
          <h2 className="text-xl font-semibold">Purchased Medicines</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-5 py-3 text-left">Medicine</th>

                <th className="px-5 py-3 text-left">Batch</th>

                <th className="px-5 py-3 text-left">Expiry</th>

                <th className="px-5 py-3 text-center">Qty</th>

                <th className="px-5 py-3 text-right">Purchase</th>

                <th className="px-5 py-3 text-right">Selling</th>

                <th className="px-5 py-3 text-right">GST</th>

                <th className="px-5 py-3 text-right">Amount</th>
              </tr>
            </thead>

            <tbody>
              {purchase.items.map((item, index) => (
                <tr key={index} className="border-b hover:bg-slate-50">
                  <td className="px-5 py-4 font-medium">{item.medicineName}</td>

                  <td className="px-5 py-4">{item.batchNumber}</td>

                  <td className="px-5 py-4">{item.expiryDate}</td>

                  <td className="px-5 py-4 text-center">{item.quantity}</td>

                  <td className="px-5 py-4 text-right">
                    ₹{item.purchasePrice}
                  </td>

                  <td className="px-5 py-4 text-right">₹{item.sellingPrice}</td>

                  <td className="px-5 py-4 text-right">{item.gst}%</td>

                  <td className="px-5 py-4 text-right font-semibold">
                    ₹{item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PART-2 YAHAN SE START HOGA */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Payment Summary */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold">Payment Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-semibold">₹{purchase.subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">GST Total</span>
              <span className="font-semibold">₹{purchase.gstTotal}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Discount</span>
              <span className="font-semibold">₹{purchase.discount}</span>
            </div>

            <hr />

            <div className="flex justify-between text-lg font-bold">
              <span>Grand Total</span>
              <span className="text-blue-600">₹{purchase.grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Payment Details */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold">Payment Details</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-500">Paid Amount</span>

              <span className="font-semibold text-green-600">
                ₹{purchase.paidAmount}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Due Amount</span>

              <span className="font-semibold text-red-600">
                ₹{purchase.dueAmount}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Payment Method</span>

              <span className="font-semibold">{purchase.paymentMethod}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Total Items</span>

              <span className="font-semibold">{purchase.items.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}

      {purchase.notes && (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">Notes</h2>

          <p className="text-slate-600 leading-7">{purchase.notes}</p>
        </div>
      )}
    </div>
  );
};

export default ViewPurchase;
