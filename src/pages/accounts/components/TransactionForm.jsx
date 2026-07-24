import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import { api } from "../../../../convex/_generated/api";
import AppInput from "../../../components/common/AppInput";
import AppButton from "../../../components/common/AppButton";
import AppSelect from "../../../components/common/AppSelect";
import AppTextarea from "../../../components/common/AppTextarea";
import { useNavigate } from "react-router-dom";
const TransactionForm = ({ initialData = null, onSuccess }) => {
  const addTransaction = useMutation(api.transactions.addTransaction);

  const navigate = useNavigate();
  const updateTransaction = useMutation(api.transactions.updateTransaction);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialData || {
      transactionType: "Expense",
      category: "",
      partyName: "",
      amount: "",
      paymentMethod: "Cash",
      transactionDate: new Date().toISOString().split("T")[0],
      referenceNo: "",
      notes: "",
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
      if (initialData) {
        await updateTransaction({
          id: initialData._id,

          transactionType: data.transactionType,
          category: data.category,
          partyName: data.partyName,
          amount: Number(data.amount),
          paymentMethod: data.paymentMethod,
          transactionDate: data.transactionDate,
          referenceNo: data.referenceNo || "",
          notes: data.notes || "",
        });

        toast.success("Transaction Updated Successfully");
      } else {
        await addTransaction({
          transactionType: data.transactionType,
          category: data.category,
          partyName: data.partyName,
          amount: Number(data.amount),
          paymentMethod: data.paymentMethod,
          transactionDate: data.transactionDate,
          referenceNo: data.referenceNo || "",
          notes: data.notes || "",
        });

        toast.success("Transaction Added Successfully");
      }

      onSuccess?.();
    } catch (error) {
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
            required
            error={errors.transactionType}
            options={[
              { label: "Income", value: "Income" },
              { label: "Expense", value: "Expense" },
            ]}
            {...register("transactionType", {
              required: "Transaction Type is required",
            })}
          />

          <AppSelect
            label="Category"
            required
            error={errors.category}
            options={
              transactionType === "Income"
                ? incomeCategories
                : expenseCategories
            }
            {...register("category", {
              required: "Category is required",
            })}
          />

          <AppInput
            label="Party Name"
            required
            error={errors.partyName}
            placeholder="Enter customer / supplier name"
            {...register("partyName", {
              required: "Party Name is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
            })}
          />
          <AppInput
            type="number"
            label="Amount"
            required
            error={errors.amount}
            placeholder="Enter amount"
            {...register("amount", {
              valueAsNumber: true,
              required: "Amount is required",
              min: {
                value: 1,
                message: "Amount must be greater than 0",
              },
            })}
          />
          <AppSelect
            label="Payment Method"
            required
            error={errors.paymentMethod}
            options={[
              { label: "Cash", value: "Cash" },
              { label: "UPI", value: "UPI" },
              { label: "Bank Transfer", value: "Bank Transfer" },
              { label: "Credit Card", value: "Credit Card" },
              { label: "Debit Card", value: "Debit Card" },
              { label: "Cheque", value: "Cheque" },
            ]}
            {...register("paymentMethod", {
              required: "Payment Method is required",
            })}
          />

          <AppInput
            type="date"
            label="Transaction Date"
            required
            error={errors.transactionDate}
            {...register("transactionDate", {
              required: "Date is required",
            })}
          />

          <AppInput
            label="Reference No."
            error={errors.referenceNo}
            {...register("referenceNo")}
          />
        </div>

        <div className="mt-6">
          <AppTextarea
            label="Notes"
            placeholder="Write transaction notes..."
            rows={5}
            maxLength={300}
            error={errors.notes}
            {...register("notes", {
              maxLength: {
                value: 300,
                message: "Maximum 300 characters allowed",
              },
            })}
          />
        </div>
      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-4">
        <AppButton type="button" variant="secondary" onClick={() => reset()}>
          Reset
        </AppButton>

        <AppButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Transaction"}
        </AppButton>
      </div>
    </form>
  );
};

export default TransactionForm;
