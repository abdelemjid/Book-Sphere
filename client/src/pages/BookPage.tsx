import { useParams } from "react-router";
import { useGetBook, useGetRelatedBooks } from "../api/BookApi";
import loading from "../assets/loading.svg";
import box from "../assets/not_found.svg";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useOrderBook } from "../api/OrderApi";
import loadingImage from "../assets/loading.svg";
import { BookType } from "../types/Types";
import Book from "../components/Book";

const BookPage = () => {
  const params = useParams();
  const [bookId, setBookId] = useState<string | undefined>(params.bookId);
  const [quantity, setQuantity] = useState(1);
  const [related, setRelated] = useState<BookType[] | undefined>(undefined);

  const { error, isError, isLoading, book, getBookById } = useGetBook();
  const { isOrderError, isOrderLoading, orderBook, orderError } = useOrderBook();
  const { relatedError, isRelatedError, isRelatedLoading, getRelatedBooks, relatedBooks } =
    useGetRelatedBooks();

  /**
   * Fetch the current book
   */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getBookById(bookId);
  }, [getBookById, bookId]);

  /**
   * Fetch the related books by current book's Genres
   */
  useEffect(() => {
    if (book?.genres && bookId) {
      const query =
        book?.genres.map((gen) => new URLSearchParams({ genres: gen })).join("&") +
        `&current=${bookId}`;

      getRelatedBooks({ query });
    }
  }, [getRelatedBooks, book, bookId]);

  /**
   * Display the fetched related books
   */
  useEffect(() => {
    if (relatedBooks) setRelated(relatedBooks);
  }, [relatedBooks, setRelated]);

  if (isLoading && !isError) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img src={loading} className="w-[45px] h-[45px]" />
      </div>
    );
  }

  if (!isLoading && isError) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <img className="w-[250px]" src={box} />
        <h1 className="text-center text-2xl text-red-500">Error occured</h1>
        <p className="text-center">{(error as Error).message}</p>
      </div>
    );
  }

  const addToCart = async (): Promise<Response | void> => {
    if (bookId) {
      orderBook({ bookId, quantity });
    }
  };

  const handleBookClick = (id: string) => {
    setBookId(id);
  };

  return (
    <div className="my-10 container">
      <div className="flex flex-col md:flex-row gap-5">
        {/* Book Image */}
        <div className="m-auto md:m-0 w-[300px]">
          <img className="w-full h-full object-cover" src={book?.bookImageUrl} />
        </div>
        {/* Book Details */}
        <div className="flex flex-col gap-5">
          <div className="mb-5 flex flex-col">
            <h1 className="text-2xl font-semibold">{book?.title}</h1>
            <p className=" text-secondary-100">{book?.author}</p>
          </div>
          <p className="flex flex-col gap-3">
            Book Language
            <span className="text-secondary-100">{book?.language}</span>
          </p>
          <p className="flex flex-col gap-3">
            Book ISBN
            <span className="text-secondary-100">{book?.isbn}</span>
          </p>
          <div className="flex flex-row gap-3">
            <p className="flex flex-col gap-3">
              Book Price
              <span className="text-secondary-100 text-lg">${book?.price}</span>
            </p>
            <hr className="h-full w-[1px] bg-secondary-100" />
            <p className="flex flex-col gap-3">
              Book Pages
              <span className="text-secondary-100 text-lg">{book?.pages}</span>
            </p>
            <hr className="h-full w-[1px] bg-secondary-100" />
            <p className="flex flex-col gap-3 ">
              Publication Date
              {book?.publicationDate && (
                <span className="text-secondary-100 text-lg">
                  {book?.publicationDate && book?.publicationDate.toString().split("T")[0]}
                </span>
              )}
            </p>
          </div>
          <p className="flex flex-col gap-3">
            Book Genres
            <ul className="flex gap-3 flex-wrap">
              {book?.genres.map((gen, i) => (
                <span
                  className="border border-secondary-100 duration-200 hover:bg-secondary-100/15 cursor-pointer rounded-full px-2 py-1 bg-light-200 dark:bg-dark-100"
                  key={i}
                >
                  {gen}
                </span>
              ))}
            </ul>
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-3 justify-between">
        {/* Book Description */}
        <div className="mt-10 font-normal text-lg">{book?.description}</div>
        {/* Book Quantity */}
        <div className="w-full flex flex-col gap-5 items-center justify-center duration-200 mt-10 px-5 py-3 rounded-md bg-light-100/5 backdrop-blur-md">
          {isOrderError && (
            <div className="text-center my-1 border border-red-500 rounded-md bg-red-500/10 px-5 py-2 transition-all">
              {(orderError as Error).message}
            </div>
          )}
          <p className="">
            Stock Quantity{" "}
            <span className="text-lg text-primary-100 font-semibold"> {book?.stockQuantity} </span>
          </p>
          <div className="flex flex-row gap-3">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : prev))}
              className="border border-primary-100 bg-primary-100/10 hover:bg-primary-100 duration-200 p-2 rounded-md"
            >
              <ArrowLeft />
            </button>
            <div className="flex justify-center items-center text-base rounded-md border border-primary-100 bg-primary-100/10 px-5 py-2">
              {quantity}
            </div>
            <button
              onClick={() => {
                if (book?.stockQuantity !== undefined)
                  setQuantity((prev) => (prev < book?.stockQuantity ? prev + 1 : prev));
              }}
              className="border border-primary-100 bg-primary-100/10 hover:bg-primary-100 duration-200 p-2 rounded-md"
            >
              <ArrowRight />
            </button>
          </div>

          <button
            disabled={isOrderLoading && !isOrderError}
            onClick={() => addToCart()}
            className="bg-primary-100/10 border border-primary-100 duration-200 hover:bg-primary-100 w-fit px-8 py-2 rounded-md"
          >
            {isOrderLoading ? (
              <div className="flex flex-row gap-1 items-center">
                <img src={loadingImage} className="w-[14px] h-[14px]" /> Adding to Cart
              </div>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
      {/* Related Books */}
      <div className="mt-10 flex flex-col gap-2">
        {/* Related Books Title */}
        <h1 className="text-xl font-semibold">Relate Books</h1>
        {/* Error Section of Related Books */}
        {isRelatedError && (
          <div className="flex justify-center items-center border border-red-500 rounded-md bg-red-500/10 py-2 px-5 w-full">
            {(relatedError as Error).message}
          </div>
        )}
        {/* Related Books Loading Progress */}
        {isRelatedLoading && !isRelatedError && (
          <div className="py-2 px-5 flex justify-center items-center">
            <img src={loadingImage} className="w-[20px] h-[20px]" />
          </div>
        )}
        {/* Related Books */}
        <div className="grid grid-cols-[repeat(auto-fill,222px)] gap-2 items-center">
          {related?.map((bk) => (
            <Book
              key={bk._id}
              book={bk}
              onClick={() => {
                if (bk?._id) handleBookClick(bk._id);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookPage;
