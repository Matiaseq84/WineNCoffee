import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./orderTracking.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const OrderTracking = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/orders/${orderId}`);
        setOrder(data);
      } catch (error) {
        console.error("Error al obtener el pedido:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <p>Cargando pedido...</p>;
  if (!order) return <p>No se encontró el pedido.</p>;

  return (
    <div className="order-tracking">
      <Link to="/" className="back-link">← Volver a la tienda</Link>

      <h2>Pedido #{order.id}</h2>
      <p className="fecha-confirmacion">
        Fecha de confirmación: {new Date(order.confirmation_date).toLocaleDateString()}
      </p>

      <div className="estado-container">
        <div className="estado">
          <span className="estado-icon">✔️</span>
          <div>
            <strong>Confirmado</strong>
            <p>{new Date(order.confirmation_date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="info-grid">
        <div className="info-section">
          <h3>Información de contacto</h3>
          <p>{order.client.email}</p>

          <h3>Dirección de envío</h3>
          <p>{order.client.first_name} {order.client.last_name}</p>
          <p>{order.address.street}</p>
          <p>
            {order.address.city}, {order.address.province}
          </p>
          <p>{order.address.country}</p>
        </div>

        <div className="info-section">
          <h3>Pago</h3>
          <p>{order.payment.method === "mercadopago" ? "Mercado Pago" : order.payment.method}</p>
          <p>
            ${order.total.toLocaleString("es-AR")} ARS
          </p>
          <p>{new Date(order.confirmation_date).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="order-items">
        <h3>Productos</h3>
        {order.items.map((item) => (
          <div key={item.product_id} className="order-item">
            <div>
              <strong>{item.name}</strong>
              <p>x{item.qty}</p>
            </div>
            <span>${(item.price * item.qty).toLocaleString("es-AR")}</span>
          </div>
        ))}
      </div>

      <div className="order-total">
        <p>Subtotal: ${order.subtotal.toLocaleString("es-AR")}</p>
        <p>Envío: {order.shipping_cost ? `$${order.shipping_cost}` : "Gratis"}</p>
        <h3>Total: ${order.total.toLocaleString("es-AR")}</h3>
      </div>
    </div>
  );
};

export default OrderTracking;
