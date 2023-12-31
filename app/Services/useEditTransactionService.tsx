import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { EditTransactionFormSchemaType } from "../components/Modal";

const token: string | null = typeof window !== "undefined" ? localStorage.getItem("token") : null;

const config = {
  headers: {
    Authorization: "Bearer " + token,
  },
};

export function useSaveTransaction() {
  const queryClient = useQueryClient();

  const saveTransaction = useMutation(
    (transaction: EditTransactionFormSchemaType) => {
      console.log(transaction);
      const url = transaction.id
        ? process.env.NEXT_PUBLIC_API_BASE_URL + "update-transaction/" + transaction.id
        : process.env.NEXT_PUBLIC_API_BASE_URL + "add-transaction";
      const method = transaction.id ? "PUT" : "POST";

      return axios.request({
        url,
        method,
        data: transaction,
        ...config,
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("transactions");
        queryClient.invalidateQueries("filteredTransactions");
      },
      onError: () => {
        console.log("error");
      },
    }
  );

  return saveTransaction;
}