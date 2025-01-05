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

export const useRemoveOrder = () => {
  const removeOrder = async (orderId: string): Promise<Response | void> => {
    const response = await fetch(`${API_BASE_URL}/api/user/order/${orderId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ orderId }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  };

  const {
    mutate: unorder,
    error: unorderError,
    isLoading: isUnorderLoading,
    isSuccess: isUnorderSuccess,
    isError: isUnorderError,
  } = useMutation(removeOrder);

  return { unorder, unorderError, isUnorderLoading, isUnorderError, isUnorderSuccess };
};

export const useUpdateOrderQuantity = () => {
  interface Props {
    orderId: string;
    quantity: number;
  }

  const update = async ({ orderId, quantity }: Props): Promise<Response | void> => {
    const response = await fetch(`${API_BASE_URL}/api/user/order/quantity`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ orderId, quantity }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  };

  const {
    mutate: updateQuantity,
    isError: isUpdateError,
    isLoading: isUpdating,
    error: updateError,
  } = useMutation(update);

  return { updateQuantity, isUpdateError, isUpdating, updateError };
};

export const useGetOrder = (orderId: string | undefined) => {
  const getOrder = async () => {
    const response = await fetch(`${API_BASE_URL}/api/user/order/${orderId}`, {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  };

  const { error, isError, isLoading, data: order } = useQuery("getOrder", getOrder);

  return { isError, error, isLoading, order };
};
