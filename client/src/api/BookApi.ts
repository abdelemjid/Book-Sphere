import { useMutation } from "react-query";
import { BookType } from "../types/Types";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL as string;

export const useGetBook = () => {
  const getBook = async (bookId: string | undefined): Promise<BookType | void> => {
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

  const { isLoading, isError, error, mutate: getBookById, data: book } = useMutation(getBook);

  return { isError, isLoading, error, getBookById, book };
};

export const useGetRelatedBooks = () => {
  const getRelated = async ({ query }: { query: string }): Promise<BookType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/user/books/related?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(`${response.status} - ${result.message}`);
    }

    return result;
  };

  const {
    error: relatedError,
    isError: isRelatedError,
    isLoading: isRelatedLoading,
    data: relatedBooks,
    mutate: getRelatedBooks,
  } = useMutation(getRelated);

  return {
    relatedError,
    isRelatedError,
    isRelatedLoading,
    relatedBooks,
    getRelatedBooks,
  };
};
