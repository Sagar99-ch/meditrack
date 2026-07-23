import { Boxes, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import AppButton from "../../components/common/AppButton";
import StockUpdateForm from "../../components/stock/StockUpdateForm";

const StockUpdate = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Boxes size={30} />

              <h1 className="text-3xl font-bold">Stock Update</h1>
            </div>

            <p className="mt-2 text-blue-100">
              Increase or decrease medicine stock manually.
            </p>
          </div>

          <AppButton variant="secondary" onClick={() => navigate("/medicines")}>
            <ArrowLeft size={18} />
            Back
          </AppButton>
        </div>
      </div>

      {/* Form */}

      <StockUpdateForm />
    </div>
  );
};

export default StockUpdate;
