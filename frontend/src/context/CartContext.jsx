import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

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

  // Función auxiliar para obtener el ID universal
  const getId = (obj) => obj.id ?? obj.product_id;

  const addItem = (item) => {
    setItems((prev) => {
      const id = getId(item);
      const found = prev.find((p) => getId(p) === id);
      if (found) {
        return prev.map((p) =>
          getId(p) === id ? { ...p, qty: (p.qty || 1) + 1 } : p
        );
      }
      return [
        ...prev,
        {
          ...item,
          id, // normalizamos para el futuro
          qty: item.qty || 1,
          price: Number(item.price || 0),
        },
      ];
    });
  };

  const removeItem = (id) =>
    setItems((prev) => prev.filter((p) => getId(p) !== id));

  const clear = () => setItems([]);

  const inc = (id) =>
    setItems((prev) =>
      prev.map((p) =>
        getId(p) === id ? { ...p, qty: (p.qty || 1) + 1 } : p
      )
    );

  const dec = (id) =>
    setItems((prev) =>
      prev.map((p) =>
        getId(p) === id ? { ...p, qty: Math.max(1, (p.qty || 1) - 1) } : p
      )
    );

  const total = items.reduce(
    (n, it) => n + (Number(it.price) || 0) * (it.qty || 0),
    0
  );

  const count = items.reduce((n, it) => n + (it.qty || 0), 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clear, inc, dec, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
