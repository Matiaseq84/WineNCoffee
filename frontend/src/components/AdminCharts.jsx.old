//export default function AdminCharts() {
//  return <div style={{padding:12, border:'1px dashed #ccc'}}>Charts OK ✅</div>;
//}

import { useEffect, useState } from "react";
import api from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function AdminCharts() {
  const [kpis, setKpis] = useState({ totalAdmins: 0, totalProducts: 0 });
  const [series, setSeries] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/metrics");
        setKpis(data?.kpis || { totalAdmins: 0, totalProducts: 0 });
        setSeries(data?.salesSeries || []);
      } catch (error) {
        console.warn("No se pudo cargar /metrics, usando datos de prueba:", error);
        // Datos mock (muestran algo aunque no haya backend)
        setKpis({ totalAdmins: 2, totalProducts: 5 });
        setSeries([
          { date: "2025-11-01", total: 12 },
          { date: "2025-11-02", total: 18 },
          { date: "2025-11-03", total: 9 },
          { date: "2025-11-04", total: 21 },
          { date: "2025-11-05", total: 15 },
        ]);
      }
    })();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
        <div className="card">
          Admins: <b>{kpis.totalAdmins}</b>
        </div>
        <div className="card">
          Productos: <b>{kpis.totalProducts}</b>
        </div>
      </div>

      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer>
          <LineChart data={series}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line dataKey="total" type="monotone" stroke="#007bff" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
