import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL as string;

export const useTokenChcker = () => {
  const checkToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/user/validate`, {
      method: "POST",
      credentials: "include",
    });

    const res = await response.json();
    if (!response.ok) {
      throw new Error(res.message);
    }

    console.log("User token is valid");
    return res;
  };

  const { isSuccess, isError, error } = useQuery("checkToken", checkToken);

  return { isSuccess, isError, error };
};
