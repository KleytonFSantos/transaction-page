import axios from "axios";
import { FormSchemaType } from "../login/page";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";

export function useLoginUser() {
  const queryClient = useQueryClient();

  const router = useRouter();

  const login = useMutation(
    (user: FormSchemaType) => {
      return axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + "login", user);
    },
    {
      onSuccess: (data) => {
        router.push("/dashboards");
        const token = data.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("email", data.data.user.email);
      },
      onError: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
      },
      onSettled: () => {
        queryClient.invalidateQueries("create");
      },
    }
  );

  return login;
}
