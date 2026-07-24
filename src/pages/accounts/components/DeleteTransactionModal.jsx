import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import AppModal from "../../../components/common/AppModal";
import AppButton from "../../../components/common/AppButton";

const DeleteTransactionModal = ({ open, onClose, transaction }) => {
  const deleteTransaction = useMutation(api.transactions.deleteTransaction);

  const handleDelete = async () => {
    try {
      await deleteTransaction({
        id: transaction._id,
      });

      toast.success("Transaction deleted successfully");
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AppModal
      open={open}
      onClose={onClose}
      title="⚠ Delete Transaction"
      footer={
        <div className="flex justify-end gap-3">
          <AppButton variant="secondary" onClick={onClose}>
            Cancel
          </AppButton>

          <AppButton variant="danger" onClick={handleDelete}>
            Delete
          </AppButton>
        </div>
      }
    >
      <p className="text-slate-600">
        Are you sure you want to delete this transaction?
      </p>

      <p className="mt-2 font-semibold text-red-500">
        This action cannot be undone.
      </p>
    </AppModal>
  );
};

export default DeleteTransactionModal;
