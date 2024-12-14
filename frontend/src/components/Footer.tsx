import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="w-full dark:bg-transparent py-5 border-t border-light-400/50">
      <div className="w-full container m-auto flex flex-row items-center justify-between">
        <Link to="/" className="duration-200 font-semibold hover:text-third-100">
          <p>Book Sphere</p>
        </Link>
        <p>All Rights Reseved &copy; 2024</p>
      </div>
    </div>
  );
};

export default Footer;
