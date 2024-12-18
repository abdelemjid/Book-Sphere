import { Link } from "react-router";
import { useAuth } from "../contexts/AuthProvider";
import { X } from "lucide-react";
import { useNavContext } from "../contexts/NavProvider";
import * as apiClient from "../apiClient";
import { toast } from "react-toastify";

const MobileNav = () => {
  const { isAuthenticated, logout, isAdmin } = useAuth();
  const { close } = useNavContext();

  const adminLogout = async () => {
    try {
      const response = await apiClient.adminLogout();
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message);
        return;
      }
    } catch (error) {
      console.log(error);
    }
    logout();
  };

  const userLogout = async () => {
    try {
      const response = await apiClient.userLogout();
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message);
        return;
      }
    } catch (error) {
      console.log(error);
    }
    logout();
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
        {isAuthenticated && isAdmin ? (
          <>
            <Link
              to="/admin"
              className="w-full text-center border border-secondary-100 bg-third-100 px-2 py-1 duration-200 hover:border-dark-100 dark:hover:border-light-100 rounded-sm"
            >
              Home
            </Link>
            <Link
              to="/admin/add"
              className="w-full text-center border border-secondary-100 bg-third-100 px-2 py-1 duration-200 hover:border-dark-100 dark:hover:border-light-100 rounded-sm"
            >
              New Book
            </Link>
            <Link
              to="/admin/dashboard"
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
            onClick={async () => {
              if (isAdmin) await adminLogout();
              else await userLogout();

              close();
            }}
            to="/login"
            className="w-full text-center border border-secondary-100 bg-third-100 px-2 py-1 duration-200 hover:border-dark-100 dark:hover:border-light-100 rounded-sm"
          >
            Logout
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
