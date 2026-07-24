import { TrendingUp } from "lucide-react";

const StatCard = ({
  title,
  value,
  icon: Icon,
  color = "bg-blue-500",
  subtitle,
  onClick,
}) => {
  const isClickable = typeof onClick === "function";

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (isClickable && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300
        ${
          isClickable
            ? "cursor-pointer hover:-translate-y-1 hover:shadow-lg active:scale-[0.98]"
            : ""
        }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">{value}</h2>

          {subtitle && (
            <div className="mt-3 flex items-center gap-1 text-sm text-green-600">
              <TrendingUp size={16} />
              <span>{subtitle}</span>
            </div>
          )}
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
        >
          <Icon className="text-white" size={28} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
