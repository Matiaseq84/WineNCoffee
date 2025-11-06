import { useNavigate } from "react-router-dom";
import "./payment.css";

function Payment() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/checkout/confirmation");
  };

  return (
    <div className="pago-container">
      <h2>Método de pago</h2>

      <div className="metodos">
        <label className="metodo-item">
          <input type="radio" name="metodo" defaultChecked />
          Tarjeta de crédito (Mercado Pago)
        </label>

        <label className="metodo-item">
          <input type="radio" name="metodo" />
          Tarjeta de débito (Mercado Pago)
        </label>
      </div>

      <button onClick={handleNext} className="btn-next">
        Confirmar compra
      </button>
    </div>
  );
}

export default Payment;
