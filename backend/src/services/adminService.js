import { supabase } from "../config/db.js";

// Es vital que tenga "export const" antes del nombre
export const getTotalAdmins = async () => {
  // 'count' exact devuelve el número total sin bajar todos los datos
  const { count, error } = await supabase
    .from("admin")
    .select("*", { count: "exact", head: true });

  if (error) {
    throw new Error("Error al contar admins: " + error.message);
  }

  return count; // Retorna el número (ej: 5)
};