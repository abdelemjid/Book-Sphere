import React, { useEffect, useState } from "react";
import * as apiClient from "../apiClient";
import { BookType } from "../types/Types";
import { toast } from "react-toastify";
import Book from "../components/Book";
import RecentBooks from "../components/sections/RecentBooks";
import { useOrderBook } from "../api/OrderApi";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<BookType[] | undefined>(undefined);
  const { isOrderError, isOrderLoading, orderBook, orderError } = useOrderBook();

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

      const order = orderBook({ bookId: id, quantity: 1 });

      if (!orderError && isOrderLoading) {
        return <h1 className="text-center text-lg">Ordering...</h1>;
      }

      if (!orderError && !isOrderError && !isOrderLoading) {
        console.log("Ordered:", order);
      }
    } else {
      const parentElement = clickedElement.parentElement;
      if (parentElement?.id) navigate(`/book/${parentElement?.id}`);
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
