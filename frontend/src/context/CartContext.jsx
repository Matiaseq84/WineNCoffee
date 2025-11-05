// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Error leyendo carrito:", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (e) {
      console.error("Error guardando carrito:", e);
    }
  }, [items]);

  const addItem = (item) => {
    setItems(prev => {
      const found = prev.find(p => p.id === item.id);
      if (found) {
        return prev.map(p =>
          p.id === item.id ? { ...p, qty: (p.qty || 1) + 1 } : p
        );
      }
      // garantizo que tenga qty numérico y price numérico
      return [...prev, { ...item, qty: item.qty || 1, price: Number(item.price || item.priceString || 0) }];
    });
  };

  const removeItem = (id) => setItems(prev => prev.filter(p => p.id !== id));
  const clear = () => setItems([]);
  const inc = (id) => setItems(prev => prev.map(p => p.id === id ? { ...p, qty: (p.qty || 1) + 1 } : p));
  const dec = (id) => setItems(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, (p.qty || 1) - 1) } : p));

  const total = items.reduce((n, it) => n + (Number(it.price) || 0) * (it.qty || 0), 0);
  const count = items.reduce((n, it) => n + (it.qty || 0), 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear, inc, dec, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
