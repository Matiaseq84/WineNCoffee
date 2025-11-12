import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
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

  const [datosTarjeta, setDatosTarjeta] = useState({
    nombre: "",
    numero: "",
    vencimiento: "",
    cvv: "",
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
  const metodoTarjeta = payment || "";

  if (stored) {
    const parsed = JSON.parse(stored);

    // Si ya hay costo guardado en localStorage, lo usamos directamente
    if (parsed.envioLocal) {
      setEnvioLocal(parsed.envioLocal);
      setShippingCost(parsed.envioLocal);
    }

    setUserData((prev) => ({
      ...prev,
      ...parsed,
      paymentMethod: metodoTarjeta,
    }));
  }

  // Recupera datos de tarjeta según método
  if (metodoTarjeta === "credito" || metodoTarjeta === "debito") {
    const datosGuardados = localStorage.getItem(`datosTarjeta_${metodoTarjeta}`);
    if (datosGuardados) {
      setDatosTarjeta(JSON.parse(datosGuardados));
    }
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

  const handleSaveSection = (section) => {
    if (section === "payment") {
      localStorage.setItem("paymentMethod", userData.paymentMethod);
      if (
        userData.paymentMethod === "credito" ||
        userData.paymentMethod === "debito"
      ) {
        localStorage.setItem(
          `datosTarjeta_${userData.paymentMethod}`,
          JSON.stringify(datosTarjeta)
        );
      }
    } else {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
    setEditing((prev) => ({ ...prev, [section]: false }));
  };

  const handleEdit = (section) => {
    setEditing((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleChangeTarjeta = (e) => {
    const { name, value } = e.target;
    const nuevos = { ...datosTarjeta, [name]: value };
    setDatosTarjeta(nuevos);
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
            <button
              className="btn-save"
              onClick={() => handleSaveSection("personal")}
            >
              Guardar
            </button>
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
            <button
              className="btn-save"
              onClick={() => handleSaveSection("shipping")}
            >
              Guardar
            </button>
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
            <label>Seleccioná tu método de pago:</label>
            <select
              value={userData.paymentMethod}
              onChange={(e) =>
                setUserData({ ...userData, paymentMethod: e.target.value })
              }
            >
              <option value="">Seleccionar...</option>
              <option value="credito">Tarjeta de Crédito</option>
              <option value="debito">Tarjeta de Débito</option>
              <option value="mercadopago">Mercado Pago</option>
              <option value="transferencia">Transferencia Bancaria</option>
            </select>

            {(userData.paymentMethod === "credito" ||
              userData.paymentMethod === "debito") && (
              <div className="form-tarjeta slide-in">
                <h4>
                  Datos de la tarjeta{" "}
                  <span style={{ color: "#888" }}>
                    ({userData.paymentMethod === "credito"
                      ? "Crédito"
                      : "Débito"}
                    )
                  </span>
                </h4>
                <label>Nombre del titular</label>
                <input
                  type="text"
                  name="nombre"
                  value={datosTarjeta.nombre}
                  onChange={handleChangeTarjeta}
                  placeholder="Ej: Juan Pérez"
                />

                <label>Número de tarjeta</label>
                <input
                  type="text"
                  name="numero"
                  value={datosTarjeta.numero}
                  onChange={handleChangeTarjeta}
                  placeholder="XXXX XXXX XXXX XXXX"
                />

                <div className="tarjeta-row">
                  <div>
                    <label>Vencimiento</label>
                    <input
                      type="text"
                      name="vencimiento"
                      value={datosTarjeta.vencimiento}
                      onChange={handleChangeTarjeta}
                      placeholder="MM/AA"
                    />
                  </div>
                  <div>
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={datosTarjeta.cvv}
                      onChange={handleChangeTarjeta}
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            )}

            {userData.paymentMethod === "mercadopago" && (
              <div className="mercadopago-info fade-in">
                <h4>Pagá con tu cuenta de Mercado Pago</h4>
                <p>
                  <strong>Usá tus tarjetas guardadas</strong>, dinero disponible y
                  mucho más.
                </p>
                <p>
                  <strong>Accedé a Cuotas sin Tarjeta</strong> para comprar ahora y
                  pagar después.
                </p>
                <div className="logos">
                  <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" />
                  <img
                    src="https://img.icons8.com/color/48/mastercard.png"
                    alt="Mastercard"
                  />
                  <img
                    src="https://img.icons8.com/color/48/amex.png"
                    alt="Amex"
                  />
                  <img
                    src="https://img.icons8.com/color/48/mercado-pago.png"
                    alt="Mercado Pago"
                  />
                </div>
                <p className="mp-footer">
                  Te llevaremos a <strong>Mercado Pago</strong>.<br />
                  Si no tenés una cuenta, podés usar tu e-mail.
                </p>
              </div>
            )}

            <button
              className="btn-save"
              onClick={() => handleSaveSection("payment")}
            >
              Guardar
            </button>
          </div>
        ) : (
          <>
            {userData.paymentMethod === "credito" ||
            userData.paymentMethod === "debito" ? (
              <ul className="data-list">
                <li>
                  <strong>
                    {userData.paymentMethod === "credito"
                      ? "Tarjeta de Crédito"
                      : "Tarjeta de Débito"}
                  </strong>
                </li>
                <li>
                  <strong>Nombre:</strong> {datosTarjeta.nombre}
                </li>
                <li>
                  <strong>Número:</strong>{" "}
                  {datosTarjeta.numero
                    ? `**** **** **** ${datosTarjeta.numero.slice(-4)}`
                    : ""}
                </li>
                <li>
                  <strong>Vencimiento:</strong> {datosTarjeta.vencimiento}
                </li>
              </ul>
            ) : userData.paymentMethod === "mercadopago" ? (
              <div className="mercadopago-info fade-in">
                <strong>Pago con Mercado Pago</strong>
              </div>
            ) : (
              <p>
                <strong>{userData.paymentMethod || "No especificado"}</strong>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Confirmation;
