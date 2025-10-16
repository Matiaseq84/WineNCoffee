import "./Home.css";

function Home() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f2ef' }}>
      
      
      
      <section className="hero">
        <div className="hero-overlay"></div>

        
        <div className="hero-strip">
          <h1>Bienvenido a Wine & Coffee</h1>
          <p>Disfrutá los mejores vinos y cafés directamente en tu casa</p>
          <button className="btn-hero">Ver Productos</button>
        </div>
      </section>

      
        <section style={{ padding: '50px 20px', backgroundColor: '#d4b97d', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '30px' }}>Nuestras Categorías</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ backgroundColor: '#b16969ff', padding: '20px', borderRadius: '10px', width: '200px' }}>
                <h3>Café</h3>
                <p>Selección premium de cafés de todo el mundo</p>
            </div>
            <div style={{ backgroundColor: '#b16969ff', padding: '20px', borderRadius: '10px', width: '200px' }}>
                <h3>Vino</h3>
                <p>Vinos exclusivos de bodegas reconocidas</p>
            </div>
            <div style={{ backgroundColor: '#b16969ff', padding: '20px', borderRadius: '10px', width: '200px' }}>
                <h3>Ediciones Especiales</h3>
                <p>Combos y productos únicos cada temporada</p>
            </div>
            </div>
        </section>

      <section style={{ padding: '50px 20px', backgroundColor: '#2c0f18', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '30px' }}>Promociones Destacadas</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ backgroundColor: '#724545ff', padding: '20px', borderRadius: '10px', width: '250px' }}>
            <h3>Combo Café + Vino</h3>
            <p>Llevá lo mejor para tu desayuno o cena especial</p>
          </div>
          <div style={{ backgroundColor: '#724545ff', padding: '20px', borderRadius: '10px', width: '250px' }}>
            <h3>Oferta del Mes</h3>
            <p>10% de descuento en cafés seleccionados</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
