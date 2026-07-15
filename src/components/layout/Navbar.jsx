import { Bell, ChevronDown, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";
import usePageTitle from "../../hooks/usePageTitle";

const Navbar = () => {
  const pageTitle = usePageTitle();
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 transition hover:bg-slate-100"
        >
          {isCollapsed ? (
            <PanelLeftOpen size={22} />
          ) : (
            <PanelLeftClose size={22} />
          )}
        </button>

        <div>
          <h1 className="text-xl font-semibold text-slate-900">{pageTitle}</h1>

          <p className="text-xs text-slate-500">Ayush Healthcare Clinic</p>
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">
        <button className="relative rounded-lg p-2 hover:bg-slate-100">
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <button className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
            A
          </div>

          <div className="text-left">
            <h4 className="text-sm font-medium">Admin</h4>

            <p className="text-xs text-slate-500">Owner</p>
          </div>

          <ChevronDown size={16} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
