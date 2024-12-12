import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "./contexts/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Router Browser */}
    <BrowserRouter>
      {/* Authentication Provider */}
      <AuthProvider>
        {/* App Contains the Routes */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
