import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const token = localStorage.getItem("token");

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
        process.env.NEXT_PUBLIC_API_BASE_URL + "delete-transaction/" + transactionId,
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
