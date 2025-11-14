// backend/src/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../config/db.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const TOKEN_EXPIRES = "8h";

// Helper para soportar contraseñas hasheadas y texto plano
async function comparePassword(input, stored) {
  // si es un hash bcrypt ($2a / $2b / $2y)
  if (/^\$2[aby]\$/.test(stored)) {
    return bcrypt.compare(input, stored);
  }
  // compatibilidad temporal: texto plano
  return input === stored;
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Faltan credenciales" });
    }

    //  1) Buscar en tabla admin 
    let { data: adminData, error: adminError } = await supabase
      .from("admin")
      .select("admin_id, user_name, password")
      .eq("user_name", username)
      .limit(1);

    if (adminError) {
      console.error("Error buscando admin:", adminError);
    }

    if (adminData && adminData.length > 0) {
      const u = adminData[0];
      const ok = await comparePassword(password, u.password || "");

      if (!ok) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      const token = jwt.sign(
        { sub: u.admin_id, role: "admin", user_name: u.user_name },
        JWT_SECRET,
        { expiresIn: TOKEN_EXPIRES }
      );

      return res.json({ token, role: "admin" });
    }

    // 2) Buscar en tabla seller si existe 
    let { data: sellerData, error: sellerError } = await supabase
      .from("seller")
      .select("seller_id, user_name, password")
      .eq("user_name", username)
      .limit(1);

    if (sellerError) {
      console.error("Error buscando seller:", sellerError);
    }

    if (sellerData && sellerData.length > 0) {
      const u = sellerData[0];
      const ok = await comparePassword(password, u.password || "");

      if (!ok) {
        return res.status(401).json({ error: "Credenciales inválidas" });
      }

      const token = jwt.sign(
        { sub: u.seller_id, role: "seller", user_name: u.user_name },
        JWT_SECRET,
        { expiresIn: TOKEN_EXPIRES }
      );

      return res.json({ token, role: "seller" });
    }

    // Si no se encontro en ninguna tabla
    return res.status(404).json({ error: "Usuario no encontrado" });
  } catch (e) {
    console.error("Error en login:", e);
    return res.status(500).json({ error: "Error interno en login" });
  }
};
