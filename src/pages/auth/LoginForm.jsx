import { useState } from "react";
import { User, Lock, Eye, EyeOff, LogIn } from "lucide-react";

import { toast } from "sonner";
import useAuth from "../../hooks/useAuth";

const LoginForm = () => {
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (formData.userId === "admin" && formData.password === "admin123") {
      login({
        userId: "admin",
        name: "Administrator",
        role: "Admin",
      });

      toast.success("Login Successful");
    } else {
      toast.error("Invalid User ID or Password");
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-slate-900">Welcome Back!</h1>

        <p className="mt-4 text-lg text-slate-500">
          Sign in to your account to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">
        {/* User ID */}

        <div>
          <label className="mb-3 block text-sm font-semibold text-slate-700">
            User ID
          </label>

          <div className="flex h-14 items-center rounded-xl border border-slate-300 px-4 transition focus-within:border-blue-600">
            <User size={20} className="text-slate-400" />

            <input
              type="text"
              name="userId"
              placeholder="Enter your user ID"
              value={formData.userId}
              onChange={handleChange}
              className="ml-3 h-full w-full outline-none"
            />
          </div>
        </div>

        {/* Password */}

        <div>
          <label className="mb-3 block text-sm font-semibold text-slate-700">
            Password
          </label>

          <div className="flex h-14 items-center rounded-xl border border-slate-300 px-4 transition focus-within:border-blue-600">
            <Lock size={20} className="text-slate-400" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="ml-3 h-full w-full outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} className="text-slate-500" />
              ) : (
                <Eye size={20} className="text-slate-500" />
              )}
            </button>
          </div>
        </div>

        {/* Remember */}

        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />

            <span className="text-sm text-slate-600">Remember Me</span>
          </label>

          <button
            type="button"
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {/* Login Button */}

        <button
          type="submit"
          disabled={loading}
          className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-blue-600 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogIn size={22} />

          {loading ? "Signing In..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
