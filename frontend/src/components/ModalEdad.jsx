import { useEffect, useState } from "react";
import "./modalEdad.css";

export default function ModalEdad() {
  const [showModal, setShowModal] = useState(false);
  const [mostrarLeyenda, setMostrarLeyenda] = useState(false);

  useEffect(() => {
    const flag = localStorage.getItem("mayorEdad");
    if (!flag) {
      setShowModal(true);
    }
  }, []);

  const handleSi = () => {
    localStorage.setItem("mayorEdad", "true");
    setShowModal(false);
  };

  const handleNo = () => {
    setMostrarLeyenda(true);
  };

  if (!showModal) return null;

  return (
    <div className="edad-overlay">
      <div className="edad-modal">

        <h2>¿Sos mayor de 18 años?</h2>
        <p>Para ingresar al sitio necesitamos confirmar tu edad.</p>

        <div className="edad-botones">
          <button className="btn-no" onClick={handleNo}>No</button>
          <button className="btn-si" onClick={handleSi}>Sí</button>
        </div>

        {mostrarLeyenda && (
          <p className="leyenda">
            No podés ingresar al sitio si sos menor de edad.
          </p>
        )}

      </div>
    </div>
  );
}
