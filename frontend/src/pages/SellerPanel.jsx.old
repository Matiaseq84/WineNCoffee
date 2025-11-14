import { useState } from "react";
import AdminProducts from "../components/AdminProducts.jsx";
import SellerOrders from "../components/SellerOrders.jsx";
import "./SellerPanel.css"; // darle estilo despues

export default function SellerPanel() {
  const [tab, setTab] = useState("orders");

  return (
    <div className="seller-panel" style={{ display: "flex", minHeight: "100vh" }}>
      <aside className="sidebar" style={{ width: 220, padding: 16, borderRight: "1px solid #ddd" }}>
        <h3>Panel Vendedor</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ cursor: "pointer", margin: "8px 0" }} onClick={() => setTab("orders")}>
            📦 Pedidos
          </li>
          <li style={{ cursor: "pointer", margin: "8px 0" }} onClick={() => setTab("products")}>
            🛒 Productos
          </li>
        </ul>
      </aside>

      <main className="main-content" style={{ flex: 1, padding: 24 }}>
        {tab === "orders" && <SellerOrders />}
        {tab === "products" && <AdminProducts />}
      </main>
    </div>
  );
}
