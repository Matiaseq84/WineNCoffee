import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "./Resume.css";

const ResumenCompra = () => {
  const { items, total } = useCart(); // 🟢 usamos el hook que ya exportás
  const [postalCode, setPostalCode] = useState("");
  const [shippingCost, setShippingCost] = useState(() => {
    // Si ya calculó antes, recuperamos de localStorage
    const saved = localStorage.getItem("shippingCost");
    return saved ? Number(saved) : null;
  });

  const subtotal = items.reduce(
    (acc, item) => acc + (item.price || 0) * (item.qty || 0),
    0
  );

  const handleCalculateShipping = () => {
    if (!postalCode) {
      alert("Por favor, ingresá tu código postal.");
      return;
    }
    const randomCost = Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000;
    setShippingCost(randomCost);
    localStorage.setItem("shippingCost", randomCost);
  };

  const totalFinal = shippingCost ? subtotal + shippingCost : subtotal;

  return (
    <div className="resumen-compra">
      <h3>Resumen de tu compra</h3>

      {items.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <ul className="resumen-lista">
          {items.map((item) => (
            <li key={item.id || item.product_id}>
              <span>
                {item.name} × {item.qty}
              </span>
              <span>${(item.price * item.qty).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="subtotal">
        <span>Subtotal:</span>
        <strong>${subtotal.toLocaleString()}</strong>
      </div>

      <div className="cp-section">
        <label htmlFor="cp">Código Postal:</label>
        <input
          id="cp"
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="Ej: 1602"
        />
        <button onClick={handleCalculateShipping}>Calcular envío</button>
      </div>

      {shippingCost !== null && (
        <div className="envio">
          <p>
            Envío estimado: <strong>${shippingCost.toLocaleString()}</strong>
          </p>
        </div>
      )}

      <div className="total">
        <span>Total:</span>
        <strong>${totalFinal.toLocaleString()}</strong>
      </div>
    </div>
  );
};

export default ResumenCompra;
