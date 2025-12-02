const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export async function apiGet(path) {
  const res = await fetch(`${API_BASE_URL}${path}`);
  return res.json();
}
