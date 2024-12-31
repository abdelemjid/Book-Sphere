import React from "react";
import { BookType } from "../../types/Types";
import RecentBook from "./RecentBook";

interface Props {
  books: BookType[] | undefined;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const RecentBooks = ({ books, onClick }: Props) => {
  return (
    <div className="container my-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {books?.map((book) => (
          <RecentBook key={book._id} onClick={onClick} book={book} />
        ))}
      </div>
    </div>
  );
};

export default RecentBooks;
