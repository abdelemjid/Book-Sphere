const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

export const loginUser = async (values: any): Promise<Response> => {
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
