import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Layout from "./layouts/Layout";
import LoginPage from "./pages/LoginPage";
import MyBooksPage from "./pages/MyBooksPage";
import FavoritePage from "./pages/FavoritePage";
import RegisterPage from "./pages/RegisterPage";
import { QueryClient, QueryClientProvider } from "react-query";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* Home Page  */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={
              <Layout showHero={true}>
                <HomePage />
              </Layout>
            }
          />
        </Route>
        {/* My Books Pages */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/my-books"
            element={
              <Layout>
                <MyBooksPage />
              </Layout>
            }
          />
        </Route>
        {/* Favorite Page */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/favorite"
            element={
              <Layout>
                <FavoritePage />
              </Layout>
            }
          />
        </Route>
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
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
