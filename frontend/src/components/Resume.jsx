import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./Resume.css";

const Resume = () => {
  const { items, shippingCost } = useCart();
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // para saber en qué vista estamos

  useEffect(() => {
    const payment = localStorage.getItem("paymentMethod");
    if (payment) setPaymentConfirmed(true);
  }, []);

  const subtotal = items.reduce(
    (acc, it) => acc + (Number(it.price) || 0) * (it.qty || 1),
    0
  );
  const finalTotal = shippingCost ? subtotal + shippingCost : subtotal;

  const handleConfirmPurchase = () => {
    alert("✅ ¡Compra confirmada con éxito!");
    navigate("/"); // redirigir o mantener según lo que definas
  };

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
              <div className="item-right">
                ${(Number(item.price) * (item.qty || 1)).toLocaleString()}
              </div>
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
        <strong>
          {shippingCost ? `$${shippingCost.toLocaleString()}` : "A calcular"}
        </strong>
      </div>

      <div className="total-row">
        <span>Total:</span>
        <strong>${finalTotal.toLocaleString()}</strong>
      </div>

      <div className="resumen-botones">
        <button className="btn-volver" onClick={() => navigate("/carrito")}>
          ← Volver al carrito
        </button>

        {/* Mostrar solo en la vista de Confirmación */}
        {location.pathname === "/checkout/confirmation" && paymentConfirmed && (
          <button className="btn-confirmar" onClick={handleConfirmPurchase}>
            Confirmar compra
          </button>
        )}
      </div>
    </div>
  );
};

export default Resume;
