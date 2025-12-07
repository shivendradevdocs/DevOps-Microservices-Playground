import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiGet, apiPostBackend } from "../services/api";

export default function Items() {
  const { token, role } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  async function loadItems() {
    const data = await apiGet(token, "/api/items");
    setItems(data);
  }

  async function addItem() {
    await apiPostBackend(token, "/api/items", { title });
    setTitle("");
    loadItems();
  }

  async function deleteItem(id) {
    await fetch(import.meta.env.VITE_BACKEND_URL + "/api/items/" + id, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    loadItems();
  }

  async function updateItem(id) {
    await fetch(import.meta.env.VITE_BACKEND_URL + "/api/items/" + id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: editTitle }),
    });

    setEditingId(null);
    loadItems();
  }

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Items</h2>

      <input
        placeholder="New item title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addItem}>Add Item</button>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {editingId === item._id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={() => updateItem(item._id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {item.title}
                {role === "admin" && (
                  <>
                    &nbsp;
                    <button
                      onClick={() => {
                        setEditingId(item._id);
                        setEditTitle(item.title);
                      }}
                    >
                      Edit
                    </button>
                    &nbsp;
                    <button onClick={() => deleteItem(item._id)}>Delete</button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
