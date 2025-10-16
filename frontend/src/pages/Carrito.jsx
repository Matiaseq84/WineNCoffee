import { useMemo, useState } from "react";
import "./carrito.css";

export default function Carrito() {
  // 👇 Arranca vacío; podés probar con productos de ejemplo descomentando el array de abajo
  const [items, setItems] = useState([
    // { id: 1, name: "Café Ruanda 250gr", price: 37000, img: "/coffee.png", qty: 1 },
    // { id: 2, name: "Malbec Reserva 750ml", price: 49950, img: "/Vino-logo.png", qty: 1 },
  ]);

  const total = useMemo(
    () => items.reduce((n, it) => n + it.price * it.qty, 0),
    [items]
  );

  const inc = (id) =>
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))
    );

  const dec = (id) =>
    setItems((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p
      )
    );

  const removeItem = (id) =>
    setItems((prev) => prev.filter((p) => p.id !== id));

  const clear = () => setItems([]);

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
              <a className="btn-cta" href="/cafe">Ver cafés</a>
              <a className="btn-cta" href="/vino">Ver vinos</a>
            </div>
          ) : (
            items.map((it) => (
              <article key={it.id} className="cart-item">
                <div className="cart-thumb">
                  {it.img ? (
                    <img src={it.img} alt={it.name} />
                  ) : (
                    <div className="thumb-placeholder" />
                  )}
                </div>

                <div className="cart-info">
                  <h4 className="cart-title">{it.name}</h4>
                  <div className="cart-price">$
                    {it.price.toLocaleString("es-AR")}
                  </div>
                  <div className="cart-controls">
                    <button className="qty-btn" onClick={() => dec(it.id)}>-</button>
                    <span className="qty">{it.qty}</span>
                    <button className="qty-btn" onClick={() => inc(it.id)}>+</button>
                    <button className="remove-btn" onClick={() => removeItem(it.id)}>
                      Quitar
                    </button>
                  </div>
                </div>

                <div className="cart-subtotal">
                  <span>Subtotal</span>
                  <strong>$
                    {(it.price * it.qty).toLocaleString("es-AR")}
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
            <span>$
              {total.toLocaleString("es-AR")}
            </span>
          </div>
          <button className="btn-primary" disabled={items.length === 0}>
            Finalizar compra
          </button>
          <button className="btn-secondary" onClick={clear} disabled={items.length === 0}>
            Vaciar carrito
          </button>
        </aside>
      </section>
    </div>
  );
}
