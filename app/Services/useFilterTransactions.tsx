import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { FormEditTransaction } from "../components/Dashboard/TransactionTable";

const token: string | null =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const config = {
  headers: {
    Authorization: "Bearer " + token,
  },
};

export function useFilterTransactions() {
  const queryClient = useQueryClient();

  const filterTransactions = useMutation(
    (data: FormEditTransaction) => {
      return axios.get(
        process.env.NEXT_PUBLIC_API_BASE_URL +
          `transactions?
            description=${data.description}
            &type=${data.type}
            &dateFrom=${data.dateFrom}
            &dateTo=${data.dateTo}
            &orderBy=${data.orderBy}
            &orderTo=${data.orderTo}`,
        config
      );
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("filteredTransaction");
        queryClient.invalidateQueries("transactions");
        queryClient.setQueryData("filteredTransaction", data);
      },
      onError: (error) => {
        console.log("Error: " + error);
      },
      onSettled: () => {
        queryClient.invalidateQueries("transactions");
        queryClient.invalidateQueries("filteredTransaction");
      },
    }
  );

  return filterTransactions;
}
