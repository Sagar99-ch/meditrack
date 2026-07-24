import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";

const SidebarGroup = ({ item }) => {
  const { isCollapsed } = useSidebar();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const hasActiveChild = item.children.some((child) =>
    location.pathname.startsWith(child.path)
  );

  useEffect(() => {
    if (hasActiveChild) {
      setOpen(true);
    }
  }, [hasActiveChild]);

  const Icon = item.icon;

  return (
    <div className="space-y-1">
      <button
        onClick={() => !isCollapsed && setOpen(!open)}
        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 transition-all
        ${
          hasActiveChild
            ? "bg-blue-50 text-blue-700"
            : "hover:bg-slate-100 text-slate-700"
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon size={20} />

          {!isCollapsed && <span className="font-medium">{item.title}</span>}
        </div>

        {!isCollapsed &&
          (open ? <ChevronDown size={18} /> : <ChevronRight size={18} />)}
      </button>

      {!isCollapsed && open && (
        <div className="ml-5 border-l border-slate-200 pl-4">
          {item.children.map((child) => {
            const ChildIcon = child.icon;

            return (
              <NavLink
                key={child.path}
                to={child.path}
                className={({ isActive }) =>
                  `mt-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-slate-100 text-slate-600"
                  }`
                }
              >
                <ChildIcon size={16} />

                <span>{child.title}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SidebarGroup;
