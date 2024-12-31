import React, { useEffect, useState } from "react";
import * as apiClient from "../apiClient";
import { BookType } from "../types/Types";
import { toast } from "react-toastify";
import Book from "../components/Book";
import RecentBooks from "../components/sections/RecentBooks";

const HomePage = () => {
  const [books, setBooks] = useState<BookType[] | undefined>(undefined);

  // fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await apiClient.fetchBooks();
        const result = await response.json();

        if (!response.ok) {
          toast.error(result.message);
          return;
        }

        setBooks(result);
      } catch (error) {
        toast.error((error as Error).message);
      }
    };
    fetchBooks();
  }, []);

  const handleBookClick = (event: React.MouseEvent<HTMLElement>) => {
    const clickedElement = event.target as HTMLElement;
    if (clickedElement.id.startsWith("cart")) {
      const id = clickedElement.id.split("cart-")[1];
      console.log(id);
    } else {
      const parentElement = clickedElement.parentElement;
      console.log(parentElement?.id);
    }
  };

  return (
    <div className="container my-10">
      <h1 className="text-lg font-semibold mb-5">Recent Published</h1>
      <RecentBooks onClick={handleBookClick} books={books?.slice(0, 2)} />
      <h1 className="text-lg font-semibold mb-5">Books</h1>
      <div className="grid grid-cols-[repeat(auto-fill,222px)] gap-2 items-center justify-center">
        {books?.map((book) => (
          <Book key={book._id} book={book} onClick={handleBookClick} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
