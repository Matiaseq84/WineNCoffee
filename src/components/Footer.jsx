function Footer() {
    return (
        <footer style={{
            backgroundColor: '#2c2c2c',
            color: '#fff',
            padding: '30px 20px',
            textAlign: 'center',
            marginTop: '50px'
        }}>
            <div style={{ marginBottom: '15px' }}>
                <h3>Wine & Coffee</h3>
                <p>Los mejores vinos y cafés, directo a tu casa</p>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <a href="#" style={{ color: '#D4B97D', margin: '0 10px', textDecoration: 'none' }}>Inicio</a>
                <a href="#" style={{ color: '#D4B97D', margin: '0 10px', textDecoration: 'none' }}>Productos</a>
                <a href="#" style={{ color: '#D4B97D', margin: '0 10px', textDecoration: 'none' }}>Contacto</a>
            </div>

            <div>
                <p style={{ fontSize: '0.9rem' }}>© 2025 Wine & Coffee. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;