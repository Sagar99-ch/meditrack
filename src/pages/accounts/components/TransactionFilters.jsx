import { Search, RotateCcw } from "lucide-react";

const TransactionFilters = ({
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  paymentFilter,
  setPaymentFilter,
  categoryFilter,
  setCategoryFilter,
  dateFilter,
  setDateFilter,
}) => {
  const resetFilters = () => {
    setSearch("");
    setTypeFilter("All");
    setPaymentFilter("All");
    setCategoryFilter("All");
    setDateFilter("");
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
        {/* Search */}

        <div className="relative lg:col-span-2">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search party or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none focus:border-blue-500"
          />
        </div>

        {/* Transaction Type */}

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="All">All Types</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        {/* Category */}

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="All">All Categories</option>

          <option value="Medicine Sale">Medicine Sale</option>

          <option value="Medicine Purchase">Medicine Purchase</option>

          <option value="Staff Salary">Staff Salary</option>

          <option value="Electricity Bill">Electricity Bill</option>

          <option value="Rent">Rent</option>

          <option value="Other Income">Other Income</option>

          <option value="Other Expense">Other Expense</option>
        </select>

        {/* Payment Method */}

        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="All">All Methods</option>
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Cheque">Cheque</option>
        </select>

        {/* Date */}

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div className="mt-5 flex justify-end">
        <button
          onClick={resetFilters}
          className="flex items-center gap-2 rounded-xl bg-slate-700 px-5 py-3 text-white transition hover:bg-slate-800"
        >
          <RotateCcw size={18} />
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default TransactionFilters;
