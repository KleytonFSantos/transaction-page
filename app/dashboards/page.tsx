"use client";
import TransactionNavbar from "../components/Dashboard/Navbar";
import TransactionTable from "../components/Dashboard/TransactionTable";
import TransactionCard from "../components/Dashboard/Card";
import { useQuery } from "react-query";
import { getTransactionsService } from "../Services/getTransactionsService";
import { transactionCalculations } from "../utils/transactionCalculations";
import CircleSVG from "../components/CircleSVG";

export default function Dashboard() {
  const { getTransactions } = getTransactionsService();

  const { data, isLoading, error } = useQuery("transactions", getTransactions);

  const { totalExpenses, totalIncomes, totalValue } = transactionCalculations(data)

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-1 align-middle justify-center px-6 py-12 lg:px-8">
        <CircleSVG />
      </div>
    );
  }

  return (
    <div className="lg:w-full justify-center items-center flex">
      <div className="lg:w-2/3">
        <TransactionNavbar />
        <div className="flex gap-2 justify-center p-2 mt-11">
          <TransactionCard title="Incomes" value={totalIncomes} />
          <TransactionCard title="Expenses" value={totalExpenses} />
          <TransactionCard
            title="Total"
            value={Number.isNaN(totalValue) ? 0 : totalValue}
          />
        </div>
        <div className="p-2">
          <TransactionTable transactions={data} />
        </div>
      </div>
    </div>
  );
}
