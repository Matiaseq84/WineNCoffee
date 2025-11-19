import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import ModalEdad from "../components/ModalEdad";
import { getProducts } from "../services/productService"; // ⬅️ Importamos el service
import "./vino.css";

function Vino() {
  const { addItem } = useCart();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Verificación de edad
  const [mayorEdad, setMayorEdad] = useState(
    localStorage.getItem("mayorEdad") === "true"
  );

  const handleAceptarEdad = () => {
    setMayorEdad(true);
  };

  // 🛒 Traer productos usando el service
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProducts(); // ⬅️ Ahora usa el service
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

      {/* MODAL DE EDAD */}
      {!mayorEdad && <ModalEdad onAceptar={handleAceptarEdad} />}

      {/* HERO */}
      <section className="hero-vino">
        <div className="hero-overlay" />
        <div className="hero-strip glowable">
          <h1>Wine</h1>
          <p>Selección curada de vinos de bodegas reconocidas</p>
        </div>
      </section>

      {/* LISTADO */}
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
              .map((p) => {
                const sinStock = p.stock === 0;
                const pocasUnidades = p.stock > 0 && p.stock <= 5;

                return (
                  <Link
                    key={p.product_id}
                    to={`/product/${p.product_id}`}
                    className="card-link-wrapper"
                  >
                    <article className="card glowable">

                      {/* Badge stock */}
                      {sinStock && (
                        <span className="badge sin-stock">SIN STOCK</span>
                      )}
                      {pocasUnidades && (
                        <span className="badge pocas-unidades">
                          Últimas unidades
                        </span>
                      )}

                      <div
                        className="card-img"
                        style={{
                          backgroundImage: `url(${import.meta.env.VITE_API_URL}${p.photo})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />

                      <h4 className="card-title">{p.name}</h4>
                      <div className="card-price">${p.price}</div>

                      {/* Botón dinámico */}
                      {sinStock ? (
                        <button className="btn-disabled" disabled>
                          Sin stock
                        </button>
                      ) : (
                        <button
                          className="btn-add glowable"
                          onClick={(e) => {
                            e.preventDefault(); // evitar navegación
                            e.stopPropagation();
                            addItem(p);
                          }}
                        >
                          Agregar al carrito
                        </button>
                      )}
                    </article>
                  </Link>
                );
              })
          ) : (
            <p>No hay vinos disponibles.</p>
          )}
        </main>
      </section>
    </div>
  );
}

export default Vino;
