// src/components/SellerManualOrderForm.jsx
import { useState } from "react";
import api from "../services/api";

export default function SellerManualOrderForm({ onCreated }) {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customer_name: "",
    total_amount: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.customer_name || !form.total_amount) return;

    setLoading(true);
    try {
      // 👇 IMPORTANTE:
      // backend en createOrder.
      await api.post("/order", {
        customer_name: form.customer_name,
        total_amount: Number(form.total_amount),
        status: "pending", // estado inicial 
      });

      setForm({ customer_name: "", total_amount: "" });
      setShowForm(false);

      // Avisamos al padre que recargue la lista de pedidos
      if (onCreated) onCreated();
    } catch (err) {
      console.error(err);
      alert("Error al crear pedido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <button
        type="button"
        onClick={() => setShowForm(!showForm)}
        style={{ marginBottom: 8 }}
      >
        {showForm ? "Cancelar" : "Nuevo pedido"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 8,
          }}
        >
          <input
            placeholder="Nombre del cliente"
            value={form.customer_name}
            onChange={(e) =>
              setForm({ ...form, customer_name: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Total"
            value={form.total_amount}
            min={0}
            step="0.01"
            onChange={(e) =>
              setForm({ ...form, total_amount: e.target.value })
            }
          />

          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar pedido"}
          </button>
        </form>
      )}
    </div>
  );
}
