import { Link } from "react-router";
import { useAuth } from "../contexts/AuthProvider";
import { X } from "lucide-react";
import { useNavContext } from "../contexts/NavProvider";
import * as apiClient from "../apiClient";
import { toast } from "react-toastify";

const MobileNav = () => {
  const { isAuthenticated, logout } = useAuth();
  const { close } = useNavContext();

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
      <nav className="container w-full h-full flex flex-col justify-start mt-32 gap-1">
        <>
          <Link
            onClick={() => close()}
            to="/"
            className="w-full text-center font-semibold border border-third-100 bg-third-100/5 hover:bg-third-100/10 px-2 py-1 duration-200 rounded-sm"
          >
            Home
          </Link>
          <Link
            onClick={() => close()}
            to="/my-books"
            className="w-full text-center font-semibold border border-third-100 bg-third-100/5 hover:bg-third-100/10 px-2 py-1 duration-200 rounded-sm"
          >
            My Books
          </Link>
          <Link
            onClick={() => close()}
            to="/favorite"
            className="w-full text-center font-semibold border border-third-100 bg-third-100/5 hover:bg-third-100/10 px-2 py-1 duration-200 rounded-sm"
          >
            Favorite
          </Link>
        </>

        {isAuthenticated ? (
          <Link
            onClick={async () => {
              await userLogout();

              close();
            }}
            to="/login"
            className="w-full text-center font-semibold border border-third-100 bg-third-100/5 hover:bg-third-100/10 px-2 py-1 duration-200 rounded-sm"
          >
            Logout
          </Link>
        ) : (
          <Link
            onClick={() => close()}
            to="/login"
            className="w-full text-center font-semibold border border-third-100 bg-third-100/5 hover:bg-third-100/10 px-2 py-1 duration-200 rounded-sm"
          >
            Login
          </Link>
        )}
      </nav>
    </div>
  );
};

export default MobileNav;
