import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);

  if (!token) {
    return (
      <h2>
        Unauthorized. Please <a href="/login">Login</a>.
      </h2>
    );
  }

  return children;
}
