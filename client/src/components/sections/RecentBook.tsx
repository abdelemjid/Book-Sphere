import React from "react";
import { BookType } from "../../types/Types";
import { ShoppingCart } from "lucide-react";

interface Props {
  book: BookType;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const RecentBook = ({ book, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      key={book._id}
      id={book._id}
      className="min-w-[300px] flex flex-col sm:flex-row justify-center items-center sm:items-center sm:justify-between duration-200 hover:bg-dark-400/10 dark:hover:bg-light-100/10 border border-dark-400/20 dark:border-light-100/20 rounded-md overflow-hidden"
    >
      {/* Book Image  */}
      <div id={book._id} className="flex-1 flex flex-col items-start">
        <img className="w-[180px] h-[298px] object-cover" src={book.bookCover} alt="Book image" />
      </div>
      {/* Book Information */}
      <div
        id={book._id}
        className="flex-1 flex flex-col justify-around items-center p-5 sm:p-0 sm:items-start gap-2"
      >
        {/* Book Title  */}
        <h1 className="line-clamp-2 my-1">{book.title}</h1>
        {/* Book Author  */}
        <h1 className="w-fit h-fit line-clamp-1 text-sm text-start text-primary-100 dark:text-primary-200 -mt-1">
          {book.author}
        </h1>
        {/* Book Description */}
        <p className="line-clamp-4 text-sm">{book.description}</p>
        {/* Book Genres */}
        <div className="flex flex-row items-center flex-wrap gap-1">
          {book.genres.slice(0, 3).map((genre, index) => (
            <span
              key={index}
              className="w-fit h-fit text-[10px] py-1 px-2 border border-primary-200 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
        {/* Bottom Section of Price */}
        <div id={book._id} className="flex flex-row items-center gap-4">
          <span className="text-sm">{book.pages}</span>
          <hr className="h-[60%] w-[1px] bg-primary-100" />
          <span className="text-sm">{book.language}</span>
          <hr className="h-[60%] w-[1px] bg-primary-100" />
          <span className="text-lg text-secondary-100">${book.price}</span>
          <hr className="h-[60%] w-[1px] bg-primary-100" />
          <ShoppingCart
            className="w-[20px] h-[20px] cursor-pointer duration-200 transition-transform hover:scale-110"
            id={`cart-${book._id}`}
          />
        </div>
      </div>
    </div>
  );
};

export default RecentBook;
