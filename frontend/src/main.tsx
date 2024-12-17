import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Router Browser */}
    <BrowserRouter>
      {/* Authentication Provider */}
      <AuthProvider>
        {/* App Contains the Routes */}
        <App />
        {/* Toast Container */}
        <ToastContainer className="dark:bg-dark-400/20 bg-light-400/20 backdrop-blur-sm" />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
