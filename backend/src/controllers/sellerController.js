// backend/src/controllers/sellerController.js
import { supabase } from "../config/db.js";
import bcrypt from "bcryptjs";

// POST - Crear seller
export const postSeller = async (req, res) => {
  const { user_name, password } = req.body;

  try {
    if (!user_name || !password) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("seller")
      .insert([{ user_name, password: hashedPassword }])
      .select("seller_id, user_name");

    if (error) {
      console.error("Error supabase postSeller:", error);
      return res
        .status(500)
        .json({ error: "Error al registrar el vendedor" });
    }

    return res
      .status(201)
      .json({ message: "Vendedor registrado correctamente", data });
  } catch (err) {
    console.error("Error al registrar al vendedor:", err.message);
    return res
      .status(500)
      .json({ error: "Error interno al registrar vendedor" });
  }
};

// GET - Listar sellers
export const getSellers = async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("seller")
      .select("seller_id, user_name"); // no devolvemos password

    if (error) {
      console.error("Error supabase getSellers:", error);
      return res
        .status(500)
        .json({ error: "Error al obtener datos de vendedores" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Error al obtener vendedores:", err.message);
    return res
      .status(500)
      .json({ error: "Error interno al obtener vendedores" });
  }
};

// GET id - Obtener seller por id
export const getSellerById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("seller")
      .select("seller_id, user_name")
      .eq("seller_id", id)
      .single();

    if (error) {
      console.error("Error supabase getSellerById:", error);
      return res
        .status(500)
        .json({ error: "Error al obtener el vendedor" });
    }

    if (!data) {
      return res.status(404).json({ error: "Vendedor no encontrado" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Error al obtener el vendedor:", err.message);
    return res
      .status(500)
      .json({ error: "Error interno al obtener vendedor" });
  }
};

// PUT id - Actualizar seller
export const updateSeller = async (req, res) => {
  const { id } = req.params;
  const { user_name, password } = req.body;

  try {
    const updateData = {};

    if (user_name) updateData.user_name = user_name;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const { data, error } = await supabase
      .from("seller")
      .update(updateData)
      .eq("seller_id", id)
      .select("seller_id, user_name")
      .single();

    if (error) {
      console.error("Error supabase updateSeller:", error);
      return res
        .status(500)
        .json({ error: "Error al actualizar el vendedor" });
    }

    if (!data) {
      return res.status(404).json({ error: "Vendedor no encontrado" });
    }

    return res
      .status(200)
      .json({ message: "Vendedor actualizado correctamente", data });
  } catch (err) {
    console.error("Error al actualizar vendedor:", err.message);
    return res
      .status(500)
      .json({ error: "Error interno al actualizar vendedor" });
  }
};

// DELETE - Eliminar seller
export const deleteSeller = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("seller")
      .delete()
      .eq("seller_id", id)
      .select("seller_id")
      .single();

    if (error) {
      console.error("Error supabase deleteSeller:", error);
      return res
        .status(500)
        .json({ error: "Error al eliminar el vendedor" });
    }

    if (!data) {
      return res.status(404).json({ error: "Vendedor no encontrado" });
    }

    return res
      .status(200)
      .json({ message: "Vendedor eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar vendedor:", err.message);
    return res
      .status(500)
      .json({ error: "Error interno al eliminar vendedor" });
  }
};
