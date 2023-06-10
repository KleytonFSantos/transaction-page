import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";

const token: string | null = typeof window !== "undefined" ? localStorage.getItem("token") : null;

const config = {
  headers: {
    Authorization: "Bearer " + token,
  },
};


export function useLogoutUser() {
  const queryClient = useQueryClient();

  const router = useRouter();

  const logout = useMutation(
    () => {  
      return axios.get(
        process.env.NEXT_PUBLIC_API_BASE_URL + "logout",
        config
      );
    },
    {
      onSuccess: (data) => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        router.push('/login');
      },
      onError: (error) => {
        console.log('Error: ' +  error);
      },
      onSettled: () => {
        queryClient.invalidateQueries('create');
      }
    }
  );

  return logout;
}
