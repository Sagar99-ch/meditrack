import { Pill } from "lucide-react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="grid min-h-[700px] lg:grid-cols-2">
          {/* Left Section */}
          <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 p-14 text-white lg:flex lg:flex-col lg:justify-between">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/10"></div>

            {/* Top */}
            <div className="relative z-10">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                  <Pill size={34} />
                </div>

                <div>
                  <h1 className="text-4xl font-bold">MediTrack</h1>

                  <p className="text-blue-100">Pharmacy Management System</p>
                </div>
              </div>
            </div>

            {/* Center */}
            <div className="relative z-10 max-w-lg">
              <h2 className="text-6xl font-extrabold leading-tight">
                Smart Pharmacy Management
              </h2>

              <p className="mt-8 text-xl leading-9 text-blue-100">
                Manage medicines, purchases, sales, suppliers, reports and
                inventory from one powerful dashboard.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-5">
                <div className="rounded-2xl bg-white/15 p-5 backdrop-blur-md">
                  <h3 className="text-3xl font-bold">5000+</h3>

                  <p className="mt-1 text-blue-100">Medicines Managed</p>
                </div>

                <div className="rounded-2xl bg-white/15 p-5 backdrop-blur-md">
                  <h3 className="text-3xl font-bold">100%</h3>

                  <p className="mt-1 text-blue-100">Secure Inventory</p>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="relative z-10">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
                <p className="text-lg leading-8 text-blue-50">
                  Built for modern medical stores with complete inventory,
                  purchase, sales and reporting management.
                </p>
              </div>
            </div>

            {/* Decorative Circles */}
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10"></div>

            <div className="absolute -bottom-28 -left-28 h-96 w-96 rounded-full bg-white/10"></div>
          </div>

          {/* Right Section */}
          <div className="flex items-center justify-center bg-white p-8 lg:p-16">
            <div className="w-full max-w-md">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
