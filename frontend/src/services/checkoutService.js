import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Envía los datos del checkout al backend para confirmar la compra.
 * @param {Object} checkoutData  
 * @returns {Promise<Object>} 
 */
export const confirmCheckout = async (checkoutData) => {
  try {
    const response = await axios.post(`${API_URL}/checkout/confirm`, checkoutData);
    return response.data;
  } catch (error) {
    console.error("Error al confirmar el checkout:", error);
    throw error.response?.data || { message: "Error desconocido al confirmar el checkout" };
  }
};
