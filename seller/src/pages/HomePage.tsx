import Book from "../components/Book";
import { useNavigate } from "react-router";
import { useGetBooks } from "../api/BookApi";
import { useAuth } from "../contexts/AuthProvider";
import { useTokenVerification } from "../api/VerifyToken";

const HomePage = () => {
  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const { isSuccess, isError } = useTokenVerification();

  if (isError) {
    logout();
    navigate("/login");
  }

  if (isSuccess) {
    login();
  }

  const { data: books, error, isLoading } = useGetBooks();

  if (isLoading) return <h1 className="text-center text-lg">Loading...</h1>;
  if (error) {
    console.log((error as Error).message);
    return <h1 className="text-center text-lg">Error occured during fetching books!</h1>;
  }

  const onBookClick = (bookId: string | undefined) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="container my-10">
      {!books && (
        <h1 className="w-full text-center text-3xl text-gray-500">There is no books yet</h1>
      )}
      <div className="grid grid-cols-[repeat(auto-fill,222px)] gap-4 justify-center">
        {books?.map((book) => (
          <Book book={book} key={book._id} onClick={onBookClick} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
