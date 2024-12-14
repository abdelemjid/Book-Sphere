import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Layout from "./layouts/Layout";
import LoginPage from "./pages/LoginPage";
import MyBooksPage from "./pages/MyBooksPage";
import FavoritePage from "./pages/FavoritePage";
import RegisterPage from "./pages/RegisterPage";
import AdminLoginPage from "./pages/admin/AdminLogin";
import AdminRegisterPage from "./pages/admin/AdminRegister";
import AdminHome from "./pages/admin/AdminHome";
import AdminAddBook from "./pages/admin/AdminAddBook";

function App() {
  return (
    <Routes>
      {/* Homa Page  */}
      <Route
        path="/"
        element={
          <Layout showHero={true}>
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
      {/* Login Page */}
      <Route
        path="/login"
        element={
          <Layout>
            <LoginPage />
          </Layout>
        }
      />
      {/* Register Page */}
      <Route
        path="/register"
        element={
          <Layout>
            <RegisterPage />
          </Layout>
        }
      />
      {/* Admin Login Page */}
      <Route
        path="/admin/login"
        element={
          <Layout>
            <AdminLoginPage />
          </Layout>
        }
      />
      {/* Admin Register Page */}
      <Route
        path="/admin/register"
        element={
          <Layout>
            <AdminRegisterPage />
          </Layout>
        }
      />
      {/* Admin Home Page */}
      <Route
        path="/admin"
        element={
          <Layout>
            <AdminHome />
          </Layout>
        }
      />
      {/* Admin Add Books Page */}
      <Route
        path="/admin/add"
        element={
          <Layout>
            <AdminAddBook />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
