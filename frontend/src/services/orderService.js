import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Obtiene la información de un pedido por su ID
 * @param {number|string} orderId - ID numérico o código público del pedido
 * @returns {Promise<Object>} Datos del pedido
 */
export const getOrderById = async (orderId) => {
  try {
    const { data } = await axios.get(`${API_URL}/orders/${orderId}`);
    return data;
  } catch (error) {
    console.error("❌ Error al obtener el pedido:", error);
    throw error;
  }
};
