import AppButton from "../common/AppButton";
import PurchaseItemsSection from "./PurchaseItemsSection";
import PurchaseInformation from "./PurchaseInformation";
import PurchaseSummary from "./PurchaseSummary";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { useMutation, useQuery } from "convex/react";

const PurchaseForm = ({ mode = "add", purchase = null }) => {
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
          medicineName: "",
          genericName: "",
          company: "",
          category: "",
          unit: "",

          batchNumber: "",
          manufacturingDate: "",
          expiryDate: "",
          rackLocation: "",

          purchasePrice: 0,
          sellingPrice: 0,
          gst: 0,
          quantity: 1,
        },
      ],
    },
  });
  const updatePurchase = useMutation(api.purchases.updatePurchase);
  const suppliers = useQuery(api.suppliers.getSuppliers) || [];
  const addPurchase = useMutation(api.purchases.addPurchase);
  const [isSaving, setIsSaving] = useState(false);
  const supplierOptions = suppliers.map((supplier) => ({
    value: supplier._id,
    label: supplier.supplierName,
  }));

  const { control, register, handleSubmit, reset } = methods;

  useEffect(() => {
    if (mode === "edit" && purchase) {
      reset({
        supplierId: purchase.supplierId || "",
        invoiceNumber: purchase.invoiceNumber || "",
        purchaseDate: purchase.purchaseDate || "",
        paymentMethod: purchase.paymentMethod || "Cash",

        subtotal: purchase.subtotal || 0,
        gstTotal: purchase.gstTotal || 0,
        discount: purchase.discount || 0,
        grandTotal: purchase.grandTotal || 0,

        paidAmount: purchase.paidAmount || 0,
        dueAmount: purchase.dueAmount || 0,

        notes: purchase.notes || "",

        items:
          purchase.items?.length > 0
            ? purchase.items
            : [
                {
                  medicineName: "",
                  genericName: "",
                  company: "",
                  category: "",
                  unit: "",

                  batchNumber: "",
                  manufacturingDate: "",
                  expiryDate: "",
                  rackLocation: "",

                  purchasePrice: 0,
                  sellingPrice: 0,
                  gst: 0,
                  quantity: 1,
                },
              ],
      });
    }
  }, [mode, purchase, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = async (data) => {
    console.log(data);

    console.log("Form Submitted");
    console.log("Mode:", mode);
    console.log("Purchase:", purchase);
    console.log("Data:", data);

    setIsSaving(true);

    try {
      const supplier = suppliers.find((s) => s._id === data.supplierId);

      if (mode === "add") {
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
        console.log("calling purchaseUpdate");
      } else {
        await updatePurchase({
          id: purchase._id,

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

        toast.success("Purchase Updated Successfully");
        console.log("afterUpdate");
      }
      if (mode === "add") {
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
              medicineName: "",
              genericName: "",
              company: "",
              category: "",
              unit: "",

              batchNumber: "",
              manufacturingDate: "",
              expiryDate: "",
              rackLocation: "",

              purchasePrice: 0,
              sellingPrice: 0,
              gst: 0,
              quantity: 1,
            },
          ],
        });
      }
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

        <PurchaseItemsSection fields={fields} append={append} remove={remove} />
        <PurchaseSummary />
        <div className="flex justify-end">
          <AppButton type="submit" disabled={isSaving}>
            {mode === "add" ? "Save Purchase" : "Update Purchase"}
          </AppButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default PurchaseForm;
