import { NavLink } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";

const SidebarItem = ({ item }) => {
  const { isCollapsed } = useSidebar();

  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      end={item.path === "/"}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300
        ${
          isActive
            ? "bg-blue-600 text-white shadow-sm"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`
      }
    >
      <Icon size={20} />

      {!isCollapsed && (
        <span className="text-sm font-medium">{item.title}</span>
      )}
    </NavLink>
  );
};

export default SidebarItem;
