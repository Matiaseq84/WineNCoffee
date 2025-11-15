import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import "./vino.css";

function Vino() {
  const { addItem } = useCart();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Traer productos desde el backend
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("http://localhost:3000/product");
        const data = await res.json();
        setProductos(data);
      } catch (err) {
        console.error("Error al obtener vinos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const filtros = [
    "Tintos",
    "Blancos",
    "Rosados",
    "Espumantes",
    "De Autor",
    "Combos",
    "Accesorios",
    "Todos los productos",
  ];

  if (loading) return <p className="loading">Cargando vinos...</p>;

  return (
    <div className="vino-page">
      {/* HERO */}
      <section className="hero-vino">
        <div className="hero-overlay" />
        <div className="hero-strip glowable">
          <h1>Wine</h1>
          <p>Selección curada de vinos de bodegas reconocidas</p>
        </div>
      </section>

      {/* LISTADO CON SIDEBAR */}
      <section className="vino-listado">
        <aside className="sidebar">
          <h3>Explorar por</h3>
          <nav className="filtros">
            {filtros.map((f) => (
              <a key={f} href="#" className="filtro glowable">
                {f}
              </a>
            ))}
          </nav>
        </aside>

        <main className="productos">
          {productos.length > 0 ? (
            productos
              .filter((p) => p.category?.toLowerCase().includes("vino"))
              .map((p) => (
                <article key={p.product_id} className="card glowable">
                  <div
                    className="card-img"
                    style={{
                      backgroundImage: `url(${import.meta.env.VITE_API_URL}${p.thumbnail || p.photo})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <h4 className="card-title">{p.name}</h4>
                  <div className="card-price">${p.price}</div>
                  <button
                    className="btn-add glowable"
                    onClick={() => addItem(p)}
                  >
                    Agregar al carrito
                  </button>
                </article>
              ))
          ) : (
            <p>No hay vinos disponibles.</p>
          )}
        </main>
      </section>
    </div>
  );
}

export default Vino;
