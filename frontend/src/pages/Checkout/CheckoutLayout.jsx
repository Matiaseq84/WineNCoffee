import { Outlet, useLocation, Link } from "react-router-dom";
import ResumenCompra from "../../components/Resume";
import "./CheckoutLayout.css";

function CheckoutLayout() {
  const location = useLocation();

  const steps = [
    { path: "/checkout/identificacion", label: "1. Identificación" },
    { path: "/checkout/pago", label: "2. Pago" },
    { path: "/checkout/confirmacion", label: "3. Confirmación" },
  ];

  return (
    <div className="checkout-container">
      {/* Barra de progreso o pasos */}
      <nav className="checkout-steps">
        {steps.map((s) => (
          <Link
            key={s.path}
            to={s.path}
            className={`step-link ${location.pathname === s.path ? "active" : ""}`}
          >
            {s.label}
          </Link>
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
