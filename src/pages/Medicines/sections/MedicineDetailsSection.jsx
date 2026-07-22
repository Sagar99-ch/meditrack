import AppInput from "../../../components/common/AppInput";
import AppSelect from "../../../components/common/AppSelect";

import {
  medicineCategories,
  medicineUnits,
} from "../../../data/medicineOptions";

const MedicineDetailsSection = ({ register, errors, prefix = "" }) => {
  const field = (name) => (prefix ? `${prefix}.${name}` : name);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="mb-6 text-lg font-semibold">Medicine Details</h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <AppInput
          label="Medicine Name"
          required
          placeholder="Enter medicine name"
          {...register(field("medicineName"))}
          error={errors?.medicineName}
        />

        <AppInput
          label="Generic Name"
          placeholder="Enter generic name"
          {...register("genericName")}
          error={errors.genericName}
        />

        <AppInput
          label="Company"
          required
          placeholder="Enter company name"
          {...register("company")}
          error={errors.company}
        />

        <AppSelect
          label="Category"
          required
          options={medicineCategories}
          {...register("category")}
          error={errors.category}
        />

        <AppSelect
          label="Unit"
          required
          options={medicineUnits}
          {...register("unit")}
          error={errors.unit}
        />

        <AppInput
          label="Batch Number"
          required
          placeholder="Enter batch number"
          {...register("batchNumber")}
          error={errors.batchNumber}
        />

        <AppInput
          type="date"
          label="Manufacturing Date"
          {...register("manufacturingDate")}
        />

        <AppInput
          type="date"
          label="Expiry Date"
          required
          {...register("expiryDate")}
          error={errors.expiryDate}
        />
      </div>
    </div>
  );
};

export default MedicineDetailsSection;
