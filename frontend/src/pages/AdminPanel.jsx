import { useState, useEffect } from "react";
import AdminUsers from "../components/AdminUsers.jsx";
import AdminProducts from "../components/AdminProducts.jsx";
import AdminCharts from "../components/AdminCharts.jsx";
// import api from "../services/api"; // Descomenta si usas tu instancia de axios 'api'
import "./AdminPanel.css";

function AdminPanel() {
  const [tab, setTab] = useState("charts");
  const [loading, setLoading] = useState(true);
  
  // Estado inicial con estructura segura
  const [metrics, setMetrics] = useState({
    kpis: { totalAdmins: 0, totalProducts: 0, totalRevenue: 0 },
    salesSeries: []
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Opción A: Usando fetch nativo (ajusta la URL si es necesario)
        const response = await fetch("http://localhost:3000/metrics");
        if (!response.ok) throw new Error("Error en respuesta");
        const data = await response.json();

        // Opción B: Si prefieres usar tu 'api' importada arriba:
        // const { data } = await api.get("/metrics");

        setMetrics(data);
      } catch (error) {
        console.error("Error cargando métricas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="admin-panel">
      {/* SIDEBAR IZQUIERDO */}
      <aside className="admin-sidebar">
        <h2 className="admin-sidebar__title">ADMIN MENU</h2>
        <nav className="admin-sidebar__nav">
          <button
            className={`admin-nav__item ${tab === "charts" ? "is-active" : ""}`}
            onClick={() => setTab("charts")}
          >
            Dashboard
          </button>
          <button
            className={`admin-nav__item ${tab === "users" ? "is-active" : ""}`}
            onClick={() => setTab("users")}
          >
            Usuarios
          </button>
          <button
            className={`admin-nav__item ${tab === "products" ? "is-active" : ""}`}
            onClick={() => setTab("products")}
          >
            Productos
          </button>
        </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="admin-main">
        
        {/* TAB DASHBOARD */}
        {tab === "charts" && (
          <div className="dashboard-container">
            
            {/* TARJETAS DE KPIs */}
            <div className="kpi-grid">
              <div className="kpi-card">
                <h3>Ingresos Totales</h3>
                <p className="kpi-number">
                  {/* Formatear número a moneda */}
                  ${Number(metrics.kpis.totalRevenue).toLocaleString()}
                </p>
              </div>
             
              <div className="kpi-card">
                <h3>Productos Activos</h3>
                <p className="kpi-number">{metrics.kpis.totalProducts}</p>
              </div>
              <div className="kpi-card">
                <h3>Usuarios Admin</h3>
                <p className="kpi-number">{metrics.kpis.totalAdmins}</p>
              </div>
            </div>

            {/* GRafico evolucion de ventas */}
            <div className="chart-section">
              <h3 className="chart-title">EVOLUCION DE VENTAS (Últimos 7 días)</h3>
              {loading ? (
                <p>Cargando gráfico...</p>
              ) : (
                // Pasamos la serie de datos al componente hijo
                <AdminCharts data={metrics.salesSeries} />
              )}
            </div>
          </div>
        )}

        {/* OTRAS TABS */}
        {tab === "users" && (
          <div className="admin-content-card">
            <AdminUsers />
          </div>
        )}

        {tab === "products" && (
          <div className="admin-content-card">
            <AdminProducts />
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminPanel;