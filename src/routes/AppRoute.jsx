import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Cafe from "../pages/Cafe";
import Vino from "../pages/Vino";
import ProductDetail from "../pages/ProductDetail";
import Carrito from "../pages/Carrito";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminPanel from "../pages/AdminPanel";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AppRoutes() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cafe" element={<Cafe />} />
                <Route path="/vino" element={<Vino />} />
                <Route path="/producto/:id" element={<ProductDetail />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<AdminPanel />} />
            </Routes>
            <Footer/>
        </Router>
    );
}

export default AppRoutes;