
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // items: array de productos en el carrito
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Error leyendo carrito:", e);
      return [];
    }
  });

  // shippingCost: costo de envío calculado por Profile (NO persistido por defecto)
  const [shippingCost, setShippingCost] = useState(null);

  // Se persiste solo el carrito en localStorage para que sobreviva recargas
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (e) {
      console.error("Error guardando carrito:", e);
    }
  }, [items]);

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
          id,
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
      prev.map((p) => (getId(p) === id ? { ...p, qty: (p.qty || 1) + 1 } : p))
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
      value={{
        items,
        addItem,
        removeItem,
        clear,
        inc,
        dec,
        total,
        count,
        shippingCost,
        setShippingCost,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook para consumir el contexto
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
};

