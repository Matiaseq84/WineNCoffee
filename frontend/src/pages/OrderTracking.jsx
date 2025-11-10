import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderById } from "../services/orderService";
import "./OrderTracking.css";

const OrderTracking = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (error) {
        console.error("Error al cargar el pedido:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <p>Cargando pedido...</p>;
  if (!order) return <p>No se encontró el pedido.</p>;

  // Estados del seguimiento
  const steps = [
    { key: "paid", label: "Pagado", icon: "💳" },
    { key: "shipped", label: "Enviado", icon: "📦" },
    { key: "cancelled", label: "Cancelado", icon: "❌" },
  ];

  // Determinar progreso actual
  const currentStatus = order.status || "paid";
  const currentIndex = steps.findIndex((s) => s.key === currentStatus);

  return (
    <div className="order-tracking">
      <Link to="/" className="back-link">← Volver a la tienda</Link>

      <h2>Pedido #{order.id}</h2>
      <p className="fecha-confirmacion">
        Fecha de confirmación:{" "}
        {new Date(order.confirmation_date).toLocaleDateString()}
      </p>

      {/* --- Timeline de estado --- */}
      <div className="tracking-timeline">
        {steps.map((step, index) => (
          <div
            key={step.key}
            className={`tracking-step ${
              index <= currentIndex ? "active" : ""
            } ${currentStatus === "cancelled" && step.key !== "cancelled" ? "disabled" : ""}`}
          >
            <div className="icon">{step.icon}</div>
            <p>{step.label}</p>
            {index < steps.length - 1 && <div className="line"></div>}
          </div>
        ))}
      </div>

      <div className="info-grid">
        <div className="info-section">
          <h3>Información de contacto</h3>
          <p>{order.client?.email}</p>

          <h3>Dirección de envío</h3>
          <p>{order.client?.first_name} {order.client?.last_name}</p>
          <p>{order.address?.street}</p>
          <p>
            {order.address?.city}, {order.address?.province}
          </p>
          <p>{order.address?.country}</p>
        </div>

        <div className="info-section">
          <h3>Pago</h3>
          <p>{order.payment?.method === "mercadopago" ? "Mercado Pago" : order.payment?.method}</p>
          <p>${order.total?.toLocaleString("es-AR")} ARS</p>
          <p>{new Date(order.confirmation_date).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="order-items">
        <h3>Productos</h3>
        {order.items?.map((item) => (
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
        <p>Subtotal: ${order.subtotal?.toLocaleString("es-AR")}</p>
        <p>Envío: {order.shipping_cost ? `$${order.shipping_cost}` : "Gratis"}</p>
        <h3>Total: ${order.total?.toLocaleString("es-AR")}</h3>
      </div>
    </div>
  );
};

export default OrderTracking;
