import { Link, useNavigate } from "react-router";
import MobileNav from "./MobileNav";
import { useNavContext } from "../contexts/NavProvider";
import { Menu } from "lucide-react";
import { useAuth } from "../contexts/AuthProvider";
import Logout from "./Logout";

const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { isDisplayed, open } = useNavContext();

  const adminLogout = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/admin/logout`, {
        method: "get",
        credentials: "include",
      });

      if (!response.ok) {
        const res = await response.json();
        throw new Error(res.message);
      }

      logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`w-full sticky top-0 left-0 z-10 border-b border-light-400/50 ${
        isDisplayed ? "" : "dark:bg-dark-100/10 bg-light-400/10 backdrop-blur-md"
      }`}
    >
      <div className="container flex flex-row items-center justify-between py-5">
        <Link
          to="/"
          className="duration-200 font-semibold hover:text-bg-secondary-100 hover:text-third-100"
        >
          <p>Book Sphere</p>
        </Link>
        {/* Mobile Nav */}
        {isDisplayed ? (
          <MobileNav />
        ) : (
          <button
            onClick={() => open()}
            className="sm:hidden duration-200 hover:text-secondary-100"
          >
            <Menu />
          </button>
        )}
        {/* Desktop Nav  */}
        <nav className="hidden-sm flex-md flex-row justify-center items-center gap-3">
          <Link
            to="/"
            className="px-2 py-1 duration-200 hover:bg-primary-300/30 dark:hover:bg-third-100 rounded-md"
          >
            Home
          </Link>
          <Link
            to="/add"
            className="px-2 py-1 duration-200 hover:bg-primary-300/30 dark:hover:bg-third-100 rounded-md"
          >
            New Book
          </Link>
          <Link
            to="/dashboard"
            className="px-2 py-1 duration-200 hover:bg-primary-300/30 dark:hover:bg-third-100 rounded-md"
          >
            Dashboard
          </Link>
          {isAuthenticated ? (
            <Logout adminLogout={adminLogout} />
          ) : (
            <Link
              to="/login"
              className="px-2 py-1 duration-200 hover:bg-primary-300/30 dark:hover:bg-third-100 rounded-md"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
