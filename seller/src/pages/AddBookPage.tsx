import { FormProvider, useForm } from "react-hook-form";
import { BookType } from "../types/Types";
import BookGenre from "../components/BookGenre";
import { useAddBook } from "../api/BookApi";

const AddBookPage = () => {
  const { error, isError, isLoading, publishNewBook } = useAddBook();

  const form = useForm<BookType>({
    mode: "onChange",
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = form;

  const onSubmit = async (values: BookType) => {
    const formData = new FormData();
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
    formData.append("bookCover", values.bookCover[0] as File);

    // convert genres to form data array
    values.genres.forEach((gen, index) => {
      formData.append(`genres[${index}]`, gen);
    });

    await publishNewBook(formData);

    if (!isError) {
      reset();
    }

    if (isError) console.log(error);
  };

  return (
    <div className="container my-10 w-full h-full">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl">Publish a Book</h1>
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
                      value: true,
                      message: "Publisher Name is required",
                    },
                    validate: (value) => {
                      const current = new Date(value);
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
                      value: true,
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
              {/* Publication Date  */}
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
                      return value.length >= 40 || "Book description must be at least 40 character";
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
                {isLoading ? "Publishing..." : "Submit The Book"}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddBookPage;
