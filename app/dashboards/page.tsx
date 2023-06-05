"use client";
import TransactionNavbar from "../components/Dashboard/Navbar";
import TransactionTable from "../components/Dashboard/TransactionTable";
import TransactionCard from "../components/Dashboard/Card";
import axios from "axios";
import { useQuery } from "react-query";

const getTransactions = async () => {
  const res = await axios.get("http://api-docker.online/api/teste");
  return res.data;
};

export default function Dashboard() {
  const { data, isLoading, error } = useQuery("transactions", getTransactions);

  const expenses = data?.filter((item: any) => item.type === "expense");
  const totalExpenses = expenses?.reduce(
    (acc: number, item: any) => acc + item.amount,
    0
  );
  const incomes = data?.filter((item: any) => item.type === "income");
  const totalIncomes = incomes?.reduce(
    (acc: number, item: any) => acc + item.amount,
    0
  );

  const totalValue = (totalIncomes - totalExpenses)

  return (
    <>
      <TransactionNavbar />
      <div className="flex gap-2 justify-center p-2">
        <TransactionCard title="Incomes" value={totalIncomes} />
        <TransactionCard title="Expenses" value={totalExpenses} />
        <TransactionCard title="Total" value={Number.isNaN(totalValue) ? 0 : totalValue} />
      </div>
      <div className="p-2">
        <TransactionTable data={data} />
      </div>
    </>
  );
}
