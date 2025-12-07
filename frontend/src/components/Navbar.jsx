import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, role, logout } = useContext(AuthContext);

  return (
    <nav style={{ padding: 10, background: "#282c34", color: "white" }}>
      <h2>DevOps Microservices App</h2>

      {user ? (
        <>
          <span>
            Welcome, {user} ({role})
          </span>{" "}
          &nbsp;
          <Link to="/items" style={{ color: "white" }}>
            Items
          </Link>{" "}
          &nbsp;
          <button onClick={logout} style={{ marginLeft: 10 }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ color: "white" }}>
            Login
          </Link>{" "}
          &nbsp;
          <Link to="/signup" style={{ color: "white" }}>
            Signup
          </Link>
        </>
      )}
    </nav>
  );
}
