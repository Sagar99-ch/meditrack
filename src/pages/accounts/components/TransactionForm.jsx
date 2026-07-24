import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import { api } from "../../../../convex/_generated/api";
import AppInput from "../../../components/common/AppInput";
import AppButton from "../../../components/common/AppButton";
import AppSelect from "../../../components/common/AppSelect";
import AppTextarea from "../../../components/common/AppTextarea";

const TransactionForm = () => {
  const addTransaction = useMutation(api.transactions.addTransaction);

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      transactionType: "Expense",
      paymentMethod: "Cash",
      transactionDate: new Date().toISOString().split("T")[0],
    },
  });

  const transactionType = watch("transactionType");

  const incomeCategories = [
    { label: "Medicine Sale", value: "Medicine Sale" },
    { label: "Consultation", value: "Consultation" },
    { label: "Online Payment", value: "Online Payment" },
    { label: "Investment", value: "Investment" },
    { label: "Other Income", value: "Other Income" },
  ];

  const expenseCategories = [
    { label: "Medicine Purchase", value: "Medicine Purchase" },
    { label: "Staff Salary", value: "Staff Salary" },
    { label: "Electricity Bill", value: "Electricity Bill" },
    { label: "Rent", value: "Rent" },
    { label: "Transport", value: "Transport" },
    { label: "Maintenance", value: "Maintenance" },
    { label: "Internet", value: "Internet" },
    { label: "Other Expense", value: "Other Expense" },
  ];

  const onSubmit = async (data) => {
    try {
      await addTransaction({
        transactionType: data.transactionType,
        category: data.category,
        partyName: data.partyName,
        amount: Number(data.amount),
        paymentMethod: data.paymentMethod,
        transactionDate: data.transactionDate,
        referenceNo: data.referenceNo,
        notes: data.notes,
      });

      toast.success("Transaction Added Successfully");

      reset({
        transactionType: "Expense",
        paymentMethod: "Cash",
        transactionDate: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Transaction Details */}

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">💰 Transaction Details</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AppSelect
            label="Transaction Type"
            options={[
              {
                label: "Income",
                value: "Income",
              },
              {
                label: "Expense",
                value: "Expense",
              },
            ]}
            {...register("transactionType")}
          />

          <AppSelect
            label="Category"
            options={
              transactionType === "Income"
                ? incomeCategories
                : expenseCategories
            }
            {...register("category")}
          />

          <AppInput
            label="Party Name"
            placeholder="Enter customer / supplier name"
            {...register("partyName", {
              required: true,
            })}
          />

          <AppInput
            type="number"
            label="Amount"
            placeholder="Enter amount"
            {...register("amount", {
              valueAsNumber: true,
              required: true,
            })}
          />

          <AppSelect
            label="Payment Method"
            options={[
              {
                label: "Cash",
                value: "Cash",
              },
              {
                label: "UPI",
                value: "UPI",
              },
              {
                label: "Bank Transfer",
                value: "Bank Transfer",
              },
              {
                label: "Credit Card",
                value: "Credit Card",
              },
              {
                label: "Debit Card",
                value: "Debit Card",
              },
              {
                label: "Cheque",
                value: "Cheque",
              },
            ]}
            {...register("paymentMethod")}
          />

          <AppInput
            type="date"
            label="Transaction Date"
            {...register("transactionDate")}
          />

          <AppInput
            label="Reference No."
            placeholder="Optional"
            {...register("referenceNo")}
          />
        </div>

        <div className="mt-6">
          <AppTextarea
            label="Notes"
            placeholder="Write transaction notes..."
            {...register("notes")}
          />
        </div>
      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-4">
        <AppButton type="button" variant="secondary" onClick={() => reset()}>
          Reset
        </AppButton>

        <AppButton type="submit">Save Transaction</AppButton>
      </div>
    </form>
  );
};

export default TransactionForm;
