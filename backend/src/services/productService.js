import { supabase } from "../config/db.js";

export const getTotalProducts = async () => {
  // count: 'exact' nos da el número total sin bajar todos los datos
  const { count, error } = await supabase
    .from("product")
    .select("*", { count: "exact", head: true });

  if (error) {
    throw new Error("Error al contar productos: " + error.message);
  }

  return count;
};