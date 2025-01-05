import { useQuery } from "react-query";
import { BookType } from "../types/Types";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL as string;

export const useGetBook = (bookId: string | undefined) => {
  const getBook = async (): Promise<BookType | void> => {
    const response = await fetch(`${API_BASE_URL}/api/user/book/${bookId}`, {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    return result;
  };

  const { isLoading, isError, error, data: book } = useQuery("getBook", getBook);

  return { isError, isLoading, error, book };
};
