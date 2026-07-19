import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import AppButton from "../../components/common/AppButton";
import PurchaseForm from "../../components/purchase/PurchaseForm";

const AddPurchase = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-500 p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <ShoppingCart size={30} />

              <h1 className="text-3xl font-bold">Add Purchase</h1>
            </div>

            <p className="mt-2 text-blue-100">Create a new purchase invoice.</p>
          </div>

          <AppButton variant="secondary" onClick={() => navigate("/purchase")}>
            <ArrowLeft size={18} />
            Back
          </AppButton>
        </div>
      </div>

      <PurchaseForm />
    </div>
  );
};

export default AddPurchase;
