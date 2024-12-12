import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="w-full absolute bottom-0 left-0 dark:bg-transparent bg-secondary-100 py-5 border-t border-light-400/20">
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
