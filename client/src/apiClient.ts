import { LoginFormValues, UserRegisterFormValues } from "./types/Types";

const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

export const loginUser = async (values: LoginFormValues): Promise<Response> => {
  const responnes = fetch(`${backendUrl}/api/user/login`, {
    method: "post",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return responnes;
};

export const registerUser = async (values: UserRegisterFormValues): Promise<Response> => {
  const response = fetch(`${backendUrl}/api/user/register`, {
    method: "post",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return response;
};

export const fetchBooks = async () => {
  return fetch(`${backendUrl}/api/user/books`, {
    method: "get",
    credentials: "include",
  });
};

export const userLogout = async () => {
  return fetch(`${backendUrl}/api/user/logout`, {
    method: "get",
    credentials: "include",
  });
};
