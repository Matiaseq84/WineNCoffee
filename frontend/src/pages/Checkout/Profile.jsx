// src/pages/Checkout/Profile.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./profile.css";

function Profile() {
  const navigate = useNavigate();
  const { setShippingCost } = useCart();

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

  const [envioLocal, setEnvioLocal] = useState(null);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  // 🔹 Al montar, intentar cargar datos previos del localStorage
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const parsed = JSON.parse(storedUserData);
        if (parsed.personalData) setPersonalData(parsed.personalData);
        if (parsed.shippingData) setShippingData(parsed.shippingData);
        if (parsed.envioConfirmado && parsed.envioLocal) {
          setEnvioLocal(parsed.envioLocal);
          setShippingCost(parsed.envioLocal);
        }
      } catch (e) {
        console.warn("No se pudieron recuperar datos previos:", e);
      }
    }
  }, [setShippingCost]);

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...personalData, [name]: value };
    setPersonalData(updated);
    setErrors((prev) => ({ ...prev, [name]: "" }));
    saveToLocalStorage(updated, shippingData, envioLocal);
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...shippingData, [name]: value };
    setShippingData(updated);
    setErrors((prev) => ({ ...prev, [name]: "" }));
    saveToLocalStorage(personalData, updated, envioLocal);
  };

  const saveToLocalStorage = (personal, shipping, envio) => {
    localStorage.setItem(
      "userData",
      JSON.stringify({
        personalData: personal,
        shippingData: shipping,
        envioLocal: envio,
        envioConfirmado: Boolean(envio),
      })
    );
  };

  const calcularEnvio = () => {
    if (!shippingData.cp || shippingData.cp.trim().length < 3) {
      setGeneralError("Ingresá un código postal válido antes de calcular el envío.");
      return;
    }
    const costo = Math.floor(Math.random() * (3500 - 1500 + 1)) + 1500;
    setEnvioLocal(costo);
    setShippingCost(costo);
    setGeneralError("");
    saveToLocalStorage(personalData, shippingData, costo);
  };

  const validarCampos = () => {
    let newErrors = {};
    let valido = true;

    for (const [key, value] of Object.entries(personalData)) {
      if (!value.trim()) {
        newErrors[key] = "Campo obligatorio";
        valido = false;
      }
    }

    for (const [key, value] of Object.entries(shippingData)) {
      if (key !== "piso" && !value.trim()) {
        newErrors[key] = "Campo obligatorio";
        valido = false;
      }
    }

    if (!envioLocal) {
      setGeneralError("Calculá el costo de envío antes de continuar.");
      valido = false;
    } else {
      setGeneralError("");
    }

    setErrors(newErrors);
    return valido;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarCampos()) return;

    saveToLocalStorage(personalData, shippingData, envioLocal);
    navigate("/checkout/payment");
  };

  return (
    <div className="profile-container">
      <div className="form-block">
        <h2>Datos Personales</h2>
        <form className="identificacion-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-row">
            {["nombre", "apellido", "email", "dni", "telefono"].map((field) => (
              <div className="input-group" key={field}>
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  name={field}
                  value={personalData[field]}
                  onChange={handlePersonalChange}
                  required
                  type={field === "email" ? "email" : "text"}
                />
                {errors[field] && <span className="error-text">{errors[field]}</span>}
              </div>
            ))}
          </div>
        </form>
      </div>

      <div className="form-block">
        <h2>Datos de Envío</h2>
        <form className="envio-form" onSubmit={handleSubmit}>
          <div className="input-row">
            {["calle", "altura", "piso", "ciudad", "provincia", "cp"].map((field) => (
              <div className="input-group" key={field}>
                <label>
                  {field === "cp"
                    ? "Código Postal"
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {field === "cp" ? (
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <input
                      name={field}
                      value={shippingData[field]}
                      onChange={handleShippingChange}
                      placeholder="Ej. 1425"
                      required
                    />
                    <button type="button" onClick={calcularEnvio} className="btn-cp">
                      Calcular envío
                    </button>
                  </div>
                ) : (
                  <input
                    name={field}
                    value={shippingData[field]}
                    onChange={handleShippingChange}
                    placeholder={field === "piso" ? "Opcional" : ""}
                    required={field !== "piso"}
                  />
                )}
                {errors[field] && <span className="error-text">{errors[field]}</span>}
              </div>
            ))}
          </div>

          {envioLocal && (
            <p className="envio-info">
              Costo de envío estimado: <strong>${envioLocal.toLocaleString()}</strong>
            </p>
          )}

          {generalError && <p className="error-text general-error">{generalError}</p>}

          <div style={{ marginTop: "1rem" }}>
            <button type="submit" className="btn-next">
              Ir al pago
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;