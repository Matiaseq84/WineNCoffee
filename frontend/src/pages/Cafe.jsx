import { useCart } from "../context/CartContext";
import "./cafe.css";

function Cafe() {

  const {addItem } = useCart();

  // Sidebar (placeholders)
  const filtros = [
    "Café en Granos",
    "Café 125gr",
    "Café 250gr",
    "Café Clásicos 250gr",
    "Café 1kg",
    "Cápsulas de Café",
    "Té en Hebras",
    "Combos",
    "Complementos",
    "Todos los productos",
  ];

  // Carrusel (placeholders)
  const ofertas = new Array(8).fill(0).map((_, i) => ({
    id: i + 1,
    titulo: `Oferta ${i + 1}`,
  }));

  // Grid de productos (placeholders)
  const productos = new Array(8).fill(0).map((_, i) => ({
    id: i + 1,
    name: `Café Ruanda | 250gr Intensidad ${i + 1}`,
    price: "$--.---,--"
  }));

  return (
    <div className="cafe-page">
      {/* HERO */}
      <section className="hero-cafe">
        <div className="hero-overlay" />
        <div className="hero-strip glowable">
          <h1>Coffee</h1>
          <p>Descubrí nuestros granos y blends seleccionados</p>
        </div>
      </section>

      {/* CARRUSEL DE OFERTAS */}
      <section className="cafe-section">
        <h2 className="section-title glowable">Ofertas de café</h2>

        <div className="carousel">
          <button className="car-btn" onClick={() => scrollX("left")}>
            ‹
          </button>

          <div id="car-track" className="car-track">
            {ofertas.map((o) => (
              <div key={o.id} className="car-item glowable">
                <div className="car-img" />
                <span>{o.titulo}</span>
              </div>
            ))}
          </div>

          <button className="car-btn" onClick={() => scrollX("right")}>
            ›
          </button>
        </div>
      </section>

      {/* LISTADO CON SIDEBAR */}
      <section className="cafe-listado">
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
          {productos.map((p) => (
            <article key={p.id} className="card glowable">
              <div className="card-img" />
              <h4 className="card-title">{p.name}</h4>
              <div className="card-price">{p.price}</div>
              <button className="btn-add glowable" onClick={() => addItem(p)}>Agregar al carrito</button>
            </article>
          ))}
        </main>
      </section>
    </div>
  );
}

/* helpers: scroll simple del carrusel */
function scrollX(dir) {
  const el = document.getElementById("car-track");
  if (!el) return;
  const amount = 260; // ancho aproximado de cada item
  el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
}

export default Cafe;
