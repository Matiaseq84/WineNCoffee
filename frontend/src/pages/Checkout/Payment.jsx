import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./payment.css";

function Payment() {
  const navigate = useNavigate();
  const [metodo, setMetodo] = useState("credito");
  const [datosTarjeta, setDatosTarjeta] = useState({
    nombre: "",
    numero: "",
    vencimiento: "",
    cvv: "",
  });

  const handleMetodoChange = (e) => {
    const value = e.target.value;
    setMetodo(value);
    localStorage.setItem("metodoPago", value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const nuevosDatos = { ...datosTarjeta, [name]: value };
    setDatosTarjeta(nuevosDatos);
    localStorage.setItem("datosTarjeta", JSON.stringify(nuevosDatos));
  };

  const handleNext = () => {
    // Asegura que haya un método de pago antes de continuar
    if (!metodo) {
      alert("Seleccioná un método de pago antes de continuar.");
      return;
    }

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
          <h3>Datos de la tarjeta</h3>
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
            Te llevaremos a <strong>Mercado Pago</strong>.<br />
            Si no tenés una cuenta, podés usar tu e-mail.
          </p>
        </div>
      )}

      <button onClick={handleNext} className="btn-next">
        Continuar
      </button>
    </div>
  );
}

export default Payment;
