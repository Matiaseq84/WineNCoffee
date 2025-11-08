import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import Resume from "../../components/Resume";
import "./confirmation.css";

function Confirmation() {
  const { shippingCost, setShippingCost } = useCart();

  const [userData, setUserData] = useState({
    personalData: {
      nombre: "",
      apellido: "",
      email: "",
      dni: "",
      telefono: "",
    },
    shippingData: {
      calle: "",
      altura: "",
      piso: "",
      ciudad: "",
      provincia: "",
      cp: "",
    },
    paymentMethod: "",
  });

  const [editing, setEditing] = useState({
    personal: false,
    shipping: false,
    payment: false,
  });

  const [envioLocal, setEnvioLocal] = useState(shippingCost);

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    const payment = localStorage.getItem("paymentMethod");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUserData((prev) => ({
        ...prev,
        ...parsed,
        paymentMethod: payment || prev.paymentMethod,
      }));
      if (parsed.shippingData?.cp) recalculateShipping(parsed.shippingData.cp);
    }
  }, []);

  const handleChangePersonal = (e) => {
    setUserData({
      ...userData,
      personalData: {
        ...userData.personalData,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleChangeShipping = (e) => {
    setUserData({
      ...userData,
      shippingData: {
        ...userData.shippingData,
        [e.target.name]: e.target.value,
      },
    });
  };

  const recalculateShipping = (cp) => {
    if (!cp || cp.trim().length < 3) return;
    const costo = Math.floor(Math.random() * (3500 - 1500 + 1)) + 1500;
    setEnvioLocal(costo);
    setShippingCost(costo);
  };

  const handleSave = () => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setEditing({ personal: false, shipping: false, payment: false });
  };

  const handleEdit = (section) => {
    setEditing((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="confirmation-container">
      <h2>Confirmación de la Compra</h2>

      {/* DATOS PERSONALES */}
      <div className="section-block">
        <div className="section-header">
          <h3>Datos Personales</h3>
          <button className="edit-btn" onClick={() => handleEdit("personal")}>
            {editing.personal ? "Cancelar" : "Editar"}
          </button>
        </div>

        {editing.personal ? (
          <div className="edit-block">
            {Object.keys(userData.personalData).map((key) => (
              <div className="input-group" key={key}>
                <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input
                  name={key}
                  value={userData.personalData[key]}
                  onChange={handleChangePersonal}
                />
              </div>
            ))}
          </div>
        ) : (
          <ul className="data-list">
            {Object.entries(userData.personalData).map(([k, v]) => (
              <li key={k}>
                <strong>{k.charAt(0).toUpperCase() + k.slice(1)}:</strong> {v}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* DATOS DE ENVÍO */}
      <div className="section-block">
        <div className="section-header">
          <h3>Datos de Envío</h3>
          <button className="edit-btn" onClick={() => handleEdit("shipping")}>
            {editing.shipping ? "Cancelar" : "Editar"}
          </button>
        </div>

        {editing.shipping ? (
          <div className="edit-block">
            {Object.keys(userData.shippingData).map((key) => (
              <div className="input-group" key={key}>
                <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input
                  name={key}
                  value={userData.shippingData[key]}
                  onChange={handleChangeShipping}
                />
              </div>
            ))}
            <button
              type="button"
              className="btn-cp"
              onClick={() => recalculateShipping(userData.shippingData.cp)}
            >
              Recalcular envío
            </button>
            {envioLocal && (
              <p className="envio-info">
                Costo de envío estimado: <strong>${envioLocal}</strong>
              </p>
            )}
          </div>
        ) : (
          <ul className="data-list">
            {Object.entries(userData.shippingData).map(([k, v]) => (
              <li key={k}>
                <strong>{k.charAt(0).toUpperCase() + k.slice(1)}:</strong> {v}
              </li>
            ))}
            {envioLocal && (
              <li>
                <strong>Costo de envío:</strong> ${envioLocal.toLocaleString()}
              </li>
            )}
          </ul>
        )}
      </div>

      {/* MÉTODO DE PAGO */}
      <div className="section-block">
        <div className="section-header">
          <h3>Método de Pago</h3>
          <button className="edit-btn" onClick={() => handleEdit("payment")}>
            {editing.payment ? "Cancelar" : "Editar"}
          </button>
        </div>

        {editing.payment ? (
          <div className="edit-block">
            <input
              name="paymentMethod"
              value={userData.paymentMethod}
              onChange={(e) =>
                setUserData({ ...userData, paymentMethod: e.target.value })
              }
              placeholder="Ej: Tarjeta Visa"
            />
          </div>
        ) : (
          <p>
            <strong>{userData.paymentMethod || "No especificado"}</strong>
          </p>
        )}
      </div>

      {/* GUARDAR */}
      <div className="save-btn-wrapper">
        <button className="btn-save" onClick={handleSave}>
          Guardar Cambios
        </button>
      </div>


    </div>
  );
}

export default Confirmation;
