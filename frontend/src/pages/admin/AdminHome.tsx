import { useEffect, useState } from "react";
import * as apiClient from "../../apiClient";
import { BookType } from "../../types/Types";
import { toast } from "react-toastify";
import Book from "../../components/Book";

const AdminHome = () => {
  const [books, setBooks] = useState<BookType[] | undefined>(undefined);

  useEffect(() => {
    const result = async () => {
      try {
        const response = await apiClient.adminBooks();
        const res = await response.json();
        if (!response.ok) {
          toast.error(res.message);
          return;
        }
        setBooks(res);
      } catch (error) {
        console.log(error);
      }
    };

    result();
    console.log(books);
  }, []);

  return (
    <div className="container my-10">
      {!books && (
        <h1 className="w-full text-center text-3xl text-gray-500">There is no books yet</h1>
      )}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(125px,1fr))] gap-4">
        {books?.map((book) => (
          <Book book={book} />
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
