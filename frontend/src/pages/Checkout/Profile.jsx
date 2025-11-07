import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

function Profile() {
  const navigate = useNavigate();

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

  const [envio, setEnvio] = useState(null);

  const handlePersonalChange = (e) => {
    setPersonalData({ ...personalData, [e.target.name]: e.target.value });
  };

  const handleShippingChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const calcularEnvio = () => {
    if (!shippingData.cp || shippingData.cp.length < 4) {
      alert("Ingresá un código postal válido.");
      return;
    }

    // Calcular un costo de envío simulado
    const costo = Math.floor(Math.random() * (3500 - 1500 + 1)) + 1500;
    setEnvio(costo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Guardamos los datos del usuario, pero NO el costo de envío
    localStorage.setItem(
      "userData",
      JSON.stringify({ personalData, shippingData })
    );

    navigate("/checkout/payment");
  };

  return (
    <div className="profile-container">
      {/* Bloque 1 - Datos personales */}
      <div className="form-block">
        <h2>Datos Personales</h2>
        <form className="identificacion-form">
          <label>Nombre</label>
          <input name="nombre" value={personalData.nombre} onChange={handlePersonalChange} required />

          <label>Apellido</label>
          <input name="apellido" value={personalData.apellido} onChange={handlePersonalChange} required />

          <label>Email</label>
          <input type="email" name="email" value={personalData.email} onChange={handlePersonalChange} required />

          <label>DNI</label>
          <input name="dni" value={personalData.dni} onChange={handlePersonalChange} required />

          <label>Teléfono</label>
          <input name="telefono" value={personalData.telefono} onChange={handlePersonalChange} required />
        </form>
      </div>

      {/* Bloque 2 - Datos de envío */}
      <div className="form-block">
        <h2>Datos de Envío</h2>
        <form className="envio-form" onSubmit={handleSubmit}>
          <label>Calle</label>
          <input name="calle" value={shippingData.calle} onChange={handleShippingChange} required />

          <label>Altura</label>
          <input name="altura" value={shippingData.altura} onChange={handleShippingChange} required />

          <label>Piso / Dpto</label>
          <input name="piso" value={shippingData.piso} onChange={handleShippingChange} placeholder="Opcional" />

          <label>Ciudad</label>
          <input name="ciudad" value={shippingData.ciudad} onChange={handleShippingChange} required />

          <label>Provincia</label>
          <input name="provincia" value={shippingData.provincia} onChange={handleShippingChange} required />

          <label>Código Postal</label>
          <div className="cp-section">
            <input
              name="cp"
              value={shippingData.cp}
              onChange={handleShippingChange}
              placeholder="Ej. 1425"
              required
            />
            <button type="button" onClick={calcularEnvio} className="btn-cp">
              Calcular envío
            </button>
          </div>

          {envio && (
            <p className="envio-info">
              Costo de envío estimado: <strong>${envio.toLocaleString()}</strong>
            </p>
          )}

          <button type="submit" className="btn-next">
            Ir al pago
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
