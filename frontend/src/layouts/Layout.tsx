import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { NavProvider } from "../contexts/NavProvider";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-light-100 dark:bg-dark-100 dark:text-white">
      <NavProvider>
        <Navbar />
      </NavProvider>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
