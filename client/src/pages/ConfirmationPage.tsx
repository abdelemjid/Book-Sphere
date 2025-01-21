import { useNavigate, useParams } from "react-router";
import { useConfirmOrders } from "../api/OrderApi";
import { useEffect } from "react";
import loadingIcon from "../assets/loading.svg";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { stripePromise } = useAppContext();
  const { ids } = useParams<{ ids: string }>();
  const allIds = ids ? ids?.split(",") : [];
  const { isConfirmError, isConfirmLoading, confirmError, data, confirmOrders } =
    useConfirmOrders();

  if (!allIds || allIds.length === 0) {
    navigate("/my-books");
  }

  const query = allIds?.map((id) => new URLSearchParams({ ids: id })).join("&");
  console.log("query:", query);

  useEffect(() => {
    confirmOrders(query);
  }, []);

  if (!isConfirmError && isConfirmLoading) {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center">
        <img className="w-[25px] h-[25px]" src={loadingIcon} />
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
      {data && !confirmError && (
        <Elements stripe={stripePromise} options={{ clientSecret: data.clientSecret }}>
          <div>Hello</div>
          <CardElement />
        </Elements>
      )}
    </div>
  );
};

export default ConfirmationPage;
