import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  // Login
  const login = (token, email) => {
    const decoded = jwtDecode(token); // <---- decode token (role, id)
    const role = decoded.role;

    localStorage.setItem("token", token);
    localStorage.setItem("user", email);
    localStorage.setItem("role", role);

    setToken(token);
    setUser(email);
    setRole(role);
  };

  // Logout
  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
