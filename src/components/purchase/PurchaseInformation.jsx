const PurchaseInformation = ({ register, supplierOptions }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold">Purchase Information</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <select
          {...register("supplierId", {
            required: "Supplier is required",
          })}
          className="h-11 w-full rounded-xl border border-slate-300 px-4"
        >
          <option value="">Select Supplier</option>

          {supplierOptions.map((supplier) => (
            <option key={supplier.value} value={supplier.value}>
              {supplier.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PurchaseInformation;
