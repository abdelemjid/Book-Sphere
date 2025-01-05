import { useEffect, useState } from "react";
import { useGetOrders } from "../api/OrderApi";
import { OrderType } from "../types/Types";
import Order from "../components/Order";
import notFoundImg from "../assets/not_found.svg";

const MyBooksPage = () => {
  const [orders, setOrders] = useState<OrderType[] | undefined>(undefined);
  const { data: myOrders, isError, error, isLoading } = useGetOrders();

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
        <h1 className="text-lg">My Orders</h1>
        {orders?.map((order) => (
          <Order key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default MyBooksPage;
