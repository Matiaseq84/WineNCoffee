import "./vino.css";

function Vino() {
  // Sidebar (placeholders)
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

  // Carrusel (placeholders)
  const ofertas = new Array(8).fill(0).map((_, i) => ({
    id: i + 1,
    titulo: `Oferta ${i + 1}`,
  }));

  // Grid de productos (placeholders)
  const productos = new Array(8).fill(0).map((_, i) => ({
    id: i + 1,
    nombre: `Malbec Reserva ${i + 1} | 750ml`,
    precio: "$--.---,--",
  }));

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

      {/* CARRUSEL DE OFERTAS */}
      <section className="vino-section">
        <h2 className="section-title glowable">Ofertas de vino</h2>

        <div className="carousel">
          <button className="car-btn" onClick={() => scrollX("left")}>‹</button>

          <div id="car-track-vino" className="car-track">
            {ofertas.map((o) => (
              <div key={o.id} className="car-item glowable">
                <div className="car-img" />
                <span>{o.titulo}</span>
              </div>
            ))}
          </div>

          <button className="car-btn" onClick={() => scrollX("right")}>›</button>
        </div>
      </section>

      {/* LISTADO CON SIDEBAR */}
      <section className="vino-listado">
        <aside className="sidebar">
          <h3>Explorar por</h3>
          <nav className="filtros">
            {filtros.map((f) => (
              <a key={f} href="#" className="filtro glowable">{f}</a>
            ))}
          </nav>
        </aside>

        <main className="productos">
          {productos.map((p) => (
            <article key={p.id} className="card glowable">
              <div className="card-img" />
              <h4 className="card-title">{p.nombre}</h4>
              <div className="card-price">{p.precio}</div>
              <button className="btn-add glowable">Agregar al carrito</button>
            </article>
          ))}
        </main>
      </section>
    </div>
  );
}

function scrollX(dir) {
  const el = document.getElementById("car-track-vino");
  if (!el) return;
  const amount = 260;
  el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
}

export default Vino;
