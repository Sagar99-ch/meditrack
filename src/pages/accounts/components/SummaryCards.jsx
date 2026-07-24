import { useQuery } from "convex/react";
import { IndianRupee, ArrowDownCircle, Wallet, Receipt } from "lucide-react";

import { api } from "../../../../convex/_generated/api";

const SummaryCards = () => {
  const transactions = useQuery(api.transactions.getTransactions);

  if (transactions === undefined) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-32 animate-pulse rounded-2xl bg-slate-200"
          />
        ))}
      </div>
    );
  }

  const totalIncome = transactions
    .filter((item) => item.transactionType === "Income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = transactions
    .filter((item) => item.transactionType === "Expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const netBalance = totalIncome - totalExpense;

  const totalTransactions = transactions.length;

  const cards = [
    {
      title: "Total Income",
      value: totalIncome,
      icon: IndianRupee,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Total Expense",
      value: totalExpense,
      icon: ArrowDownCircle,
      bg: "bg-red-100",
      text: "text-red-600",
    },
    {
      title: "Net Balance",
      value: netBalance,
      icon: Wallet,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Transactions",
      value: totalTransactions,
      icon: Receipt,
      bg: "bg-purple-100",
      text: "text-purple-600",
      isCount: true,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{card.title}</p>

                <h2 className="mt-3 text-3xl font-bold text-slate-800">
                  {card.isCount
                    ? card.value
                    : `₹${card.value.toLocaleString()}`}
                </h2>
              </div>

              <div className={`rounded-xl p-4 ${card.bg}`}>
                <Icon className={card.text} size={30} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
