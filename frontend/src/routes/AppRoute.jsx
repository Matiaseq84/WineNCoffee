// src/routes/AppRoute.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from "../pages/Home.jsx";
import Cafe from "../pages/Cafe.jsx";        
import Vino from "../pages/Vino.jsx";         
import ProductDetail from "../pages/ProductDetail.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import AdminPanel from "../pages/AdminPanel.jsx";
import SellerPanel from "../pages/SellerPanel.jsx";


import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

import Carrito from "../pages/Carrito.jsx";
import Checkout from "../pages/Checkout/CheckoutLayout.jsx";
import Profile from "../pages/Checkout/Profile.jsx";
import Payment from "../pages/Checkout/Payment.jsx";
import Confirmation from "../pages/Checkout/Confirmation.jsx";
import OrderTracking from "../pages/OrderTracking.jsx";

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
        <Route path="/checkout" element={<Checkout />}>
          <Route path="profile" element= {<Profile />}/>
          <Route path="payment" element= {<Payment />}/>
          <Route path="confirmation" element= {<Confirmation />}/>
        </Route>
        <Route path="/order/:orderId" element= {<OrderTracking />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPanel />} />   {/*ruta para panel de admin*/}
        <Route path="/seller" element={<SellerPanel />} /> {/*ruta para panel de vendedor*/}
      </Routes>
      <Footer />
    </Router>
  );
}
export default AppRoutes;
