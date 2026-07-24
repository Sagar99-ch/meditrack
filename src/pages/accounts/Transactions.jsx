import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import SummaryCards from "./components/SummaryCards";
import TransactionFilters from "./components/TransactionFilters";
import TransactionTable from "./components/TransactionTable";

const Transactions = () => {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Transactions</h1>

          <p className="mt-1 text-slate-500">
            Manage all income and expense transactions.
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

      {/* Summary Cards */}

      <SummaryCards />

      {/* Filters */}

      <TransactionFilters />

      {/* Table */}

      <TransactionTable />
    </div>
  );
};

export default Transactions;
