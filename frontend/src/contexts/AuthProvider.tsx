import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

interface Props {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (admin: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<Props | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const login = (admin: boolean) => {
    setIsAuthenticated(true);
    setIsAdmin(admin);
    navigate("/");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider!");

  return context;
};
