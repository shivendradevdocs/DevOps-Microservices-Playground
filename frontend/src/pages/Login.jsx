import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiPostAuth } from "../services/api";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const res = await apiPostAuth("/api/auth/login", { email, password });

    if (res.token) {
      login(res.token, email);
      alert("Login successful!");
      window.location.href = "/items";
    } else {
      alert(res.msg || "Login failed");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
