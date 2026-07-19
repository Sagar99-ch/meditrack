import AppInput from "../common/AppInput";

import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const PurchaseSummary = () => {
  const { control, register, setValue } = useFormContext();
  const items =
    useWatch({
      control,
      name: "items",
    }) || [];

  const discount = Number(
    useWatch({
      control,
      name: "discount",
    }) || 0
  );

  const paidAmount = Number(
    useWatch({
      control,
      name: "paidAmount",
    }) || 0
  );

  const subtotal = items.reduce((total, item) => {
    return (
      total + (Number(item.quantity) || 0) * (Number(item.purchasePrice) || 0)
    );
  }, 0);

  const gstTotal = items.reduce((total, item) => {
    const itemSubtotal =
      (Number(item.quantity) || 0) * (Number(item.purchasePrice) || 0);

    return total + itemSubtotal * ((Number(item.gst) || 0) / 100);
  }, 0);

  const grandTotal = subtotal + gstTotal - discount;

  const dueAmount = grandTotal - paidAmount;
  useEffect(() => {
    setValue("subtotal", subtotal);
    setValue("gstTotal", gstTotal);
    setValue("grandTotal", grandTotal);
    setValue("dueAmount", dueAmount);
  }, [subtotal, gstTotal, grandTotal, dueAmount, setValue]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold">Payment Summary</h2>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <strong>₹ {subtotal.toFixed(2)}</strong>
          </div>

          <div className="flex justify-between">
            <span>Total GST</span>
            <strong>₹ {gstTotal.toFixed(2)}</strong>
          </div>

          <div className="flex justify-between text-xl font-bold">
            <span>Grand Total</span>
            <span className="text-blue-600">₹ {grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-5">
          <AppInput
            type="number"
            label="Discount"
            {...register("discount", {
              valueAsNumber: true,
            })}
          />

          <AppInput
            type="number"
            label="Paid Amount"
            {...register("paidAmount", {
              valueAsNumber: true,
            })}
          />

          <div className="rounded-xl bg-red-50 border border-red-200 p-3">
            <p className="text-sm text-slate-500">Due Amount</p>

            <h2 className="text-2xl font-bold text-red-600">
              ₹ {dueAmount.toFixed(2)}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSummary;
