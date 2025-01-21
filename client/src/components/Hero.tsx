import { useEffect, useState } from "react";
import { Slide } from "../types/Types";
import { slides } from "../data/slides";
import HeroContainer from "./hero/SlideContainer";
import HeroSlide from "./hero/HeroSlide";

const Hero = () => {
  const [current, setCurrent] = useState<Slide>({
    index: 0,
    image: slides[0].image,
    phrase: slides[0].phrase,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => slides[(prev.index + 1) % slides.length]);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-600/80 to-blue-500/80">
      <HeroContainer>
        <HeroSlide index={current.index} image={current.image} phrase={current.phrase} />
      </HeroContainer>
    </div>
  );
};

export default Hero;
