const backendUrl = import.meta.env.VITE_BACKEND_URL;
const authUrl = import.meta.env.VITE_AUTH_URL;

export async function apiGet(token, path) {
  const res = await fetch(backendUrl + path, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function apiPostAuth(path, body) {
  const res = await fetch(authUrl + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.json();
}

export async function apiPostBackend(token, path, body) {
  const res = await fetch(backendUrl + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return res.json();
}
