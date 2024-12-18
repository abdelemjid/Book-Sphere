import { BookType } from "../../types/Types";

interface Props {
  book: BookType;
}

const RecentBook = ({ book }: Props) => {
  return (
    <div
      key={book._id}
      id={book._id}
      className="min-w-[300px] flex flex-row justify-between duration-200 hover:bg-dark-400/10 dark:hover:bg-light-100/10 border border-dark-400/20 dark:border-light-100/20 rounded-md overflow-hidden"
    >
      {/* Book Image  */}
      <div className="flex-1 flex flex-col items-start">
        <img className="w-[180px] h-[298px]" src={book.bookCover} alt="Book image" />
      </div>
      {/* Book Information */}
      <div className="flex-1 flex flex-col justify-around gap-2">
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
          {book.genres.slice(0, 3).map((genre) => (
            <span className="w-fit h-fit text-sm py-1 px-2 border border-primary-200 rounded-full">
              {genre}
            </span>
          ))}
        </div>
        {/* Bottom Section of Price */}
        <div className="flex flex-row items-center gap-4">
          <span className="text-sm">{book.pages}</span>
          <hr className="h-[60%] w-[1px] bg-primary-100" />
          <span className="text-sm">{book.language}</span>
          <hr className="h-[60%] w-[1px] bg-primary-100" />
          <span className="text-lg text-secondary-100">${book.price}</span>
        </div>
      </div>
    </div>
  );
};

export default RecentBook;
