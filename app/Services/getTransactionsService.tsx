import axios from "axios";

export const getTransactionsService = () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const getTransactions = async () => {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_BASE_URL + "transactions",
      config
    );
    return res.data;
  };

  return { getTransactions }
};
