import { X } from "lucide-react";
import { OrderType } from "../types/Types";

interface Props {
  order: OrderType;
}

const Order = ({ order }: Props) => {
  console.log(order);

  return (
    <div className="relative w-full flex flex-col md:flex-row gap-3 border border-slate-400/50 py-3 px-5">
      {/* Book Image */}
      <div className="w-[150px]">
        {<img alt="book-image" src={order?.bookDetails[0].bookImageUrl} />}
      </div>
      {/* Book Details */}
      <div className="w-full flex flex-col gap-2">
        <div className="flex flex-col gap-0">
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
        <div className="flex flex-row gap-4 items-center mt-5">
          <button className="w-[40px] h-[40px] dark:text-black text-semibold rounded-md flex justify-center items-center bg-secondary-100 text-3xl">
            &lt;
          </button>
          <p className="text-sm">
            Quantity:
            <span className="ml-5 text-primary-100 font-semibold text-base">{order.quantity}</span>
          </p>
          <button className="w-[40px] h-[40px] dark:text-black text-semibold rounded-md flex justify-center items-center bg-secondary-100 text-3xl">
            &gt;
          </button>
        </div>
        {/* Buttons  */}
        <button
          onClick={() => console.log(`remove ${order._id}`)}
          className="absolute top-2 right-3 flex justify-center items-center text-red-500"
        >
          <X />
        </button>
        <button className="w-full md:w-[150px] dark:text-black text-semibold self-end rounded-md mt-2 px-3 py-1 bg-secondary-100">
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Order;
