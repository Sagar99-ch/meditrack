import { useSidebar } from "../../context/SidebarContext";

const UserProfile = () => {
  const { isCollapsed } = useSidebar();
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
        A
      </div>

      {!isCollapsed && (
        <div>
          <h4 className="text-sm font-semibold">Admin</h4>

          <p className="text-xs text-slate-500">Ayush Healthcare</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
