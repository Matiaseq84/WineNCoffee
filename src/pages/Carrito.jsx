import { createContext, useContext, useMemo, useState } from "react";

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // {id, name, price, qty, img}
  const [isOpen, setIsOpen] = useState(false);

  const open  = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const addItem = (prod) => {
    setItems((prev) => {
      const idx = prev.findIndex(p => p.id === prod.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { ...prod, qty: 1 }];
    });
    open();
  };

  const removeItem = (id) => setItems(prev => prev.filter(p => p.id !== id));
  const dec = (id) => setItems(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, p.qty-1) } : p));
  const inc = (id) => setItems(prev => prev.map(p => p.id === id ? { ...p, qty: p.qty+1 } : p));
  const clear = () => setItems([]);

  const totalQty = items.reduce((n, it) => n + it.qty, 0);
  const subtotal = items.reduce((n, it) => n + (parseFloat((it.priceNum ?? 0)) * it.qty), 0);

  const value = useMemo(() => ({
    items, addItem, removeItem, dec, inc, clear,
    isOpen, open, close, totalQty, subtotal
  }), [items, isOpen, subtotal, totalQty]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
