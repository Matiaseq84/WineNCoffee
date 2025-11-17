import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import SearchBar from "./SearchBar"; 
import "./navbar.css";

function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const { count } = useCart();
  const location = useLocation();  

  const alternar = () => setAbierto(v => !v);
  const cerrar = () => setAbierto(false);

  const isHome = location.pathname === "/";
  const isCheckout = location.pathname.startsWith("/checkout");

  return (
    <header className={`navbar ${isCheckout ? "navbar-checkout" : ""}`}>
      <div className="nav-container">

        {/* ⭐ Solo el logo centrado si estamos en checkout */}
        {isCheckout ? (
          <div className="logo-centered">
            <Link to="/" className="brand" onClick={cerrar}>
              <img src="/icono-blanco.png" alt="Wine & Coffee" className="brand-logo" />
              <span>Wine & Coffee</span>
            </Link>
          </div>
        ) : (
          <>
            {/* Brand normal */}
            <Link to="/" className="brand" onClick={cerrar}>
              <img src="/icono-blanco.png" alt="Wine & Coffee" className="brand-logo" />
              <span>Wine & Coffee</span>
            </Link>

            {/* 🔍 SearchBar solo si NO estás en Home */}
            {!isHome && (
              <div className="navbar-search">
                <SearchBar />
              </div>
            )}

            {/* Hamburguesa */}
            <button
              className={`hamburger ${abierto ? "is-open" : ""}`}
              aria-label="Menú"
              aria-expanded={abierto}
              aria-controls="menu"
              onClick={alternar}
            >
              <span />
              <span />
              <span />
            </button>

            {/* Menú normal */}
            <nav id="menu" className={`menu ${abierto ? "abierta" : ""}`}>
              <NavLink to="/" onClick={cerrar} className="navlink">Home</NavLink>
              <NavLink to="/cafe" onClick={cerrar} className="navlink">Café</NavLink>
              <NavLink to="/vino" onClick={cerrar} className="navlink">Vino</NavLink>

              <NavLink to="/carrito" onClick={cerrar} className="navlink carrito-link">
                Carrito {count > 0 && <span className="cart-count">{count}</span>}
              </NavLink>

              <NavLink to="/login" onClick={cerrar} className="navlink">Login</NavLink>
            </nav>
          </>
        )}

      </div>
    </header>
  );
}

export default Navbar;
