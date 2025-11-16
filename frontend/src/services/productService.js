const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getProducts = async () => {
  const res = await fetch(`${API_URL}/product`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return await res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${API_URL}/product/${id}`);
  if (!res.ok) throw new Error("Producto no encontrado");
  return await res.json();
};

export const createProduct = async (product) => {
  const res = await fetch(`${API_URL}/product`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return await res.json();
};

export const updateProduct = async (id, product) => {
  const res = await fetch(`${API_URL}/product/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Error al actualizar producto");
  return await res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/product/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar producto");
  return await res.json();
};
