import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthProvider";
import { X } from "lucide-react";
import { useNavContext } from "../contexts/NavProvider";
import { useState } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

const MobileNav = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { close } = useNavContext();

  const adminLogout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/admin/logout`, {
        method: "get",
        credentials: "include",
      });

      if (!response.ok) {
        const res = await response.json();
        setIsLoading(false);
        throw new Error(res.message);
      }
      setIsLoading(false);

      logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="sm:hidden absolute top-0 left-0 w-full h-screen dark:bg-dark-400/10 backdrop-blur-sm">
      {/* Close Button */}
      <button
        onClick={() => close()}
        className="absolute top-4 right-2 px-2 py-1 hover:text-secondary-100"
      >
        <X />
      </button>
      {/* Nav Links */}
      <nav className="container w-full h-full flex flex-col justify-center items-center gap-1">
        {isAuthenticated ? (
          <>
            <Link
              to="/"
              className="w-full text-center border border-secondary-100 bg-third-100 px-2 py-1 duration-200 hover:border-dark-100 dark:hover:border-light-100 rounded-sm"
            >
              Home
            </Link>
            <Link
              to="/add"
              className="w-full text-center border border-secondary-100 bg-third-100 px-2 py-1 duration-200 hover:border-dark-100 dark:hover:border-light-100 rounded-sm"
            >
              New Book
            </Link>
            <Link
              to="/dashboard"
              className="w-full text-center border border-secondary-100 bg-third-100 px-2 py-1 duration-200 hover:border-dark-100 dark:hover:border-light-100 rounded-sm"
            >
              Dashboard
            </Link>
          </>
        ) : (
          <>
            <Link
              onClick={() => close()}
              to="/"
              className="w-full text-center border border-secondary-100 bg-third-100 px-2 py-1 duration-200 hover:border-dark-100 dark:hover:border-light-100 rounded-sm"
            >
              Home
            </Link>
            <Link
              onClick={() => close()}
              to="/my-books"
              className="w-full text-center border border-secondary-100 bg-third-100 px-2 py-1 duration-200 hover:border-dark-100 dark:hover:border-light-100 rounded-sm"
            >
              My Books
            </Link>
            <Link
              onClick={() => close()}
              to="/favorite"
              className="w-full text-center border border-secondary-100 bg-third-100 px-2 py-1 duration-200 hover:border-dark-100 dark:hover:border-light-100 rounded-sm"
            >
              Favorite
            </Link>
          </>
        )}

        {isAuthenticated ? (
          <Link
            aria-disabled={isLoading}
            onClick={async () => {
              await adminLogout();
              close();
              logout();
            }}
            to="/login"
            className="w-full text-center border border-secondary-100 bg-third-100 px-2 py-1 duration-200 hover:border-dark-100 dark:hover:border-light-100 rounded-sm"
          >
            {isLoading ? "Logginout..." : "Logout"}
          </Link>
        ) : (
          <Link
            onClick={() => close()}
            to="/login"
            className="w-full text-center border border-secondary-100 bg-third-100 px-2 py-1 duration-200 hover:border-dark-100 dark:hover:border-light-100 rounded-sm"
          >
            Login
          </Link>
        )}
      </nav>
    </div>
  );
};

export default MobileNav;
