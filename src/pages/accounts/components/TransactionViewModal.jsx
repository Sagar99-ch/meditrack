const DetailRow = ({ label, value }) => (
  <div className="flex justify-between border-b border-slate-100 py-3">
    <span className="font-medium text-slate-600">{label}</span>

    <span className="font-semibold text-slate-800">{value || "-"}</span>
  </div>
);

const TransactionViewModal = ({ open, onClose, transaction }) => {
  if (!open || !transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-bold">👁 Transaction Details</h2>

          <button
            onClick={onClose}
            className="text-3xl text-slate-500 hover:text-red-500"
          >
            ×
          </button>
        </div>

        {/* Body */}

        <div className="space-y-2 p-6">
          <DetailRow
            label="Transaction Type"
            value={transaction.transactionType}
          />

          <DetailRow label="Category" value={transaction.category} />

          <DetailRow label="Party Name" value={transaction.partyName} />

          <DetailRow label="Amount" value={`₹${transaction.amount}`} />

          <DetailRow label="Payment Method" value={transaction.paymentMethod} />

          <DetailRow label="Date" value={transaction.transactionDate} />

          <DetailRow label="Reference" value={transaction.referenceNo} />

          <DetailRow label="Notes" value={transaction.notes} />
        </div>

        {/* Footer */}

        <div className="flex justify-end border-t p-6">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 px-6 py-3 text-white hover:bg-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionViewModal;
