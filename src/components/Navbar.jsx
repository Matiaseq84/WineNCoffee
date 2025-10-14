import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/cafe">Café</Link>
      <Link to="/vino">Vino</Link>
      <Link to="/carrito">Carrito</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Navbar;