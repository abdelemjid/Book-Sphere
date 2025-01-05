import { useParams } from "react-router";
import { useGetOrder } from "../api/OrderApi";
import loading from "../assets/loading.svg";
import box from "../assets/not_found.svg";

const OrderPage = () => {
  const params = useParams();
  const orderId = params.orderId;

  const { error, isError, isLoading, order } = useGetOrder(orderId);

  if (isLoading && !isError) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img src={loading} className="w-[45px] h-[45px]" />
      </div>
    );
  }

  if (!isLoading && isError) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <img className="w-[250px]" src={box} />
        <h1 className="text-center text-2xl text-red-500">Error occured</h1>
        <p className="text-center">{(error as Error).message}</p>
      </div>
    );
  }

  return <div className="container">{order._id}</div>;
};

export default OrderPage;
