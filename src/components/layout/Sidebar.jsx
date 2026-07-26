import { Cross, ShieldPlus } from "lucide-react";
import { APP } from "../../constants/app";
import { navigation } from "../../config/navigation";
import SidebarItem from "./SidebarItem";
import UserProfile from "./UserProfile";
import { useSidebar } from "../../context/SidebarContext";
import SidebarGroup from "./SidebarGroup";

import { LogOut } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  const { isCollapsed } = useSidebar();
  const { logout } = useAuth();
  return (
    <aside
      className={`h-screen flex flex-col border-r border-slate-200 bg-white transition-all duration-300
      ${isCollapsed ? "w-20" : "w-64"}`}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          <ShieldPlus size={20} />
        </div>

        {!isCollapsed && (
          <div>
            <h2 className="font-semibold">{APP.name}</h2>

            <p className="text-xs text-slate-500">{APP.subtitle}</p>
          </div>
        )}
      </div>
      {/* Navigation */}

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
      {/* Footer */}
      <div className="border-t border-slate-200 p-4 space-y-3">
        <UserProfile />

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
