import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="w-full top-0 left-0 bg-secondary-100 dark:bg-transparent border-b border-light-400/20">
      <div className="container flex flex-row items-center justify-between py-5">
        <Link
          to="/"
          className="duration-200 font-semibold hover:text-bg-secondary-100 dark:hover:text-third-100"
        >
          <p>Book Sphere</p>
        </Link>
        {/* Nav Links */}
        <nav className="flex flex-row justify-center items-center gap-3">
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
