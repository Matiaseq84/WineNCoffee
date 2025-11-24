import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ user_name: "", password: "" });
  const [loading, setLoading] = useState(false);

  // admin | seller
  const [userType, setUserType] = useState("admin");

  const load = async () => {
    const path = userType === "admin" ? "/admin" : "/seller";
    const { data } = await api.get(path);
    setUsers(data || []);
  };

  // Cargar según el tipo seleccionado
  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userType]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.user_name || !form.password) return;
    setLoading(true);
    try {
      const path = userType === "admin" ? "/admin" : "/seller";
      await api.post(path, form);
      setForm({ user_name: "", password: "" });
      await load();
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id) => {
    if (!confirm("¿Eliminar usuario?")) return;
    const path = userType === "admin" ? "/admin" : "/seller";
    await api.delete(`${path}/${id}`);
    await load();
  };

  // para manejar admin_id / seller_id de forma genérica
  const getId = (u) => u.admin_id || u.seller_id || u.id;

  return (
    <div>
      <h3>Usuarios {userType === "admin" ? "admin" : "seller"}</h3>

      {/* Combo para elegir tipo de usuario a gestionar */}
      <div style={{ margin: "8px 0" }}>
        <label style={{ marginRight: 8 }}>
          Tipo:
          <select
            value={userType}
            onChange={(e) => {
              setUserType(e.target.value);
              setForm({ user_name: "", password: "" });
            }}
            style={{ marginLeft: 8 }}
          >
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
          </select>
        </label>
      </div>

      <form
        onSubmit={onSubmit}
        style={{ display: "flex", gap: 8, margin: "12px 0" }}
      >
        <input
          placeholder="Usuario"
          value={form.user_name}
          onChange={(e) => setForm({ ...form, user_name: e.target.value })}
        />
        <input
          type="password"
          placeholder="Clave"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button disabled={loading}>
          {loading
            ? `Creando ${userType === "admin" ? "admin..." : "seller..."}`
            : `Crear ${userType === "admin" ? "admin" : "seller"}`}
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => {
            const id = getId(u);
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{u.user_name}</td>
                <td>
                  <button onClick={() => onDelete(id)}>Eliminar</button>
                </td>
              </tr>
            );
          })}
          {users.length === 0 && (
            <tr>
              <td colSpan={3}>No hay usuarios para este tipo.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
