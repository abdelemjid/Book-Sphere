import { useEffect, useState } from "react";
import * as apiClient from "../../apiClient";
import { BookType } from "../../types/Types";

const AdminHome = () => {
  const [books, setBooks] = useState<BookType[] | undefined>(undefined);

  useEffect(() => {
    const result = async () => {
      try {
        const response = await apiClient.adminBooks();
        const res = await response.json();
        if (!response.ok) {
          console.log(res.message);
          return;
        }
        setBooks(res);
      } catch (error) {
        console.log(error);
      }
    };

    result();
  }, [books]);

  return (
    <div className="container">
      {!books && (
        <h1 className="w-full text-center text-3xl text-gray-500">There is no books yet</h1>
      )}
    </div>
  );
};

export default AdminHome;
