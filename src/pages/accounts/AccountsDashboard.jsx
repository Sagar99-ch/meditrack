import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import SummaryCards from "./components/SummaryCards";
import TransactionTable from "./components/TransactionTable";

const AccountsDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Accounts Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Track your income, expenses and financial summary.
          </p>
        </div>

        <Link
          to="/accounts/add-transaction"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Transaction
        </Link>
      </div>

      {/* Summary */}

      <SummaryCards />

      {/* Financial Overview */}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Today's Income</h3>

          <p className="mt-4 text-3xl font-bold text-green-600">₹0</p>

          <p className="mt-2 text-sm text-slate-500">
            Auto calculated from today's income transactions.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Today's Expense</h3>

          <p className="mt-4 text-3xl font-bold text-red-600">₹0</p>

          <p className="mt-2 text-sm text-slate-500">
            Auto calculated from today's expense transactions.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Cash in Hand</h3>

          <p className="mt-4 text-3xl font-bold text-blue-600">₹0</p>

          <p className="mt-2 text-sm text-slate-500">Current cash balance.</p>
        </div>
      </div>

      {/* Recent Transactions */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Transactions</h2>

          <Link
            to="/accounts/transactions"
            className="text-blue-600 hover:underline"
          >
            View All
          </Link>
        </div>

        <TransactionTable />
      </div>
    </div>
  );
};

export default AccountsDashboard;
