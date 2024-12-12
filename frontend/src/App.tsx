import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Layout from "./layouts/Layout";
import LoginPage from "./pages/LoginPage";
import MyBooksPage from "./pages/MyBooksPage";
import FavoritePage from "./pages/FavoritePage";

function App() {
  return (
    <Routes>
      {/* Homa Page  */}
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      {/* My Books Pages */}
      <Route
        path="/my-books"
        element={
          <Layout>
            <MyBooksPage />
          </Layout>
        }
      />
      {/* Favorite Page */}
      <Route
        path="/favorite"
        element={
          <Layout>
            <FavoritePage />
          </Layout>
        }
      />
      {/* Login Page */}
      <Route
        path="/login"
        element={
          <Layout>
            <LoginPage />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
