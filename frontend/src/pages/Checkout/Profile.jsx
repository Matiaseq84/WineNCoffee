import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    dni: "",
    telefono: "",
    direccion: "",
    cp: "",
  });

  const [envio, setEnvio] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calcularEnvio = () => {
    if (!formData.cp) return;
    // 🔹 Simulamos un costo aleatorio entre 1500 y 3500
    const costo = Math.floor(Math.random() * (3500 - 1500 + 1)) + 1500;
    setEnvio(costo);

    // Guardamos en localStorage para usarlo en el resumen
    localStorage.setItem("shippingCost", costo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!envio) {
      alert("Por favor, calculá el costo de envío antes de continuar.");
      return;
    }
    navigate("/checkout/payment");
  };

  return (
    <form className="identificacion-form" onSubmit={handleSubmit}>
      <h2>Datos Personales</h2>

      <label>Nombre</label>
      <input name="nombre" value={formData.nombre} onChange={handleChange} required />

      <label>Apellido</label>
      <input name="apellido" value={formData.apellido} onChange={handleChange} required />

      <label>Email</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />

      <label>DNI</label>
      <input name="dni" value={formData.dni} onChange={handleChange} required />

      <label>Teléfono</label>
      <input name="telefono" value={formData.telefono} onChange={handleChange} required />

      <label>Dirección</label>
      <input name="direccion" value={formData.direccion} onChange={handleChange} required />

      <label>Código Postal</label>
      <div className="cp-section">
        <input
          name="cp"
          value={formData.cp}
          onChange={handleChange}
          placeholder="Ej. 1425"
          required
        />
        <button
          type="button"
          onClick={calcularEnvio}
          className="btn-cp"
        >
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
  );
}

export default Profile;
