import { Cross, ShieldPlus } from "lucide-react";
import { APP } from "../../constants/app";
import { navigation } from "../../config/navigation";
import SidebarItem from "./SidebarItem";
import UserProfile from "./UserProfile";
import { useSidebar } from "../../context/SidebarContext";

const Sidebar = () => {
  const { isCollapsed } = useSidebar();
  return (
    <aside
      className={`h-screen border-r border-slate-200 bg-white flex flex-col transition-all duration-300
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

      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => (
          <SidebarItem key={item.path} item={item} />
        ))}
      </nav>

      {/* Footer */}

      <div className="border-t border-slate-200 p-4">
        <UserProfile />
      </div>
    </aside>
  );
};

export default Sidebar;
