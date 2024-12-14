import { motion } from "motion/react";
import { Slide } from "../../types/Types";

const HeroSlide = ({ image, phrase, index }: Slide) => {
  return (
    <motion.div
      key={index}
      initial={{ x: -3000, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 3000, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative flex flex-col md:flex-row gap-3 items-center justify-center"
    >
      <img className="hidden-sm max-h-[200px]" src={image} alt="Slide Image" />
      <p className="min-h-[50px] flex-1 text-third-100 dark:text-light-100 text-lg sm:text-2xl xl:text-3xl font-semibold ">
        {phrase}
      </p>
    </motion.div>
  );
};

export default HeroSlide;
