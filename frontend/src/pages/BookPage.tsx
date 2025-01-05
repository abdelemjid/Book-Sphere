import { useParams } from "react-router";
import { useGetBook } from "../api/BookApi";
import loading from "../assets/loading.svg";
import box from "../assets/not_found.svg";

const BookPage = () => {
  const params = useParams();
  const bookId = params.bookId;

  const { error, isError, isLoading, book } = useGetBook(bookId);

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

  return (
    <div className="my-10 container">
      <div className="flex flex-col md:flex-row gap-5">
        {/* Book Image */}
        <div className="w-[250px]">
          <img src={book?.bookImageUrl} />
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
                  {book?.publicationDate.split("T")[0]}
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
      {/* Book Description */}
      <div className="mt-10 font-normal text-lg">{book?.description}</div>
    </div>
  );
};

export default BookPage;
