import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { BookType } from "../types/Types";
import { useDeleteBook, useGetBook, useUpdateBook } from "../api/BookApi";
import BookGenre from "../components/BookGenre";
import { useEffect } from "react";

const EditBookPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { isError, error, isLoading, book } = useGetBook(params?.id as string);
  const {
    error: bookError,
    isError: isBookError,
    isLoading: isBookLoading,
    updateBook,
  } = useUpdateBook();
  const { delError, deleteBook, isDelError, isDeleting } = useDeleteBook();

  const form = useForm<BookType>({
    defaultValues: {
      ...book,
    },
    mode: "onBlur",
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = form;

  useEffect(() => {
    if (book) {
      book.publicationDate = book.publicationDate.slice(0, 10);
      reset(book);
    }
  }, [book, reset]);

  if (isLoading) return <h1 className="my-5 text-center">Please wait...</h1>;
  if (isError) return <h1 className="my-5 text-center text-red-500">{(error as Error).message}</h1>;

  const onSubmit = async (values: BookType) => {
    const formData = new FormData();
    if (values._id) formData.append("_id", values._id);
    if (values.adminId) formData.append("adminId", values.adminId);
    formData.append("title", values.title);
    formData.append("author", values.author);
    formData.append("isbn", values.isbn);
    formData.append("language", values.language);
    formData.append("publisher", values.publisher);
    formData.append("description", values.description);
    formData.append("publicationDate", values.publicationDate.toString());
    formData.append("pages", values.pages.toString());
    formData.append("price", values.price.toString());
    formData.append("stockQuantity", values.stockQuantity.toString());
    if (values.bookCover) formData.append("bookCover", values.bookCover[0]);

    // convert genres to form data array
    values.genres.forEach((gen, index) => {
      formData.append(`genres[${index}]`, gen);
    });

    updateBook(formData);

    if (isBookLoading) return <h1 className="text-center py-5 text-lg">Updating...</h1>;

    if (isBookError)
      return (
        <h1 className="text-center py-5 text-lg text-red-500">{(bookError as Error).message}</h1>
      );
  };

  const onDelete = () => {
    if (book?._id) {
      deleteBook(book._id);

      if (isDeleting) return <h1 className="text-center text-lg">Deleting current book...</h1>;
      if (isDelError) {
        return <h1 className="text-center text-lg text-red-500">{(delError as Error).message}</h1>;
      }

      navigate("/");
    } else {
      console.log("Book ID is undefined!!");
    }
  };

  return (
    <div>
      <div className="container my-10">
        <div className="flex flex-col items-center gap-5">
          {/* Book Cover Image */}
          <div className="w-[248px] h-[382px]">
            <img src={book?.bookImageUrl} />
          </div>
          {/* Book Details */}
          <FormProvider {...form}>
            <form className="caret-third-100" onSubmit={handleSubmit(onSubmit)}>
              <div className="min-w-[350px] flex flex-col gap-3 mt-5">
                {/* Book Name  */}
                <div className="w-full flex flex-col gap-1">
                  <label htmlFor="title">Book Title</label>
                  <input
                    className="w-full px-3 py-1 border-2 border-light-400 rounded bg-transparent focus:border-secondary-100 outline-none"
                    type="text"
                    id="title"
                    placeholder="Book Title"
                    {...register("title", {
                      required: {
                        value: true,
                        message: "Book Title is required",
                      },
                      validate: (value) => {
                        return value.length >= 3 || "Invalide Title";
                      },
                    })}
                  />
                  {errors?.title && (
                    <span className="text-sm text-red-500 font-semibold place-self-end">
                      {errors?.title?.message}
                    </span>
                  )}
                </div>
                {/* Book Author  */}
                <div className="w-full flex flex-col gap-1">
                  <label htmlFor="author">Book Author</label>
                  <input
                    className="w-full px-3 py-1 border-2 border-light-400 rounded bg-transparent focus:border-secondary-100 outline-none"
                    type="text"
                    id="author"
                    placeholder="Author Name"
                    {...register("author", {
                      required: {
                        value: true,
                        message: "Author Name is required",
                      },
                      validate: (value) => {
                        return value.length >= 3 || "Invalide Name";
                      },
                    })}
                  />
                  {errors?.author && (
                    <span className="text-sm text-red-500 font-semibold place-self-end">
                      {errors?.author?.message}
                    </span>
                  )}
                </div>
                {/* ISBN  */}
                <div className="w-full flex flex-col gap-1">
                  <label htmlFor="isbn">Book ISBN</label>
                  <input
                    className="w-full px-3 py-1 border-2 border-light-400 rounded bg-transparent focus:border-secondary-100 outline-none"
                    type="number"
                    id="isbn"
                    placeholder="ISBN"
                    {...register("isbn", {
                      required: {
                        value: true,
                        message: "ISBN is required",
                      },
                      pattern: {
                        value: /^(?:\d{9}X|\d{10}|\d{13})$/,
                        message: "Invalid ISBN",
                      },
                    })}
                  />
                  {errors?.isbn && (
                    <span className="text-sm text-red-500 font-semibold place-self-end">
                      {errors?.isbn?.message}
                    </span>
                  )}
                </div>
                {/* Book Language  */}
                <div className="w-full flex flex-col gap-1">
                  <label htmlFor="language">Book Language</label>
                  <input
                    className="w-full px-3 py-1 border-2 border-light-400 rounded bg-transparent focus:border-secondary-100 outline-none"
                    type="text"
                    id="language"
                    placeholder="Language"
                    {...register("language", {
                      required: {
                        value: true,
                        message: "Book language is required",
                      },
                      validate: (value) => {
                        return value.length > 1 || "Invalid Language";
                      },
                    })}
                  />
                  {errors?.language && (
                    <span className="text-sm text-red-500 font-semibold place-self-end">
                      {errors?.language?.message}
                    </span>
                  )}
                </div>
                {/* Page Count & Book Price */}
                <div className="flex flex-row gap-3">
                  {/* Page Count  */}
                  <div className="w-full flex flex-col gap-1">
                    <label htmlFor="pages">Page count</label>
                    <input
                      className="w-full px-3 py-1 border-2 border-light-400 rounded bg-transparent focus:border-secondary-100 outline-none"
                      type="number"
                      id="pages"
                      min={10}
                      placeholder="Page count"
                      {...register("pages", {
                        required: {
                          value: true,
                          message: "Page count is required",
                        },
                        validate: (value) => {
                          return value > 9 || "Unacceptable number";
                        },
                      })}
                    />
                    {errors?.pages && (
                      <span className="text-sm text-red-500 font-semibold place-self-end">
                        {errors?.pages?.message}
                      </span>
                    )}
                  </div>
                  {/* Book Price  */}
                  <div className="w-full flex flex-col gap-1">
                    <label htmlFor="price">Book price ($)</label>
                    <input
                      className="w-full px-3 py-1 border-2 border-light-400 rounded bg-transparent focus:border-secondary-100 outline-none"
                      type="number"
                      id="price"
                      min={1}
                      placeholder="Book Price"
                      {...register("price", {
                        required: {
                          value: true,
                          message: "Page count is required",
                        },
                        validate: (value) => {
                          return value > 0 || "Unacceptable number";
                        },
                      })}
                    />
                    {errors?.price && (
                      <span className="text-sm text-red-500 font-semibold place-self-end">
                        {errors?.price?.message}
                      </span>
                    )}
                  </div>
                  {/* Quantity  */}
                  <div className="w-full flex flex-col gap-1">
                    <label htmlFor="price">Stock Quantity</label>
                    <input
                      className="w-full px-3 py-1 border-2 border-light-400 rounded bg-transparent focus:border-secondary-100 outline-none"
                      type="number"
                      id="stockQuantity"
                      min={10}
                      placeholder="Stock quantity"
                      {...register("stockQuantity", {
                        required: {
                          value: true,
                          message: "Page count is required",
                        },
                        validate: (value) => {
                          return value > 9 || "Minimum acceptable quantity is 10";
                        },
                      })}
                    />
                    {errors?.stockQuantity && (
                      <span className="text-sm text-red-500 font-semibold place-self-end">
                        {errors?.stockQuantity?.message}
                      </span>
                    )}
                  </div>
                </div>
                {/* Book Publisher  */}
                <div className="w-full flex flex-col gap-1">
                  <label htmlFor="publisher">Book Publisher</label>
                  <input
                    className="w-full px-3 py-1 border-2 border-light-400 rounded bg-transparent focus:border-secondary-100 outline-none"
                    type="text"
                    id="publisher"
                    placeholder="Publisher"
                    {...register("publisher", {
                      required: {
                        value: true,
                        message: "Publisher Name is required",
                      },
                      validate: (value) => {
                        return value.length > 3 || "Invalid name";
                      },
                    })}
                  />
                  {errors?.publisher && (
                    <span className="text-sm text-red-500 font-semibold place-self-end">
                      {errors?.publisher?.message}
                    </span>
                  )}
                </div>
                {/* Publication Date  */}
                <div className="relative w-full flex flex-col gap-1">
                  <label htmlFor="publicationDate">Publication Date</label>
                  <div className="w-[18px] h-[18px] absolute top-[34px] right-[14px] bg-light-100 rounded "></div>
                  <input
                    className="relative w-full px-3 py-1 border-2 border-light-400 rounded bg-transparent focus:border-secondary-100 outline-none"
                    type="date"
                    id="publicationDate"
                    placeholder="Publication Date"
                    {...register("publicationDate", {
                      required: {
                        value: !book.publicationDate,
                        message: "Publisher Name is required",
                      },
                      validate: (value) => {
                        const current = new Date(value);
                        if (!value && !book.publicationDate) return "Publication Date is required!";
                        return current < new Date() || "Invalid publication date";
                      },
                    })}
                  />
                  {errors?.publicationDate && (
                    <span className="text-sm text-red-500 font-semibold place-self-end">
                      {errors?.publicationDate?.message}
                    </span>
                  )}
                </div>
                {/* Book Cover  */}
                <div className="relative w-full flex flex-col gap-1">
                  <label htmlFor="bookCover">Book Cover Image</label>
                  <input
                    className="relative w-full px-3 py-1 border-2 border-light-400 rounded bg-transparent focus:border-secondary-100 outline-none"
                    type="file"
                    accept="image/*"
                    id="bookCover"
                    placeholder="Book Cover Image"
                    {...register("bookCover", {
                      required: {
                        value: !book.bookCover,
                        message: "Book Cover is required",
                      },
                    })}
                  />
                  {errors?.bookCover && (
                    <span className="text-sm text-red-500 font-semibold place-self-end">
                      {errors?.bookCover?.message}
                    </span>
                  )}
                </div>
                {/* Book Description  */}
                <div className="min-h-[80px] w-full flex flex-col gap-1">
                  <label htmlFor="description">Book Description</label>
                  <textarea
                    className="relative w-full px-3 py-1 border-2 border-light-400 rounded bg-transparent focus:border-secondary-100 outline-none"
                    id="description"
                    placeholder="A brief description about the Book..."
                    {...register("description", {
                      required: {
                        value: true,
                        message: "Book description is required",
                      },
                      validate: (value) => {
                        return (
                          value.length >= 40 || "Book description must be at least 40 character"
                        );
                      },
                    })}
                  />
                  {errors?.description && (
                    <span className="text-sm text-red-500 font-semibold place-self-end">
                      {errors?.description?.message}
                    </span>
                  )}
                </div>
                {/* Book Genre */}
                <BookGenre />
                {/* Submit Button */}
                <button
                  disabled={isLoading}
                  className="px-3 py-1 mt-5 bg-third-100 rounded-md"
                  type="submit"
                >
                  {isLoading ? "Updating..." : "Update"}
                </button>
                {/* Delete Button */}
                <button
                  onClick={() => onDelete()}
                  disabled={isDeleting}
                  className="px-3 py-1 bg-red-500 rounded-md"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default EditBookPage;
