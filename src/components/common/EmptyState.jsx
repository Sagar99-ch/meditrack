import { Pill } from "lucide-react";

const EmptyState = ({
  title = "No Medicines Found",
  description = 'Click the "Add Medicine" button above to add your first medicine.',
}) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white py-20">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
          <Pill className="h-12 w-12 text-blue-600" />
        </div>

        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>

        <p className="mt-3 text-slate-500">{description}</p>
      </div>
    </div>
  );
};

export default EmptyState;
