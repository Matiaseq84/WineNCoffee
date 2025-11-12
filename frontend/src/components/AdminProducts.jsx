import { useEffect, useState } from "react";
import api from "../services/api";

const empty = {
  name: "", description: "", photo: "", thumbnail: "",
  price: "", category: "", subcategory: "", stock: ""
};

export default function AdminProducts() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const { data } = await api.get("/product");
    setItems(data || []);
  };
  useEffect(() => { load(); }, []);

  const onCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
      await api.post("/product", payload);
      setForm(empty);
      await load();
    } finally {
      setLoading(false);
    }
  };

  const onStock = async (p, delta) => {
    const stock = (p.stock || 0) + delta;
    if (stock < 0) return;
    await api.put(`/product/${p.product_id || p.id}`, { ...p, stock });
    await load();
  };

  const onDelete = async (p) => {
    if (!confirm("¿Eliminar producto?")) return;
    await api.delete(`/product/${p.product_id || p.id}`);
    await load();
  };

  return (
    <div>
      <h3>Productos</h3>
      <form onSubmit={onCreate}
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, margin: "12px 0" }}>
        <input placeholder="Nombre" value={form.name}
               onChange={e=>setForm(f=>({...f,name:e.target.value}))}/>
        <input placeholder="Categoría" value={form.category}
               onChange={e=>setForm(f=>({...f,category:e.target.value}))}/>
        <input placeholder="Subcategoría" value={form.subcategory}
               onChange={e=>setForm(f=>({...f,subcategory:e.target.value}))}/>
        <input placeholder="Precio" value={form.price}
               onChange={e=>setForm(f=>({...f,price:e.target.value}))}/>
        <input placeholder="Foto (URL)" value={form.photo}
               onChange={e=>setForm(f=>({...f,photo:e.target.value}))}/>
        <input placeholder="Thumbnail (URL)" value={form.thumbnail}
               onChange={e=>setForm(f=>({...f,thumbnail:e.target.value}))}/>
        <input placeholder="Stock" value={form.stock}
               onChange={e=>setForm(f=>({...f,stock:e.target.value}))}/>
        <input placeholder="Descripción" value={form.description}
               onChange={e=>setForm(f=>({...f,description:e.target.value}))}/>
        <button disabled={loading}>{loading ? "Guardando..." : "Crear producto"}</button>
      </form>

      <table>
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {items.map(p => (
            <tr key={p.product_id || p.id}>
              <td>{p.product_id || p.id}</td>
              <td>{p.name}</td>
              <td>{p.category}/{p.subcategory}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td style={{ display: "flex", gap: 6 }}>
                <button onClick={()=>onStock(p, +1)}>+1</button>
                <button onClick={()=>onStock(p, -1)}>-1</button>
                <button onClick={()=>onDelete(p)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
