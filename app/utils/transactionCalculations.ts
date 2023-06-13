
type Transaction = {
    description: string;
    amount: number;
    type: "expense" | "income";
}

export const transactionCalculations = (data: []) => {
  const expenses = data?.filter((item: Transaction) => item.type === "expense");
  const totalExpenses = expenses?.reduce(
    (acc: number, item: any) => acc + parseFloat(item.amount),
    0
  );

  const incomes = data?.filter((item: Transaction) => item.type === "income");
  const totalIncomes = incomes?.reduce(
    (acc: number, item: any) => acc + parseFloat(item.amount),
    0
  );

  const totalValue = totalIncomes - totalExpenses;

  return { totalExpenses, totalIncomes, totalValue };
};
