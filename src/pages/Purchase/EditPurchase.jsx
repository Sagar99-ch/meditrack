import { ArrowLeft, Pencil } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

import AppButton from "../../components/common/AppButton";
import PurchaseForm from "../../components/purchase/PurchaseForm";

const EditPurchase = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const purchase = useQuery(api.purchases.getPurchaseById, {
    id,
  });

  if (purchase === undefined) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (purchase === null) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Purchase Not Found
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Pencil size={30} />
              <h1 className="text-3xl font-bold">Edit Purchase</h1>
            </div>

            <p className="mt-2 text-orange-100">
              Update purchase invoice details.
            </p>
          </div>

          <AppButton variant="secondary" onClick={() => navigate("/purchase")}>
            <ArrowLeft size={18} />
            Back
          </AppButton>
        </div>
      </div>

      <PurchaseForm mode="edit" purchase={purchase} />
    </div>
  );
};

export default EditPurchase;
