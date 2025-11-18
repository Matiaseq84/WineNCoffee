// lee datos reales y sino hace un mock

export const getMetrics = async (_req, res) => {
  try {
    //modelos o servicios para obtener datos reales
    // import { listAllAdmins } from "../services/adminService.js";
    // import { listAllProducts } from "../services/productService.js";

    // const admins = await listAllAdmins();
    // const products = await listAllProducts();

    // por ahora devolvemos 0/0
    const totalAdmins = 0;   // reemplazar consulta real
    const totalProducts = 0; // lo mismo

    const kpis = { totalAdmins, totalProducts };

    // Serie temporal mock (hasta tener ordenes/ventas)
    const salesSeries = [
      { date: "2025-11-01", total: 12 },
      { date: "2025-11-02", total: 18 },
      { date: "2025-11-03", total: 9  },
      { date: "2025-11-04", total: 21 },
      { date: "2025-11-05", total: 15 },
    ];

    return res.json({ kpis, salesSeries });
  } catch (err) {
    console.error("getMetrics error:", err);
    return res.status(500).json({ error: "No se pudieron obtener metricas" });
  }
};
