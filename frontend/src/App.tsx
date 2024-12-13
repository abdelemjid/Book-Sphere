import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Layout from "./layouts/Layout";
import LoginPage from "./pages/LoginPage";
import MyBooksPage from "./pages/MyBooksPage";
import FavoritePage from "./pages/FavoritePage";
import RegisterPage from "./pages/RegisterPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminRegisterPage from "./pages/admin/AdminRegisterPage";

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
      {/* Register Page */}
      <Route
        path="/admin/login"
        element={
          <Layout>
            <AdminLoginPage />
          </Layout>
        }
      />
      {/* Register Page */}
      <Route
        path="/admin/register"
        element={
          <Layout>
            <AdminRegisterPage />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
