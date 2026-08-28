import {
  ShieldPlus,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { APP } from "../../constants/app";
import { navigation } from "../../config/navigation";

import SidebarItem from "./SidebarItem";
import UserProfile from "./UserProfile";
import SidebarGroup from "./SidebarGroup";

import { useSidebar } from "../../context/SidebarContext";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();

  const { logout } = useAuth();

  return (
    <aside
      className={`relative flex h-screen flex-shrink-0 flex-col border-r border-slate-200 bg-white transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* =====================================================
          Logo + Toggle Button
      ====================================================== */}

      <div className="relative flex h-16 items-center gap-3 border-b border-slate-200 px-5">
        {/* Logo */}

        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
          <ShieldPlus size={20} />
        </div>

        {/* App Name */}

        {!isCollapsed && (
          <div className="min-w-0">
            <h2 className="truncate font-semibold">{APP.name}</h2>

            <p className="truncate text-xs text-slate-500">{APP.subtitle}</p>
          </div>
        )}

        {/* =================================================
            OLD STYLE TOGGLE BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={toggleSidebar}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          className={`absolute top-1/2 z-50 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:text-blue-600 ${
            isCollapsed ? "right-[-16px]" : "right-[-16px]"
          }`}
        >
          {isCollapsed ? (
            <PanelLeftOpen size={17} />
          ) : (
            <PanelLeftClose size={17} />
          )}
        </button>
      </div>

      {/* =====================================================
          Navigation
      ====================================================== */}

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-2">
          {navigation.map((item) =>
            item.children ? (
              <SidebarGroup key={item.title} item={item} />
            ) : (
              <SidebarItem key={item.path} item={item} />
            )
          )}
        </div>
      </nav>

      {/* =====================================================
          Footer
      ====================================================== */}

      <div className="space-y-3 border-t border-slate-200 p-4">
        <UserProfile />

        <button
          type="button"
          onClick={logout}
          title={isCollapsed ? "Logout" : ""}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut size={18} className="flex-shrink-0" />

          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
