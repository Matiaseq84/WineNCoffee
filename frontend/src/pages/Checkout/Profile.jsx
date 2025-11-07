// src/pages/Checkout/Profile.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./profile.css";

function Profile() {
  const navigate = useNavigate();
  const { setShippingCost } = useCart(); // setter global

  const [personalData, setPersonalData] = useState({
    nombre: "",
    apellido: "", 
    email: "",
    dni: "",
    telefono: "",
  });

  const [shippingData, setShippingData] = useState({
    calle: "",
    altura: "",
    piso: "",
    ciudad: "",
    provincia: "",
    cp: "",
  });

  const [envioLocal, setEnvioLocal] = useState(null); // para mostrar en esta pantalla

  const handlePersonalChange = (e) => {
    setPersonalData({ ...personalData, [e.target.name]: e.target.value });
  };

  const handleShippingChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const calcularEnvio = () => {
    if (!shippingData.cp || shippingData.cp.trim().length < 3) {
      alert("Ingresá un código postal válido.");
      return;
    }
    const costo = Math.floor(Math.random() * (3500 - 1500 + 1)) + 1500;
    setEnvioLocal(costo);
    setShippingCost(costo); // actualiza contexto (Resume lo mostrará)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // guardamos datos de usuario para que Resume pueda leerlos (opcional)
    localStorage.setItem(
      "userData",
      JSON.stringify({ personalData, shippingData, envioConfirmado: true })
    );
    navigate("/checkout/payment");
  };

  return (
    <div className="profile-container">
      <div className="form-block">
        <h2>Datos Personales</h2>
        <form className="identificacion-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-row">
            <div className="input-group">
              <label>Nombre</label>
              <input name="nombre" value={personalData.nombre} onChange={handlePersonalChange} required />
            </div>

            <div className="input-group">
              <label>Apellido</label>
              <input name="apellido" value={personalData.apellido} onChange={handlePersonalChange} required />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" value={personalData.email} onChange={handlePersonalChange} required />
            </div>

            <div className="input-group">
              <label>DNI</label>
              <input name="dni" value={personalData.dni} onChange={handlePersonalChange} required />
            </div>

            <div className="input-group">
              <label>Teléfono</label>
              <input name="telefono" value={personalData.telefono} onChange={handlePersonalChange} required />
            </div>
          </div>
        </form>
      </div>

      <div className="form-block">
        <h2>Datos de Envío</h2>
        <form className="envio-form" onSubmit={handleSubmit}>
          <div className="input-row">
            <div className="input-group">
              <label>Calle</label>
              <input name="calle" value={shippingData.calle} onChange={handleShippingChange} required />
            </div>

            <div className="input-group">
              <label>Altura</label>
              <input name="altura" value={shippingData.altura} onChange={handleShippingChange} required />
            </div>

            <div className="input-group">
              <label>Piso / Dpto</label>
              <input name="piso" value={shippingData.piso} onChange={handleShippingChange} placeholder="Opcional" />
            </div>

            <div className="input-group">
              <label>Ciudad</label>
              <input name="ciudad" value={shippingData.ciudad} onChange={handleShippingChange} required />
            </div>

            <div className="input-group">
              <label>Provincia</label>
              <input name="provincia" value={shippingData.provincia} onChange={handleShippingChange} required />
            </div>

            <div className="input-group">
              <label>Código Postal</label>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input name="cp" value={shippingData.cp} onChange={handleShippingChange} placeholder="Ej. 1425" required />
                <button type="button" onClick={calcularEnvio} className="btn-cp">Calcular envío</button>
              </div>
            </div>
          </div>

          {envioLocal && (
            <p className="envio-info">Costo de envío estimado: <strong>${envioLocal.toLocaleString()}</strong></p>
          )}

          <div style={{ marginTop: "1rem" }}>
            <button type="submit" className="btn-next">Ir al pago</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
