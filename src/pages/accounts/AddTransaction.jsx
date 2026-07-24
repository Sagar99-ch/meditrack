import TransactionForm from "./components/TransactionForm";

const AddTransaction = () => {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold">💰 Add Transaction</h1>

        <p className="mt-2 text-slate-500">
          Record all income and expense transactions.
        </p>
      </div>

      <TransactionForm />
    </div>
  );
};

export default AddTransaction;
