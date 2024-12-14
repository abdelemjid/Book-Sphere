import { AdminRegisterFormValues, LoginFormValues, UserRegisterFormValues } from "./types/Types";

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
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(values),
  });

  return response;
};

//----------------------- ADMIN -----------------------

export const loginAdmin = async (values: LoginFormValues): Promise<Response> => {
  return fetch(`${backendUrl}/api/admin/login`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(values),
  });
};

export const registerAdmin = async (values: AdminRegisterFormValues): Promise<Response> => {
  return fetch(`${backendUrl}/api/admin/register`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(values),
  });
};

export const adminBooks = async (): Promise<Response> => {
  return fetch(`${backendUrl}/api/admin/books`, {
    method: "get",
    credentials: "include",
  });
};
