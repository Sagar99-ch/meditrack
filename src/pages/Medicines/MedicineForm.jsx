import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { medicineSchema } from "./validation/medicineSchema";

import MedicineDetailsSection from "./sections/MedicineDetailsSection";
import PricingSection from "./sections/PricingSection";
import AdditionalSection from "./sections/AdditionalSection";

import AppButton from "../../components/common/AppButton";

const MedicineForm = ({ mode = "add", defaultValues = {}, onSubmit }) => {
  const methods = useForm({
    resolver: zodResolver(medicineSchema),
    defaultValues,
  });

  const submitHandler = (data) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      console.log(data);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submitHandler)}
        className="space-y-6"
      >
        <MedicineDetailsSection />

        <PricingSection />

        <AdditionalSection />

        <div className="flex justify-end gap-4">
          <AppButton variant="secondary">Cancel</AppButton>

          <AppButton type="submit">
            {mode === "add" ? "Save Medicine" : "Update Medicine"}
          </AppButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default MedicineForm;
