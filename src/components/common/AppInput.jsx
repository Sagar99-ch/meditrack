import { forwardRef } from "react";

const AppInput = forwardRef(
  ({ label, error, required = false, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-semibold text-slate-700">
            {label}

            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <input
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
        />

        {error && <p className="text-sm text-red-500">{error.message}</p>}
      </div>
    );
  }
);

AppInput.displayName = "AppInput";

export default AppInput;
