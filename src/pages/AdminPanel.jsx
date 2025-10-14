function AdminPanel() {
    return (
        <div className="admin-panel">
            <aside className="sidebar">
                <h3>Admin Menu</h3>
            </aside>
            <main className="main-content">
                <button>Ventas Totales</button>
                <button>Clientes Activos</button>
            </main>
        </div>
    );
}

export default AdminPanel;