import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./payment.css";

function Payment() {
  const navigate = useNavigate();
  const [metodo, setMetodo] = useState("");
  const [error, setError] = useState(""); // ⬅ Nuevo estado de error

  const [datosTarjeta, setDatosTarjeta] = useState({
    nombre: "",
    numero: "",
    vencimiento: "",
    cvv: "",
  });

  useEffect(() => {
    const metodoGuardado = localStorage.getItem("paymentMethod");
    if (metodoGuardado) {
      setMetodo(metodoGuardado);
      const datosGuardados = localStorage.getItem(`datosTarjeta_${metodoGuardado}`);
      if (datosGuardados) {
        setDatosTarjeta(JSON.parse(datosGuardados));
      }
    }
  }, []);

  const handleMetodoChange = (e) => {
    const value = e.target.value;
    setMetodo(value);
    setError(""); // Limpia el error al cambiar método
    localStorage.setItem("paymentMethod", value);

    const datosGuardados = localStorage.getItem(`datosTarjeta_${value}`);
    if (datosGuardados) {
      setDatosTarjeta(JSON.parse(datosGuardados));
    } else {
      setDatosTarjeta({
        nombre: "",
        numero: "",
        vencimiento: "",
        cvv: "",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setError("");
    const nuevosDatos = { ...datosTarjeta, [name]: value };
    setDatosTarjeta(nuevosDatos);

    if (metodo === "credito" || metodo === "debito") {
      localStorage.setItem(`datosTarjeta_${metodo}`, JSON.stringify(nuevosDatos));
    }
  };

  const handleNext = () => {
    if (!metodo) {
      setError("Seleccioná un método de pago antes de continuar.");
      return;
    }

    if (metodo === "credito" || metodo === "debito") {
      const { nombre, numero, vencimiento, cvv } = datosTarjeta;
      if (!nombre || !numero || !vencimiento || !cvv) {
        setError("Completá todos los datos de la tarjeta antes de continuar.");
        return;
      }
    }

    setError("");
    navigate("/checkout/confirmation");
  };

  return (
    <div className="pago-container">
      <h2>Método de pago</h2>

      <div className="metodos">
        {["credito", "debito", "mercadopago"].map((op) => (
          <label className="metodo-item" key={op}>
            <input
              type="radio"
              name="metodo"
              value={op}
              checked={metodo === op}
              onChange={handleMetodoChange}
            />
            {op === "credito"
              ? "Tarjeta de crédito"
              : op === "debito"
              ? "Tarjeta de débito"
              : "Mercado Pago"}
          </label>
        ))}
      </div>

      {(metodo === "credito" || metodo === "debito") && (
        <div className="form-tarjeta slide-in">
          <h3>
            Datos de la tarjeta{" "}
            <span style={{ color: "#888" }}>
              ({metodo === "credito" ? "Crédito" : "Débito"})
            </span>
          </h3>

          <form>
            <label>Nombre del titular</label>
            <input
              type="text"
              name="nombre"
              placeholder="Ej: Juan Pérez"
              value={datosTarjeta.nombre}
              onChange={handleInputChange}
              required
            />

            <label>Número de tarjeta</label>
            <input
              type="text"
              name="numero"
              placeholder="XXXX XXXX XXXX XXXX"
              value={datosTarjeta.numero}
              onChange={handleInputChange}
              required
            />

            <div className="tarjeta-row">
              <div>
                <label>Vencimiento</label>
                <input
                  type="text"
                  name="vencimiento"
                  placeholder="MM/AA"
                  value={datosTarjeta.vencimiento}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  placeholder="123"
                  value={datosTarjeta.cvv}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </form>
        </div>
      )}

      {metodo === "mercadopago" && (
        <div className="mercadopago-info fade-in">
          <h3>Pagá con tu cuenta de Mercado Pago</h3>
          <p>
            <strong>Usá tus tarjetas guardadas</strong>, dinero disponible y mucho más.
          </p>
          <p>
            <strong>Accedé a Cuotas sin Tarjeta</strong> para comprar ahora y pagar después.
          </p>

          <div className="logos">
            <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" />
            <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" />
            <img src="https://img.icons8.com/color/48/amex.png" alt="Amex" />
            <img src="https://img.icons8.com/color/48/mercado-pago.png" alt="Mercado Pago" />
          </div>

          <p className="mp-footer">
            Te llevaremos a <strong>Mercado Pago</strong>.<br />Si no tenés una cuenta, podés usar tu e-mail.
          </p>
        </div>
      )}

      {/* MENSAJE DE ERROR RENDERIZADO */}
      {error && <div className="mensaje-error">{error}</div>}

      <button onClick={handleNext} className="btn-next">
        Continuar
      </button>
    </div>
  );
}

export default Payment;
