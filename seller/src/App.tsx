import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddBookPage from "./pages/AddBookPage";
import EditBookPage from "./pages/EditBookPage";

function App() {
  return (
    <Routes>
      {/* Admin Home Page */}
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      {/* Admin Login Page */}
      <Route
        path="/login"
        element={
          <Layout>
            <LoginPage />
          </Layout>
        }
      />
      {/* Admin Register Page */}
      <Route
        path="/register"
        element={
          <Layout>
            <RegisterPage />
          </Layout>
        }
      />

      {/* Admin Add Books Page */}
      <Route
        path="/add"
        element={
          <Layout>
            <AddBookPage />
          </Layout>
        }
      />
      {/* Edit Book Page */}
      <Route
        path="/book/:id"
        element={
          <Layout>
            <EditBookPage />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
