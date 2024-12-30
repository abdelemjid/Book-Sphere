import { useQuery } from "react-query";

const API_BASE_URL = "http://localhost:7000";

export const useTokenVerification = () => {
  const verify = async (): Promise<Response | void> => {
    const response = await fetch(`${API_BASE_URL}/api/admin/validate-token`, {
      method: "get",
      credentials: "include",
    });

    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }

    return response.json();
  };

  const { error, isLoading, isSuccess, isError } = useQuery(["verifyToken"], verify, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { isLoading, isSuccess, isError, error };
};
