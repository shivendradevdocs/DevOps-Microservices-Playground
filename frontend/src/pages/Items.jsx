import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiGet, apiPostBackend } from "../services/api";

export default function Items() {
  const { token } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");

  async function loadItems() {
    const data = await apiGet(token, "/api/items");
    setItems(data);
  }

  async function addItem() {
    await apiPostBackend(token, "/api/items", { title });
    setTitle("");
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
        {items.map((i) => (
          <li key={i._id}>{i.title}</li>
        ))}
      </ul>
    </div>
  );
}
