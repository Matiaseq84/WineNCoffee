// backend/src/controllers/clientController.js
import { supabase } from "../config/db.js";

export const getClients = async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("client")
      .select("client_id, first_name, last_name")
      .order("first_name", { ascending: true });

    if (error) throw error;

    return res.status(200).json(data || []);
  } catch (err) {
    console.error("Error al obtener clientes:", err);
    return res
      .status(500)
      .json({ error: "Error interno al obtener clientes." });
  }
};
