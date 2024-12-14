import React from "react";
import { AnimatePresence } from "motion/react";

interface Props {
  children: React.ReactNode;
}

const HeroContainer = ({ children }: Props) => {
  return (
    <div className="container w-full min-h-[100px] md:h-[300px] py-5">
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </div>
  );
};

export default HeroContainer;
