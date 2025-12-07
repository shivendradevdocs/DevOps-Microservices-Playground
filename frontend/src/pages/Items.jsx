import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/http";
import toast from "react-hot-toast";

export default function Items() {
  const { role } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  async function loadItems() {
    try {
      const res = await api.get("/api/items");
      setItems(res.data);
    } finally {
      setLoading(false);
    }
  }

  async function addItem() {
    await api.post("/api/items", { title });
    toast.success("Item added");
    setTitle("");
    loadItems();
  }

  async function deleteItem(id) {
    await api.delete("/api/items/" + id);
    toast.success("Item deleted");
    loadItems();
  }

  async function updateItem(id) {
    await api.put("/api/items/" + id, { title: editTitle });
    toast.success("Item updated");
    setEditingId(null);
    loadItems();
  }

  useEffect(() => {
    loadItems();
  }, []);

  if (loading) return <h3>Loading items...</h3>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Items</h2>

      <input
        placeholder="New item title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addItem}>Add Item</button>

      <hr />

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
                    <button
                      onClick={() => {
                        setEditingId(item._id);
                        setEditTitle(item.title);
                      }}
                    >
                      Edit
                    </button>
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
