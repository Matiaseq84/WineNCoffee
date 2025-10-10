function Home() {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f2ef' }}>
            <section
                style={{
                    position: 'relative',
                    backgroundImage: "url('/img-inicio.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '80vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                    textAlign: 'center',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)' // overlay para que la imagen se vea tenue
                    }}
                ></div>
                <div style={{ position: 'relative', zIndex: 1, padding: '20px' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Bienvenido a Wine & Coffee</h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
                        Disfrutá los mejores vinos y cafés directamente en tu casa
                    </p>
                    <button
                        style={{
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            backgroundColor: '#D4B97D',
                            color: '#000',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Ver Productos
                    </button>
                </div>
            </section>
            <section style={{ padding: '50px 20px', backgroundColor: '#684e1cff', textAlign: 'center' }}>
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
            <section style={{ padding: '50px 20px', backgroundColor: '#684e1cff', textAlign: 'center' }}>
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