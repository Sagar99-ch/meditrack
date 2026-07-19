import AppButton from "../common/AppButton";
import PurchaseItemsTable from "./PurchaseItemsTable";
import PurchaseInformation from "./PurchaseInformation";
import PurchaseSummary from "./PurchaseSummary";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";
import { useState } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { useMutation, useQuery } from "convex/react";

const PurchaseForm = () => {
  const methods = useForm({
    defaultValues: {
      supplierId: "",
      invoiceNumber: `PUR-${Date.now()}`,
      purchaseDate: new Date().toISOString().split("T")[0],
      paymentMethod: "Cash",

      subtotal: 0,
      gstTotal: 0,
      discount: 0,
      grandTotal: 0,

      paidAmount: 0,
      dueAmount: 0,

      notes: "",
      items: [
        {
          medicineId: "",
          medicineName: "",
          batchNumber: "",
          expiryDate: "",

          quantity: 1,
          purchasePrice: 0,
          gst: 0,
          amount: 0,
        },
      ],
    },
  });

  const suppliers = useQuery(api.suppliers.getSuppliers) || [];
  console.log("Suppliers:", suppliers);
  const addPurchase = useMutation(api.purchases.addPurchase);
  const [isSaving, setIsSaving] = useState(false);
  const supplierOptions = suppliers.map((supplier) => ({
    value: supplier._id,
    label: supplier.supplierName,
  }));

  const { control, register, handleSubmit, reset } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = async (data) => {
    console.log(data);
    setIsSaving(true);

    try {
      const supplier = suppliers.find((s) => s._id === data.supplierId);

      await addPurchase({
        supplierId: data.supplierId,
        supplierName: supplier?.supplierName || "",

        invoiceNumber: data.invoiceNumber,
        purchaseDate: data.purchaseDate,
        paymentMethod: data.paymentMethod,

        items: data.items,

        subtotal: data.subtotal,
        gstTotal: data.gstTotal,
        discount: data.discount,
        grandTotal: data.grandTotal,

        paidAmount: data.paidAmount,
        dueAmount: data.dueAmount,

        notes: data.notes || "",
      });

      toast.success("Purchase Added Successfully");

      reset({
        supplierId: "",
        invoiceNumber: `PUR-${Date.now()}`,
        purchaseDate: new Date().toISOString().split("T")[0],
        paymentMethod: "Cash",

        subtotal: 0,
        gstTotal: 0,
        discount: 0,
        grandTotal: 0,

        paidAmount: 0,
        dueAmount: 0,

        notes: "",

        items: [
          {
            medicineId: "",
            medicineName: "",
            batchNumber: "",
            expiryDate: "",

            quantity: 1,
            purchasePrice: 0,
            gst: 0,
            amount: 0,
          },
        ],
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to Save Purchase");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <PurchaseInformation
          register={register}
          supplierOptions={supplierOptions}
        />

        <PurchaseItemsTable fields={fields} append={append} remove={remove} />
        <PurchaseSummary />
        <div className="flex justify-end">
          <AppButton type="submit">Save Purchase</AppButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default PurchaseForm;
