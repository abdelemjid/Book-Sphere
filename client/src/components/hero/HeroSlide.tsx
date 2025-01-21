import { motion } from "motion/react";
import { Slide } from "../../types/Types";

const HeroSlide = ({ image, phrase, index }: Slide) => {
  return (
    <motion.div
      key={index}
      initial={{ x: -3000, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 3000, opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative flex flex-col md:flex-row gap-3 items-center justify-center min-h-[120px] sm:min-h-[300px]"
    >
      <img className="hidden-sm max-h-[200px]" src={image} alt="Slide Image" />
      <p className="sm:flex-1 text-light-100 text-2xl sm:text-2xl xl:text-3xl text-center font-semibold ">
        {phrase}
      </p>
    </motion.div>
  );
};

export default HeroSlide;
