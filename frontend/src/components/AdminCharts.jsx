import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Ahora recibe "data" como propiedad desde el padre (AdminPanel)
export default function AdminCharts({ data }) {
  
  // Si no hay datos o el array está vacío, mostramos un mensaje o un gráfico vacío seguro
  if (!data || data.length === 0) {
    return <p style={{ textAlign: "center", padding: 20 }}>No hay datos de ventas para mostrar aún.</p>;
  }

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }} 
            tickMargin={10}
          />
          <YAxis 
            tick={{ fontSize: 12 }} 
            tickFormatter={(value) => `$${value}`} // Formato moneda en eje Y
          />
          <Tooltip 
            formatter={(value) => [`$${value}`, "Ventas"]} // Formato en el tooltip
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
          />
          <Line 
            type="monotone" 
            dataKey="total" 
            stroke="#8884d8" 
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}