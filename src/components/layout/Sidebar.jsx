import { Cross } from "lucide-react";

import { APP } from "../../constants/app";
import { navigation } from "../../config/navigation";

import SidebarItem from "./SidebarItem";
import UserProfile from "./UserProfile";

const Sidebar = () => {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}

      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          <Cross size={20} />
        </div>

        <div>
          <h2 className="font-semibold text-slate-900">{APP.name}</h2>

          <p className="text-xs text-slate-500">{APP.subtitle}</p>
        </div>
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
