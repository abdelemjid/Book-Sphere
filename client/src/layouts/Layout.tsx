import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { NavProvider } from "../contexts/NavProvider";
import Hero from "../components/Hero";

interface Props {
  children: React.ReactNode;
  showHero?: boolean | undefined;
}

const Layout: React.FC<Props> = ({ children, showHero }) => {
  return (
    <div className="min-h-screen bg-light-100 dark:bg-dark-100 dark:text-white">
      <NavProvider>
        <Navbar />
      </NavProvider>
      {showHero && <Hero />}
      <div className="min-h-[500px]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
