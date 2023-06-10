import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const token: string | null = typeof window !== "undefined" ? localStorage.getItem("token") : null;

const config = {
  headers: {
    Authorization: "Bearer " + token,
  },
};

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  const deleteTransaction = useMutation(
    (transactionId: number | undefined) => {
      return axios.delete(
        "https://transaction-api-ma1f.onrender.com/api/" + "delete-transaction/" + transactionId,
        config
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("transactions");
      },
    }
  );

  return deleteTransaction;
}
