import { Pencil, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

const getStatus = (stock, minimumStock) => {
  if (stock === 0) {
    return {
      text: "Out of Stock",
      className: "bg-red-100 text-red-700",
    };
  }

  if (stock <= minimumStock) {
    return {
      text: "Low Stock",
      className: "bg-yellow-100 text-yellow-700",
    };
  }

  return {
    text: "In Stock",
    className: "bg-green-100 text-green-700",
  };
};

const MedicineTable = ({ medicines }) => {
  const navigate = useNavigate();
  const deleteMedicine = useMutation(api.medicines.deleteMedicine);

  const handleDelete = async (id, medicineName) => {
    const confirmed = window.confirm(`Delete "${medicineName}" ?`);

    if (!confirmed) return;

    try {
      await deleteMedicine({
        id,
      });

      toast.success(`${medicineName} deleted successfully.`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete medicine.");
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr className="text-left text-sm text-slate-700">
              <th className="px-5 py-4">Medicine</th>
              <th className="px-5 py-4">Company</th>
              <th className="px-5 py-4">Batch</th>
              <th className="px-5 py-4">Expiry</th>
              <th className="px-5 py-4">Stock</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {medicines.map((medicine) => {
              const status = getStatus(medicine.stock, medicine.minimumStock);

              return (
                <tr
                  key={medicine._id}
                  className="border-t border-slate-200 hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {medicine.medicineName}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {medicine.category}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-4">{medicine.company}</td>

                  <td className="px-5 py-4">{medicine.batchNumber}</td>

                  <td className="px-5 py-4">
                    {format(new Date(medicine.expiryDate), "dd MMM yyyy")}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-lg bg-slate-100 px-3 py-1 font-medium">
                      {medicine.stock}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
                    >
                      {status.text}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          navigate(`/medicines/view/${medicine._id}`)
                        }
                        className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-100"
                        title="View"
                      >
                        <Eye size={18} className="text-slate-600" />
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/medicines/edit/${medicine._id}`)
                        }
                        className="rounded-lg border border-slate-200 p-2 transition hover:bg-blue-50"
                        title="Edit"
                      >
                        <Pencil size={18} className="text-blue-600" />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(medicine._id, medicine.medicineName)
                        }
                        className="rounded-lg border border-slate-200 p-2 transition hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicineTable;
