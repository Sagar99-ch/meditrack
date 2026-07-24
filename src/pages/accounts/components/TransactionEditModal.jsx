import TransactionForm from "./TransactionForm";

const TransactionEditModal = ({ open, onClose, transaction }) => {
  if (!open || !transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-3xl rounded-3xl bg-white shadow-xl">
        <div className="border-b p-6">
          <h2 className="text-2xl font-bold">✏️ Edit Transaction</h2>
        </div>

        <div className="max-h-[80vh] overflow-y-auto p-6">
          <TransactionForm initialData={transaction} onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
};

export default TransactionEditModal;
