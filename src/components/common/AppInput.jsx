import { forwardRef } from "react";

const AppInput = forwardRef(
  ({ label, error, required = false, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-sm font-medium text-slate-700">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <input
          ref={ref}
          {...props}
          className={`h-11 rounded-xl border px-4 text-sm outline-none transition ${
            error
              ? "border-red-500 focus:ring-red-100"
              : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          }`}
        />

        {error && <p className="text-xs text-red-500">{error.message}</p>}
      </div>
    );
  }
);

AppInput.displayName = "AppInput";

export default AppInput;
