import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { OrderType } from "../types/Types";
import { useRemoveOrder } from "../api/OrderApi";
import { Navigate } from "react-router";
import React, { SetStateAction, useEffect, useRef, useState } from "react";

interface Props {
  order: OrderType;
  updateOrderQuantity: (orderId: string, quantity: number) => void;
  setSelected: React.Dispatch<SetStateAction<string[] | undefined>>;
}

const Order = ({ order, updateOrderQuantity, setSelected }: Props) => {
  const { isUnorderError, isUnorderLoading, unorder, unorderError, isUnorderSuccess } =
    useRemoveOrder();

  const latestQuantity = useRef(order.quantity);
  const [quantity, setQuantity] = useState<number>(order.quantity);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (latestQuantity.current !== quantity) {
        updateOrderQuantity(order._id, quantity);
        latestQuantity.current = quantity;
      }
      clearTimeout(timeout);
    }, 500);

    return () => clearTimeout(timeout);
  }, [updateOrderQuantity, order, quantity]);

  if (!isUnorderLoading && isUnorderError) {
    return <h1 className="text-lg text-center text-red-500">{(unorderError as Error).message}</h1>;
  }

  if (isUnorderLoading && !isUnorderError) {
    return <h1 className="text-lg text-center">Loading...</h1>;
  }

  if (isUnorderSuccess) {
    return <Navigate to="/my-books" />;
  }

  const handleSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected((prev) => (prev ? [...prev, event.target.id] : [event.target.id]));
    } else {
      setSelected((prev) => prev && [...prev.filter((item) => item === event.target.id)]);
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center md:flex-row gap-8 border border-slate-400/50 py-3 px-5">
      {/* Book Image */}
      <div className="w-[175px] h-[235px]">
        {
          <img
            className="w-full h-full object-fill"
            alt="book-image"
            src={order?.bookDetails[0].bookImageUrl}
          />
        }
      </div>
      {/* Book Details */}
      <div className="w-full flex flex-col gap-2">
        <div className="flex flex-col gap-0 mb-5">
          <h1 className="text-2xl">{order?.bookDetails[0].title}</h1>
          <h1 className="text-base font-semibold text-primary-100">
            {order?.bookDetails[0].author}
          </h1>
        </div>
        <p className="text-sm">
          Total price:
          <span className="ml-5 text-primary-100 font-semibold text-base">${order.totalPrice}</span>
        </p>
        <p className="text-sm">
          Order date:
          <span className="ml-5 text-primary-100 font-semibold text-base">
            {new Date(order.orderDate).toISOString().replace("T", " ").split(".")[0]}
          </span>
        </p>
        <div className="flex flex-col md:flex-row justify-between items-center mt-5">
          <div className="flex flex-row gap-4 items-center">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-[40px] h-[40px] dark:text-black text-semibold rounded-md flex justify-center items-center bg-secondary-100 text-3xl"
            >
              <ArrowLeft />
            </button>
            <p className="text-sm">
              Quantity:
              <span className="ml-5 text-primary-100 font-semibold text-base">{quantity}</span>
            </p>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-[40px] h-[40px] dark:text-black text-semibold rounded-md flex justify-center items-center bg-secondary-100 text-3xl"
            >
              <ArrowRight />
            </button>
          </div>
          {/* Checkbox button */}
          <input
            className="w-[20px] h-[20px] self-center"
            onChange={handleSelected}
            type="checkbox"
            key={order._id}
            id={order._id}
          />
        </div>
        {/* Buttons  */}
        <button
          onClick={() => unorder(order._id)}
          className="absolute top-2 right-3 flex justify-center items-center text-red-500"
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export default Order;
