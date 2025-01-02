import { useEffect, useState } from "react";
import { useGetOrders } from "../api/Order";
import { OrderType } from "../types/Types";
import Order from "../components/Order";

const MyBooksPage = () => {
  const [orders, setOrders] = useState<OrderType[] | undefined>(undefined);
  const { data: myOrders, isError, error, isLoading } = useGetOrders();

  useEffect(() => {
    setOrders(myOrders);
  }, [myOrders, isLoading]);

  if (isLoading && !error && !isError) {
    <h1 className="h-screen text-center text-lg">Loading...</h1>;
  }

  if (isError && error && !isLoading) {
    return (
      <h1 className="h-screen text-center text-lg text-red-500">{(error as Error).message}</h1>
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
