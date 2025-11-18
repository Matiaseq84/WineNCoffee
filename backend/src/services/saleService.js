// src/services/saleService.js
import { supabase } from "../config/db.js";

export const getLastDaysSales = async (days = 7) => {
  // 1. Calcular la fecha de inicio (hoy menos X días)
  const date = new Date();
  date.setDate(date.getDate() - days);
  const startDate = date.toISOString();

  // 2. Pedir a Supabase solo fecha y monto de ventas recientes
  const { data, error } = await supabase
    .from("sale")
    .select("sale_date, amount")
    .gte("sale_date", startDate) // gte = greater than or equal (mayor o igual)
    .order("sale_date", { ascending: true });

  if (error) {
    throw new Error("Error al obtener ventas: " + error.message);
  }

  // 3. Agrupar y sumar por día (Lógica de negocio)
  // Esto convierte [{date: '2025-11-18T10:00', amount: 100}, {date: '2025-11-18T15:00', amount: 50}]
  // en -> {'2025-11-18': 150}
  const groupedSales = data.reduce((acc, sale) => {
    // Cortamos el string ISO para tener solo YYYY-MM-DD
    const day = sale.sale_date.split("T")[0]; 
    
    if (!acc[day]) {
      acc[day] = 0;
    }
    // Sumamos el monto (asegurando que sea número)
    acc[day] += Number(sale.amount);
    return acc;
  }, {});

  // 4. Formatear para el gráfico del frontend [{ date: "...", total: ... }]
  // Rellenamos días vacíos con 0 si es necesario, o devolvemos solo los días con ventas
  const salesSeries = Object.keys(groupedSales).map((dateKey) => ({
    date: dateKey,
    total: groupedSales[dateKey],
  }));

  return salesSeries;
};

// Extra: Obtener ingreso total histórico
export const getTotalRevenue = async () => {
    // Supabase no tiene SUM directo fácil sin RPC, pero podemos sumar en JS si no son millones de registros
    // O usar una función RPC. Para tu TP, traer solo la columna amount es aceptable.
    const { data, error } = await supabase.from('sale').select('amount');
    
    if (error) throw error;

    const total = data.reduce((sum, row) => sum + Number(row.amount), 0);
    return total;
}