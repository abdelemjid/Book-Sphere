import { useMutation, useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL as string;

interface Props {
  bookId: string;
  quantity: number;
}

export const useOrderBook = () => {
  const order = async ({ bookId, quantity }: Props): Promise<Response | void> => {
    const response = await fetch(`${API_BASE_URL}/api/user/order`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookId, quantity }),
    });

    const res = await response.json();
    if (!response.ok) {
      throw new Error(res.message);
    }

    return res;
  };

  const {
    mutate: orderBook,
    isError: isOrderError,
    isLoading: isOrderLoading,
    error: orderError,
  } = useMutation({ mutationFn: order, mutationKey: "orderBook" });

  return { orderBook, isOrderError, isOrderLoading, orderError };
};

export const useGetOrders = () => {
  const orders = async () => {
    const response = await fetch(`${API_BASE_URL}/api/user/orders`, {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  };

  const { error, isError, isLoading, data } = useQuery("getOrders", orders);

  return { isError, error, isLoading, data };
};
