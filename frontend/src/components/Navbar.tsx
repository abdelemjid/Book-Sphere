import { Link } from "react-router";
import MobileNav from "./MobileNav";
import { useNavContext } from "../contexts/NavProvider";
import { Menu } from "lucide-react";

const Navbar = () => {
  const { isDisplayed, open } = useNavContext();

  return (
    <div className="w-full top-0 left-0 bg-secondary-100 dark:bg-transparent border-b border-light-400/20">
      <div className="container flex flex-row items-center justify-between py-5">
        <Link
          to="/"
          className="duration-200 font-semibold hover:text-bg-secondary-100 dark:hover:text-third-100"
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
        <nav className="hidden sm:flex flex-row justify-center items-center gap-3">
          <Link
            to="/"
            className="px-2 py-1 duration-200 hover:bg-primary-300/30 dark:hover:bg-third-100 rounded-md"
          >
            Home
          </Link>
          <Link
            to="/my-books"
            className="px-2 py-1 duration-200 hover:bg-primary-300/30 dark:hover:bg-third-100 rounded-md"
          >
            My Books
          </Link>
          <Link
            to="/favorite"
            className="px-2 py-1 duration-200 hover:bg-primary-300/30 dark:hover:bg-third-100 rounded-md"
          >
            Favorite
          </Link>
          <Link
            to="/login"
            className="px-2 py-1 duration-200 hover:bg-primary-300/30 dark:hover:bg-third-100 rounded-md"
          >
            Login
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
