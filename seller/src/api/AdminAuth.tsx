import { useMutation } from "react-query";
import { LoginFormValues } from "../types/Types";

const API_BASE_URL = "http://localhost:7000";

export const useLogin = () => {
  const login = async (values: LoginFormValues): Promise<Response | void> => {
    const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: "post",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }

    return response.json();
  };

  const { mutate: LogIn, isSuccess, isLoading, isError, error } = useMutation(login);

  return { LogIn, isSuccess, isLoading, isError, error };
};

export const useLogout = () => {
  const logout = async (): Promise<Response | void> => {
    const response = await fetch(`${API_BASE_URL}/api/admin/logout`, {
      method: "get",
      credentials: "include",
    });

    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }

    return response.json();
  };

  const { mutate: Logout, isSuccess, isLoading, isError, error } = useMutation(logout);

  return { Logout, isSuccess, isLoading, isError, error };
};
