import { loadStripe, Stripe } from "@stripe/stripe-js";
import React, { createContext, useContext } from "react";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY;

interface Props {
  stripePromise: Promise<Stripe | null>;
}

const context = createContext<Props | undefined>(undefined);
const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <context.Provider value={{ stripePromise }}>{children}</context.Provider>;
};

export const useAppContext = () => {
  const appContext = useContext(context);

  if (!appContext) throw new Error("useAppContext must be used within AppContextProvider!");

  return appContext;
};
