// src/pages/Checkout/CheckoutLayout.jsx
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ResumenCompra from "../../components/Resume";
import "./CheckoutLayout.css";

function CheckoutLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirigir automáticamente a /checkout/profile al entrar a /checkout
  useEffect(() => {
    if (location.pathname === "/checkout") {
      navigate("/checkout/profile");
    }
  }, [location, navigate]);

  const steps = [
    { path: "/checkout/profile", label: "1. Identificación" },
    { path: "/checkout/payment", label: "2. Pago" },
    { path: "/checkout/confirmation", label: "3. Confirmación" },
  ];

  return (
    <div className="checkout-container">
      {/* Barra de progreso (solo visual) */}
      <nav className="checkout-steps">
        {steps.map((s) => (
          <span
            key={s.path}
            className={`step-link ${location.pathname === s.path ? "active" : ""}`}
          >
            {s.label}
          </span>
        ))}
      </nav>

      {/* Contenido principal + resumen */}
      <div className="checkout-content">
        <main className="checkout-main">
          <Outlet />
        </main>

        <aside className="checkout-sidebar">
          <ResumenCompra />
        </aside>
      </div>
    </div>
  );
}

export default CheckoutLayout;
