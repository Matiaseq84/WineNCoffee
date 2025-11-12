import { useState } from "react";
import AdminUsers from "../components/AdminUsers.jsx";
import AdminProducts from "../components/AdminProducts.jsx";
import AdminCharts from "../components/AdminCharts.jsx";
import "./AdminPanel.css";

function AdminPanel() {
  const [tab, setTab] = useState("charts");

  return (
    <div className="admin-panel">
      <aside className="sidebar">
        <h3>Admin Menu</h3>
        <ul>
          <li onClick={() => setTab("charts")}>Gráficos</li>
          <li onClick={() => setTab("users")}> Usuarios</li>
          <li onClick={() => setTab("products")}>Productos</li>
        </ul>
      </aside>

      <main className="main-content">
        {tab === "charts" && <AdminCharts />}
        {tab === "users" && <AdminUsers />}
        {tab === "products" && <AdminProducts />}
      </main>
    </div>
  );
}

export default AdminPanel;
