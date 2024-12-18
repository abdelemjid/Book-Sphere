import { useEffect, useState } from "react";
import * as apiClient from "../../apiClient";
import { BookType } from "../../types/Types";
import { toast } from "react-toastify";
import Book from "../../components/Book";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthProvider";

const AdminHome = () => {
  const { login, isAuthenticated } = useAuth();
  const [books, setBooks] = useState<BookType[] | undefined>(undefined);
  const navigate = useNavigate();

  // check if authenticated
  useEffect(() => {
    const check = async () => {
      const response = await apiClient.validateAdminToken();

      if (!response.ok || response.status === 401) {
        navigate("/admin/login");
        toast.error("Invalid token!");
        return;
      }

      login(true);
    };
    check();
  }, [isAuthenticated]);

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
  }, []);

  const onBookClick = (bookId: string | undefined) => {
    navigate(`/admin/book/${bookId}`);
  };

  return (
    <div className="container my-10">
      {!books && (
        <h1 className="w-full text-center text-3xl text-gray-500">There is no books yet</h1>
      )}
      <div className="grid grid-cols-[repeat(auto-fill,222px)] gap-4">
        {books?.map((book) => (
          <Book book={book} onClick={onBookClick} />
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
