import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./payment.css";

function Payment() {
  const navigate = useNavigate();
  const [metodo, setMetodo] = useState("credito");

  const handleNext = () => {
    navigate("/checkout/confirmation");
  };

  return (
    <div className="pago-container">
      <h2>Método de pago</h2>

      <div className="metodos">
        <label className="metodo-item">
          <input
            type="radio"
            name="metodo"
            value="credito"
            checked={metodo === "credito"}
            onChange={(e) => setMetodo(e.target.value)}
          />
          Tarjeta de crédito
        </label>

        <label className="metodo-item">
          <input
            type="radio"
            name="metodo"
            value="debito"
            checked={metodo === "debito"}
            onChange={(e) => setMetodo(e.target.value)}
          />
          Tarjeta de débito
        </label>

        <label className="metodo-item">
          <input
            type="radio"
            name="metodo"
            value="mercadopago"
            checked={metodo === "mercadopago"}
            onChange={(e) => setMetodo(e.target.value)}
          />
          Mercado Pago
        </label>
      </div>

      {/* Formulario para tarjeta */}
      {(metodo === "credito" || metodo === "debito") && (
        <div className="form-tarjeta slide-in">
          <h3>Datos de la tarjeta</h3>
          <form>
            <label>Nombre del titular</label>
            <input type="text" placeholder="Ej: Juan Pérez" required />

            <label>Número de tarjeta</label>
            <input type="text" placeholder="XXXX XXXX XXXX XXXX" required />

            <div className="tarjeta-row">
              <div>
                <label>Vencimiento</label>
                <input type="text" placeholder="MM/AA" required />
              </div>
              <div>
                <label>CVV</label>
                <input type="text" placeholder="123" required />
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Información de Mercado Pago */}
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
        Confirmar compra
      </button>
    </div>
  );
}

export default Payment;
