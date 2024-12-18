import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router";
import * as apiClient from "../apiClient";
import { BookType } from "../types/Types";
import { toast } from "react-toastify";
import Book from "../components/Book";
import RecentBooks from "../components/sections/RecentBooks";

const HomePage = () => {
  const [books, setBooks] = useState<BookType[] | undefined>(undefined);
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  // check the user authentication
  useEffect(() => {
    const validate = async () => {
      try {
        const response = await apiClient.validateAuth();
        const result = await response.json();

        if (!response.ok) {
          logout();
          return;
        }

        if (result.admin) {
          login(true);
          return;
        }

        if (!result.admin) {
          login(false);
        }
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };

    validate();
  });

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

  return (
    <div className="container my-10">
      <h1 className="text-lg font-semibold mb-5">Recent Published</h1>
      <RecentBooks books={books?.slice(0, 2)} />
      <h1 className="text-lg font-semibold mb-5">Books</h1>
      <div className="grid grid-cols-[repeat(auto-fill,222px)] gap-2 items-center">
        {books?.map((book) => (
          <Book book={book} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
