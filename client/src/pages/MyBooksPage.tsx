import { useEffect, useState } from "react";
import { useGetOrders, useUpdateOrderQuantity } from "../api/OrderApi";
import { OrderType } from "../types/Types";
import Order from "../components/Order";
import notFoundImg from "../assets/not_found.svg";
import { useNavigate } from "react-router";

const MyBooksPage = () => {
  const [orders, setOrders] = useState<OrderType[] | undefined>(undefined);
  const [selected, setSeletect] = useState<string[] | undefined>(undefined);
  const navigate = useNavigate();
  const { data: myOrders, isError, error, isLoading, refetchOrders } = useGetOrders();
  const { updateQuantity } = useUpdateOrderQuantity();

  const updateOrderQuantity = async (orderId: string, quantity: number) => {
    updateQuantity({ orderId, quantity });
    await new Promise((resolver) => setTimeout(resolver, 500));
    refetchOrders({ fetching: true });
  };

  const confirmSelected = async () => {
    const url = `/confirm/${selected?.map((id) => id).join(",")}`;
    navigate(url);
  };

  useEffect(() => {
    setOrders(myOrders);
  }, [myOrders, isLoading]);

  if (isLoading) {
    return (
      <h1 className="h-full flex justify-center items-center text-center text-2xl">Loading...</h1>
    );
  }

  if (isError && error && !isLoading) {
    return (
      <div className="my-10 flex flex-col justify-center items-center gap-5">
        <img src={notFoundImg} alt="not-found image" className="w-[250px]" />
        <h1 className="text-2xl text-center">{(error as Error).message}</h1>
      </div>
    );
  }

  return (
    <div className="my-10">
      <div className="container space-y-3">
        <div className="flex flex-row justify-between">
          <h1 className="text-lg">My Orders</h1>
          <button
            onClick={confirmSelected}
            disabled={!selected || selected?.length === 0}
            className="rounded-md bg-third-100 hover:bg-third-100/95 disabled:bg-third-100/30 px-5 py-1 text-black font-semibold"
          >
            Confirm Selected
          </button>
        </div>

        {orders?.map((order) => (
          <Order
            key={order._id}
            order={order}
            updateOrderQuantity={updateOrderQuantity}
            setSelected={setSeletect}
          />
        ))}
      </div>
    </div>
  );
};

export default MyBooksPage;
