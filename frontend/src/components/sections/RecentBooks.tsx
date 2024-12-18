import { BookType } from "../../types/Types";
import RecentBook from "./RecentBook";

interface Props {
  books: BookType[] | undefined;
}

const RecentBooks = ({ books }: Props) => {
  return (
    <div className="container my-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {books?.map((book) => (
          <RecentBook book={book} />
        ))}
      </div>
    </div>
  );
};

export default RecentBooks;
