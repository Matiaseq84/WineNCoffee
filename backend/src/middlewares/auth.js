// backend/src/middlewares/auth.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const m = header.match(/^Bearer\s+(.+)$/i);
  if (!m) {
    return res.status(401).json({ error: "No autorizado" });
  }

  try {
    const payload = jwt.verify(m[1], JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    console.error("Error verificando token:", err);
    return res.status(401).json({ error: "Token inválido" });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Prohibido" });
    }
    next();
  };
}
