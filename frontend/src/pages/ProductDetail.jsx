// src/pages/ProductDetail.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { getProductById } from "../services/productService";
import ModalEdad from "../components/ModalEdad";
import "./productDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  const [cantidad, setCantidad] = useState(1);

  const [mayorEdad, setMayorEdad] = useState(
    localStorage.getItem("mayorEdad") === "true"
  );

  const handleAceptarEdad = () => {
     localStorage.setItem("mayorEdad", "true");
    setMayorEdad(true);
  };

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const data = await getProductById(id);
        setProducto(data);
      } catch (err) {
        console.error("Error cargando producto:", err);
      } finally {
        setLoading(false);
      }
    };

    cargarProducto();
  }, [id]);

  if (loading) return <p className="pd-loading">Cargando producto...</p>;
  if (!producto) return <p className="pd-error">Producto no encontrado.</p>;

  const esVino = producto.category?.toLowerCase().includes("vino");

  return (
    <div className="pd-container">
      {/* Si es vino y el usuario no verificó edad → Modal */}
      {esVino && !mayorEdad && <ModalEdad onAceptar={handleAceptarEdad} />}

      <div className="pd-card">
        <div
          className="pd-img"
          style={{
            backgroundImage: `url(${import.meta.env.VITE_API_URL}${producto.photo || producto.thumbnail})`,
          }}
        />

        <div className="pd-info">
          <h2>{producto.name}</h2>
          <p className="pd-description">{producto.description}</p>

          <div className="pd-price">${producto.price}</div>

          <div className="pd-quantity">
            <button
              onClick={() => setCantidad((c) => Math.max(1, c - 1))}
            >
              -
            </button>

            <span>{cantidad}</span>

            <button
              onClick={() => setCantidad((c) => c + 1)}
            >
              +
            </button>
          </div>

          <button
            className="pd-btn-add"
            onClick={() => addItem(producto, cantidad)}
            disabled={esVino && !mayorEdad}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
