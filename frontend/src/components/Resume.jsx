// src/components/Resume.jsx
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import "./Resume.css";

const ResumenCompra = () => {
  const { items, total, shippingCost } = useCart();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) setUserData(JSON.parse(stored));
  }, []);

  const subtotal = items.reduce((acc, it) => acc + (Number(it.price) || 0) * (it.qty || 1), 0);
  const finalTotal = shippingCost ? subtotal + shippingCost : subtotal;

  return (
    <div className="resumen-compra">
      <h3>Resumen de tu compra</h3>

      {items.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <ul className="resumen-lista">
          {items.map((item) => (
            <li key={item.id}>
              <div className="item-left">
                <div className="item-title">{item.name}</div>
                <div className="item-qty">x{item.qty}</div>
              </div>
              <div className="item-right">${(Number(item.price) * (item.qty || 1)).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}

      <div className="subtotal-row">
        <span>Subtotal:</span>
        <strong>${subtotal.toLocaleString()}</strong>
      </div>

      <div className="envio-row">
        <span>Envío:</span>
        <strong>{shippingCost ? `$${shippingCost.toLocaleString()}` : "A calcular"}</strong>
      </div>

      {userData && (
        <div className="user-data">
          <h4>Datos de envío</h4>
          <p>
            {userData.shippingData.calle} {userData.shippingData.altura}
            {userData.shippingData.piso ? `, ${userData.shippingData.piso}` : ""} <br />
            {userData.shippingData.ciudad} - {userData.shippingData.provincia} <br />
            CP: {userData.shippingData.cp}
          </p>
        </div>
      )}

      <div className="total-row">
        <span>Total:</span>
        <strong>${finalTotal.toLocaleString()}</strong>
      </div>
    </div>
  );
};

export default ResumenCompra;
