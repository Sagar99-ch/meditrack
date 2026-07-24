import { Search } from "lucide-react";

const ReportToolbar = ({ search, setSearch, filter, setFilter }) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:w-96">
        <Search size={18} className="absolute left-3 top-3 text-slate-400" />

        <input
          type="text"
          placeholder="Search medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border pl-10 pr-4 py-2 outline-none focus:border-blue-500"
        />
      </div>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="rounded-lg border px-4 py-2"
      >
        <option value="all">All</option>
        <option value="today">Today</option>
        <option value="7">Next 7 Days</option>
        <option value="30">Next 30 Days</option>
      </select>
    </div>
  );
};

export default ReportToolbar;
