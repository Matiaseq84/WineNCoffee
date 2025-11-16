import { useMemo } from "react";
import "./carrito.css";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Carrito() {
  const { items, addItem, removeItem, clear, inc, dec } = useCart();
  const navigate = useNavigate();

  // Calcula el total de forma reactiva
  const total = useMemo(
    () => items.reduce((n, it) => n + (it.price || 0) * (it.qty || 0), 0),
    [items]
  );

  const handleCheckout = () => {
    if (items.length > 0) {
      navigate("/checkout");
    }
  };

  return (
    <div className="cart-page">
      {/* HERO */}
      <section className="hero-cart">
        <div className="hero-overlay" />
        <div className="hero-strip glowable">
          <h1>Tu Carrito</h1>
          <p>Revisá tus productos antes de confirmar la compra</p>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="cart-content">
        {/* LISTA */}
        <div className="cart-list glowable">
          {items.length === 0 ? (
            <div className="cart-empty">
              <p>Tu carrito está vacío.</p>
              <a className="btn-cta" href="/cafe">
                Ver cafés
              </a>
              <a className="btn-cta" href="/vino">
                Ver vinos
              </a>
            </div>
          ) : (
            items.map((it) => (
              <article key={it.id} className="cart-item">
                <div className="cart-thumb">
                  {it.thumbnail ? (
                    <img
  src={
    it.thumbnail.startsWith("http")
      ? it.thumbnail
      : `http://localhost:3000/${it.thumbnail}`
  }
  alt={it.name || it.nombre}
/>
                  ) : (
                    <div className="thumb-placeholder" />
                  )}
                </div>

                <div className="cart-info">
                  <h4 className="cart-title">{it.name || it.nombre}</h4>
                  <div className="cart-price">
                    ${it.price?.toLocaleString("es-AR") || "--"}
                  </div>
                  <div className="cart-controls">
                    <button className="qty-btn" onClick={() => dec(it.id)}>
                      -
                    </button>
                    <span className="qty">{it.qty}</span>
                    <button className="qty-btn" onClick={() => inc(it.id)}>
                      +
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(it.id)}
                    >
                      Quitar
                    </button>
                  </div>
                </div>

                <div className="cart-subtotal">
                  <span>Subtotal</span>
                  <strong>
                    ${(it.price * it.qty).toLocaleString("es-AR")}
                  </strong>
                </div>
              </article>
            ))
          )}
        </div>

        {/* RESUMEN */}
        <aside className="cart-summary glowable">
          <h3>Resumen</h3>
          <div className="sum-row">
            <span>Productos</span>
            <span>{items.length}</span>
          </div>
          <div className="sum-row">
            <span>Envío</span>
            <span>A calcular</span>
          </div>
          <hr />
          <div className="sum-row total">
            <span>Total</span>
            <span>${total.toLocaleString("es-AR")}</span>
          </div>
          <button className="btn-primary" disabled={items.length === 0} onClick={handleCheckout}>
            Finalizar compra
          </button>
          <button
            className="btn-secondary"
            onClick={clear}
            disabled={items.length === 0}
          >
            Vaciar carrito
          </button>
        </aside>
      </section>
    </div>
  );
}
