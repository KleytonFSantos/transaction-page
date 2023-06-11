"use client";
import TransactionNavbar from "../components/Dashboard/Navbar";
import TransactionTable from "../components/Dashboard/TransactionTable";
import TransactionCard from "../components/Dashboard/Card";
import { useQuery } from "react-query";
import { getTransactionsService } from "../Services/getTransactionsService";
import Container from "postcss/lib/container";

export default function Dashboard() {
  const { getTransactions } = getTransactionsService();

  const { data, isLoading, error } = useQuery("transactions", getTransactions);

  const expenses = data?.filter((item: any) => item.type === "expense");
  const totalExpenses = expenses?.reduce(
    (acc: number, item: any) => acc + parseFloat(item.amount),
    0
  );
  const incomes = data?.filter((item: any) => item.type === "income");
  const totalIncomes = incomes?.reduce(
    (acc: number, item: any) => acc + parseFloat(item.amount),
    0
  );

  const totalValue = totalIncomes - totalExpenses;

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
          <TransactionTable data={data} />
        </div>
      </div>
    </div>
  );
}
