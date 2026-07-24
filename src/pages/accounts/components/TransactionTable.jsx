import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { Eye, Pencil, Trash2 } from "lucide-react";

import { api } from "../../../../convex/_generated/api";

const TransactionTable = () => {
  const transactions = useQuery(api.transactions.getTransactions);

  const deleteTransaction = useMutation(api.transactions.deleteTransaction);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTransaction({ id });

      toast.success("Transaction Deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (transactions === undefined) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        Loading Transactions...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left">Date</th>

              <th className="px-6 py-4 text-left">Type</th>

              <th className="px-6 py-4 text-left">Category</th>

              <th className="px-6 py-4 text-left">Party</th>

              <th className="px-6 py-4 text-right">Amount</th>

              <th className="px-6 py-4 text-left">Method</th>

              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-10 text-center text-slate-500">
                  No Transactions Found
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr
                  key={transaction._id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="px-6 py-4">{transaction.transactionDate}</td>

                  <td className="px-6 py-4">
                    {transaction.transactionType === "Income" ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        Income
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                        Expense
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">{transaction.category}</td>

                  <td className="px-6 py-4">{transaction.partyName}</td>

                  <td className="px-6 py-4 text-right font-semibold">
                    ₹{transaction.amount.toLocaleString()}
                  </td>

                  <td className="px-6 py-4">{transaction.paymentMethod}</td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-3">
                      <button className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200">
                        <Eye size={18} />
                      </button>

                      <button className="rounded-lg bg-yellow-100 p-2 text-yellow-600 hover:bg-yellow-200">
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(transaction._id)}
                        className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
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

export default TransactionTable;
