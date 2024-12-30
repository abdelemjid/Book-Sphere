import { BookType } from "../types/Types";

interface Props {
  book: BookType;
  onClick: (bookId: string | undefined) => void;
}

const Book = ({ book, onClick }: Props) => {
  return (
    <div key={book._id} onClick={() => onClick(book._id)} className="mx-auto">
      <div className="h-[320px] w-[222px] flex flex-col gap-2 justify-center items-center border dark:border-light-100/20 border-dark-400/20 dark:hover:bg-light-100/10 hover:bg-dark-400/10 duration-200">
        <img className="w-fit h-[200px]" src={book.bookImageUrl} alt="Book Cover" />
        <h1 className="text-sm text-center">{book.title}</h1>
        <h1 className="text-sm text-accent-200 dark:text-accent-400  line-clamp-1 max-w-[80%]">
          {book.author}
        </h1>
        <div className="flex flex-row justify-center items-center gap-3">
          <span className="text-sm">{book.language}</span>
          <hr className="h-full w-[1px] bg-light-100/50" />
          <span className="text-sm">{book.pages}</span>
          <hr className="h-full w-[1px] bg-light-100/50" />
          <span className="text-lg">${book.price}</span>
        </div>
      </div>
    </div>
  );
};

export default Book;
