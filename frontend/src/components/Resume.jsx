import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Resume.css";

const ResumenCompra = () => {
  const { cart } = useContext(CartContext);
  const [postalCode, setPostalCode] = useState("");
  const [shippingCost, setShippingCost] = useState(null);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCalculateShipping = () => {
    if (!postalCode) {
      alert("Por favor, ingresá tu código postal.");
      return;
    }
    const randomCost = Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000;
    setShippingCost(randomCost);
  };

  const total = shippingCost ? subtotal + shippingCost : subtotal;

  return (
    <div className="resumen-compra">
      <h3>Resumen de tu compra</h3>

      <ul className="resumen-lista">
        {cart.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          cart.map((item) => (
            <li key={item.id}>
              <span>{item.name} x{item.quantity}</span>
              <span>${item.price * item.quantity}</span>
            </li>
          ))
        )}
      </ul>

      <div className="subtotal">
        <span>Subtotal:</span>
        <strong>${subtotal}</strong>
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
            Envío estimado: <strong>${shippingCost}</strong>
          </p>
        </div>
      )}

      <div className="total">
        <span>Total:</span>
        <strong>${total}</strong>
      </div>
    </div>
  );
};

export default ResumenCompra;
