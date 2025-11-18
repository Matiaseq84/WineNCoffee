import { useEffect, useState } from "react";
import api from "../services/api";

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const loadOrders = async () => {
    try {
      setErr("");
      setLoading(true);
      const { data } = await api.get("/order"); // GET /order
      setOrders(data || []);
    } catch (e) {
      console.error("Error cargando pedidos:", e);
      setErr("No se pudieron cargar los pedidos.");
    } finally {
      setLoading(false);
    }
  };

  /*
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/order/${id}`, { status });
      await loadOrders();
    } catch (e) {
      console.error("Error actualizando estado:", e);
      alert("No se pudo actualizar el estado del pedido. Revisá el enum order_status.");
    }
  };
  */
  
  const updateStatus = async (id, status) => {
  try {
    await api.put(`/order/${id}/status`, { status }); // 👈 OJO: /status al final
    await loadOrders();
  } catch (e) {
    console.error("Error actualizando estado:", e);
    alert("No se pudo actualizar el estado del pedido. Revisá el enum order_status.");
  }
};


  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) return <p>Cargando pedidos...</p>;
  if (err) return <p style={{ color: "crimson" }}>{err}</p>;
  if (!orders.length) return <p>No hay pedidos por el momento.</p>;

  return (
    <div>
      <h2>Pedidos</h2>
      <table
        border="1"
        cellPadding="6"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente (ID)</th>
            <th>Estado</th>
            <th>Importe</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.order_id}>
              <td>{o.order_id}</td>
              <td>{o.client_id}</td>
              <td>{o.status}</td>
              <td>{o.amount}</td>
              <td>
                {o.order_date
                  ? new Date(o.order_date).toLocaleString()
                  : "N/D"}
              </td>
              <td>
                <button onClick={() => updateStatus(o.order_id, "pending")}>
                  🕓Pendiente
                </button>
                <button onClick={() => updateStatus(o.order_id, "paid")}>
                  💳Pagado
                </button>
                <button onClick={() => updateStatus(o.order_id, "shipped")}>
                  🚚Enviado
                </button>
                <button onClick={() => updateStatus(o.order_id, "cancelled")}>
                  ❌Cancelado
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
