import axios from "axios";

export const getTransactionsService = () => {
  const token: string | null = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const getTransactions = async () => {
    const res = await axios.get(
     "http://api-docker.online/api/" + "transactions",
      config
    );
    return res.data;
  };

  return { getTransactions }
};
