import { useMutation, useQuery } from "react-query";
import { BookType } from "../types/Types";

const API_BASE_URL = "http://localhost:7000";

export const useGetBooks = () => {
  const getBooks = async (): Promise<BookType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/admin/books`, {
      method: "get",
      credentials: "include",
    });

    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }

    return response.json();
  };

  const { data, error, isLoading } = useQuery("getBooks", getBooks);

  console.log("fetching books...");

  return { data, error, isLoading };
};

export const useAddBook = () => {
  const publishBook = async (formData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/add-book`, {
      method: "post",
      credentials: "include",
      body: formData,
    });

    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }

    return response.json();
  };

  const { isLoading, isSuccess, isError, error, mutate: publishNewBook } = useMutation(publishBook);

  return { isLoading, isSuccess, isError, error, publishNewBook };
};

export const useGetBook = (bookId: string) => {
  const fetchBook = async () => {
    const response = await fetch(`${API_BASE_URL}/api/admin/book/${bookId}`, {
      method: "GET",
      credentials: "include",
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message);

    return result;
  };

  const { data: book, error, isError, isLoading } = useQuery("fetchBook", fetchBook);

  return { book, isError, isLoading, error };
};

export const useUpdateBook = () => {
  const update = async (formData: FormData): Promise<Response | void> => {
    const response = await fetch(`${API_BASE_URL}/api/admin/book`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const res = await response.json();
    if (!response.ok) {
      throw new Error(res.message);
    }

    console.log(res);
  };

  const { mutate: updateBook, isLoading, isError, error } = useMutation(update);

  return { updateBook, isLoading, isError, error };
};

export const useDeleteBook = () => {
  const remove = async (bookId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/book`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ bookId: bookId }),
    });

    const res = await response.json();
    if (!response.ok) {
      throw new Error(res.message);
    }

    return res;
  };

  const {
    mutate: deleteBook,
    isLoading: isDeleting,
    isError: isDelError,
    error: delError,
  } = useMutation(remove);

  return {
    deleteBook,
    isDeleting,
    isDelError,
    delError,
  };
};
