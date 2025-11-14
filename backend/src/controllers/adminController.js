import { supabase } from "../config/db.js";
import bcrypt from "bcryptjs";

// POST - Crear admin
export const postAdmin = async (req, res) => {
  const { user_name, password } = req.body;

  try {
    if (!user_name || !password) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("admin")
      .insert([{ user_name, password: hashedPassword }])
      .select("admin_id, user_name")  // no devolvemos el hash

    if (error) {
      console.error("Error supabase postAdmin:", error);
      return res
        .status(500)
        .json({ error: "Error al registrar el administrador" });
    }

    return res
      .status(201)
      .json({ message: "Administrador registrado correctamente", data });
  } catch (err) {
    console.error("Error al registrar al administrador:", err.message);
    return res
      .status(500)
      .json({ error: "Error interno al registrar administrador" });
  }
};

// GET - Listar admins
export const getAdmins = async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("admin")
      .select("admin_id, user_name"); // no mandamos password

    if (error) {
      console.error("Error supabase getAdmins:", error);
      return res
        .status(500)
        .json({ error: "Error al obtener datos de administradores" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Error al obtener administradores:", err.message);
    return res
      .status(500)
      .json({ error: "Error interno al obtener administradores" });
  }
};

// GET id - Obtener admin por id
export const getAdminById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("admin")
      .select("admin_id, user_name") // de nuevo, sin password
      .eq("admin_id", id)
      .single();

    if (error) {
      console.error("Error supabase getAdminById:", error);
      return res
        .status(500)
        .json({ error: "Error al obtener el administrador" });
    }

    if (!data) {
      return res.status(404).json({ error: "Administrador no encontrado" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Error al obtener el administrador:", err.message);
    return res
      .status(500)
      .json({ error: "Error interno al obtener administrador" });
  }
};

// PUT id - Actualizar admin
export const updateAdmin = async (req, res) => {
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
      .from("admin")
      .update(updateData)
      .eq("admin_id", id)
      .select("admin_id, user_name")  // no devolvemos el hash
      .single();

    if (error) {
      console.error("Error supabase updateAdmin:", error);
      return res
        .status(500)
        .json({ error: "Error al actualizar el administrador" });
    }

    if (!data) {
      return res.status(404).json({ error: "Administrador no encontrado" });
    }

    return res
      .status(200)
      .json({ message: "Administrador actualizado correctamente", data });
  } catch (err) {
    console.error("Error al actualizar administrador:", err.message);
    return res
      .status(500)
      .json({ error: "Error interno al actualizar administrador" });
  }
};

// DELETE - Eliminar admin
export const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("admin")
      .delete()
      .eq("admin_id", id)
      .select("admin_id")
      .single();

    if (error) {
      console.error("Error supabase deleteAdmin:", error);
      return res
        .status(500)
        .json({ error: "Error al eliminar el administrador" });
    }

    if (!data) {
      return res.status(404).json({ error: "Administrador no encontrado" });
    }

    return res
      .status(200)
      .json({ message: "Administrador eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar administrador:", err.message);
    return res
      .status(500)
      .json({ error: "Error interno al eliminar administrador" });
  }
};
