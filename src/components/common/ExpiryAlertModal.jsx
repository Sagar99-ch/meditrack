import { AlertTriangle } from "lucide-react";

const ExpiryAlertModal = ({ open, medicines, onClose, onViewReport }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center gap-3">
          <AlertTriangle className="text-red-500" size={32} />

          <div>
            <h2 className="text-xl font-bold">Medicine Expiring Today</h2>

            <p className="text-sm text-slate-500">
              Please take immediate action.
            </p>
          </div>
        </div>

        <div className="max-h-60 overflow-y-auto rounded-lg border">
          {medicines.map((medicine) => (
            <div key={medicine._id} className="border-b p-3 last:border-none">
              <p className="font-semibold">{medicine.medicineName}</p>

              <p className="text-sm text-slate-500">
                Batch : {medicine.batchNumber}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border px-4 py-2">
            Close
          </button>

          <button
            onClick={onViewReport}
            className="rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            View Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpiryAlertModal;
