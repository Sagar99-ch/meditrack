import { useState } from "react";

import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";

import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

import { toast } from "sonner";

import AppButton from "../../components/common/AppButton";

const Settings = () => {
  const changePassword = useMutation(api.users.changePassword);

  const [showOldPassword, setShowOldPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = formData;

    if (!oldPassword) {
      toast.error("Please enter your old password.");
      return;
    }

    if (!newPassword) {
      toast.error("Please enter your new password.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    if (oldPassword === newPassword) {
      toast.error("New password must be different from old password.");
      return;
    }

    const userData = sessionStorage.getItem("meditrack_auth");

    if (!userData) {
      toast.error("Session expired. Please login again.");
      return;
    }

    let user;

    try {
      user = JSON.parse(userData);
    } catch (error) {
      console.error(error);

      toast.error("Invalid session. Please login again.");

      return;
    }

    setLoading(true);

    try {
      await changePassword({
        userId: user.userId,
        oldPassword,
        newPassword,
      });

      toast.success("Password changed successfully.");

      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);

      toast.error(error?.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "h-14 w-full rounded-xl border border-slate-300 bg-white px-4 pr-12 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
            <ShieldCheck className="h-7 w-7 text-blue-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-800">Settings</h1>

            <p className="mt-1 text-slate-500">
              Manage your account and security settings.
            </p>
          </div>
        </div>
      </div>

      {/* Change Password */}

      <div className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <Lock className="h-6 w-6 text-blue-600" />

            <h2 className="text-2xl font-bold text-slate-800">
              Change Password
            </h2>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Update your account password using your current password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Old Password */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Old Password
            </label>

            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder="Enter old password"
                className={inputClass}
              />

              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* New Password */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              New Password
            </label>

            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className={inputClass}
              />

              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Password must be at least 6 characters.
            </p>
          </div>

          {/* Confirm Password */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Confirm New Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className={inputClass}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Button */}

          <div className="flex justify-end pt-3">
            <AppButton type="submit" disabled={loading}>
              {loading ? "Changing Password..." : "Change Password"}
            </AppButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
