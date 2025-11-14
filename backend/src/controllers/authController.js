import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../config/db.js"; // ahora supabase está en config
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const TOKEN_EXPIRES = "8h";

// comparar hash o texto plano (para compatibilidad)
async function comparePassword(input, stored) {
  // si el stored parece hash bcrypt (empieza con $2a/2b/2y)
  if (/^\$2[aby]\$/.test(stored)) {
    return bcrypt.compare(input, stored);
  }
  // guardado en texto plano, comparar directo
  return input === stored;
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Los campos usuario y password no pueden estar vacios" });

    // 1) Probar en tabla admin
    let { data: admins, error: errA } = await supabase
      .from("admin")
      .select("admin_id, user_name, password")
      .eq("user_name", username)
      .limit(1);

    if (errA) console.error("login admin error:", errA);

    if (admins && admins.length) {
      const u = admins[0];
      const ok = await comparePassword(password, u.password || "");
      if (!ok) return res.status(401).json({ error: "Credenciales inválidas" });

      const token = jwt.sign(
        { sub: u.admin_id, role: "admin", user_name: u.user_name },
        JWT_SECRET,
        { expiresIn: TOKEN_EXPIRES }
      );
      return res.json({ token, role: "admin" });
    }

    // 2) Probar en tabla seller 
    let { data: sellers, error: errS } = await supabase
      .from("seller")
      .select("seller_id, user_name, password")
      .eq("user_name", username)
      .limit(1);

    if (errS) console.error("login seller error:", errS);

    if (sellers && sellers.length) {
      const u = sellers[0];
      const ok = await comparePassword(password, u.password || "");
      if (!ok) return res.status(401).json({ error: "Credenciales inválidas" });

      const token = jwt.sign(
        { sub: u.seller_id, role: "seller", user_name: u.user_name },
        JWT_SECRET,
        { expiresIn: TOKEN_EXPIRES }
      );
      return res.json({ token, role: "seller" });
    }

    return res.status(404).json({ error: "Usuario no encontrado" });
  } catch (e) {
    console.error("login fatal:", e);
    return res.status(500).json({ error: "Error interno" });
  }
};
