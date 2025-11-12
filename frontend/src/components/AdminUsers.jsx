import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ user_name: "", password: "" });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const { data } = await api.get("/admin");
    setUsers(data || []);
  };

  useEffect(() => { load(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.user_name || !form.password) return;
    setLoading(true);
    try {
      await api.post("/admin", form);
      setForm({ user_name: "", password: "" });
      await load();
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id) => {
    if (!confirm("¿Eliminar usuario?")) return;
    await api.delete(`/admin/${id}`);
    await load();
  };

  return (
    <div>
      <h3>Usuarios admin</h3>
      <form onSubmit={onSubmit} style={{ display: "flex", gap: 8, margin: "12px 0" }}>
        <input placeholder="Usuario"
          value={form.user_name}
          onChange={(e) => setForm({ ...form, user_name: e.target.value })}
        />
        <input type="password" placeholder="Clave"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button disabled={loading}>{loading ? "Creando..." : "Crear"}</button>
      </form>

      <table>
        <thead>
          <tr><th>ID</th><th>Usuario</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.admin_id || u.id}>
              <td>{u.admin_id || u.id}</td>
              <td>{u.user_name}</td>
              <td><button onClick={() => onDelete(u.admin_id || u.id)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
