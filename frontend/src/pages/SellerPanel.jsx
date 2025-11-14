import { useState } from "react";
import AdminProducts from "../components/AdminProducts.jsx";
import SellerOrders from "../components/SellerOrders.jsx";
import "./SellerPanel.css";

export default function SellerPanel() {
  const [tab, setTab] = useState("orders");

  return (
    <div className="seller-panel">
      <aside className="seller-sidebar">
        <div className="seller-sidebar__logo">
          <span className="seller-sidebar__brand">LAST MILE</span>
          <span className="seller-sidebar__role">Vendedor</span>
        </div>

        <nav className="seller-sidebar__nav">
          <button
            className={`seller-nav__item ${tab === "orders" ? "is-active" : ""}`}
            onClick={() => setTab("orders")}
          >
            📦 Pedidos
          </button>
          <button
            className={`seller-nav__item ${tab === "products" ? "is-active" : ""}`}
            onClick={() => setTab("products")}
          >
            🛒 Productos
          </button>
        </nav>
      </aside>

      <main className="seller-main">
        <header className="seller-main__header">
          <div>
            <h1 className="seller-main__title">
              {tab === "orders" && "Pedidos activos"}
              {tab === "products" && "Catálogo de productos"}
            </h1>
            <p className="seller-main__subtitle">
              {tab === "orders"
                ? "Gestioná el estado de los pedidos en tiempo real."
                : "Cargá y actualizá el stock disponible para la venta."}
            </p>
          </div>
        </header>

        <section className="seller-main__content">
          <div className="seller-card">
            {tab === "orders" && <SellerOrders />}
            {tab === "products" && <AdminProducts />}
          </div>
        </section>
      </main>
    </div>
  );
}
