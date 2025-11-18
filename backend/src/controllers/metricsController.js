// src/controllers/metricsController.js
import { getTotalAdmins } from "../services/adminService.js";
import { getTotalProducts } from "../services/productService.js";
import { getLastDaysSales, getTotalRevenue } from "../services/saleService.js";

export const getMetrics = async (_req, res) => {
  try {
    // Ejecutamos todas las consultas en paralelo para velocidad
    const [totalAdmins, totalProducts, salesSeries, totalRevenue] = await Promise.all([
      getTotalAdmins(),       // Servicio creado anteriormente
      getTotalProducts(),     // Servicio creado anteriormente
      getLastDaysSales(7),    // Obtenemos los datos reales para el gráfico
      getTotalRevenue()       // Total histórico de plata (opcional)
    ]);

    // KPI Object: Agregamos totalRevenue para mostrar "Ingresos Totales"
    const kpis = { 
        totalAdmins, 
        totalProducts,
        totalRevenue 
    };

    // salesSeries ya viene con el formato [{ date: "2025-11-18", total: 1500 }, ...]
    return res.json({ kpis, salesSeries });

  } catch (err) {
    console.error("getMetrics error:", err);
    return res.status(500).json({ error: "Error al obtener métricas del dashboard" });
  }
};