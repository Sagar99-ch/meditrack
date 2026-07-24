import { forwardRef } from "react";

const AppSelect = forwardRef(
  (
    {
      label,
      options = [],
      error,
      required = false,
      placeholder = "Select an option",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-semibold text-slate-700">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <select
          ref={ref}
          {...props}
          className={`
            w-full rounded-xl border bg-white px-4 py-3
            outline-none transition-all

            ${
              error
                ? "border-red-500 focus:border-red-500"
                : "border-slate-300 focus:border-blue-500"
            }

            disabled:bg-slate-100

            ${className}
          `}
        >
          <option value="">{placeholder}</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && <p className="text-sm text-red-500">{error.message}</p>}
      </div>
    );
  }
);

AppSelect.displayName = "AppSelect";

export default AppSelect;
