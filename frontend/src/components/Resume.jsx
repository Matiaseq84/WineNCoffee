import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import "./Resume.css";

const ResumenCompra = () => {
  const { items, total } = useContext(CartContext);
  const [userData, setUserData] = useState(null);
  const [shippingCost, setShippingCost] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      setUserData(JSON.parse(stored));
    }
  }, []);

  const handleCalculateShipping = () => {
    if (!userData || !userData.shippingData?.cp) {
      alert("No se encontró un código postal. Completá tus datos primero.");
      return;
    }

    // Costo de envío aleatorio (solo visual)
    const randomCost = Math.floor(Math.random() * (4000 - 1500 + 1)) + 1500;
    setShippingCost(randomCost);
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0
  );

  const finalTotal = shippingCost ? subtotal + shippingCost : subtotal;

  return (
    <div className="resumen-compra">
      <h3>Resumen de tu compra</h3>

      {/* Listado de productos */}
      <ul className="resumen-lista">
        {items.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          items.map((item) => (
            <li key={item.id}>
              <span>
                {item.name} x{item.qty}
              </span>
              <span>${item.price * item.qty}</span>
            </li>
          ))
        )}
      </ul>

      {/* Subtotal */}
      <div className="subtotal">
        <span>Subtotal:</span>
        <strong>${subtotal.toLocaleString()}</strong>
      </div>

      {/* Datos del usuario */}
      {userData && (
        <div className="user-data">
          <h4>Datos del comprador</h4>
          <p>
            <strong>
              {userData.personalData.nombre} {userData.personalData.apellido}
            </strong>
            <br />
            {userData.personalData.email}
            <br />
            DNI: {userData.personalData.dni}
            <br />
            Tel: {userData.personalData.telefono}
          </p>

          <h4>Datos de envío</h4>
          <p>
            {userData.shippingData.calle} {userData.shippingData.altura},{" "}
            {userData.shippingData.piso && `${userData.shippingData.piso}, `}
            {userData.shippingData.ciudad} - {userData.shippingData.provincia}
            <br />
            CP: {userData.shippingData.cp}
          </p>
        </div>
      )}

      {/* Calcular envío */}
      <div className="envio-section">
        <button onClick={handleCalculateShipping} className="btn-envio">
          Calcular envío
        </button>

        {shippingCost !== null && (
          <p className="envio-info">
            Envío estimado: <strong>${shippingCost.toLocaleString()}</strong>
          </p>
        )}
      </div>

      {/* Total final */}
      <div className="total">
        <span>Total:</span>
        <strong>${finalTotal.toLocaleString()}</strong>
      </div>
    </div>
  );
};

export default ResumenCompra;
