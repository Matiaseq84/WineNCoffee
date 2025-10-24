import request from 'supertest';
import app from '../../app.js';

// PRUEBAS UNITARIAS PARA LAS RUTAS DE /PRODUCT

// prueba si la ruta devuelve un jason con por lo menos un producto
describe('Rutas /admin', () => {
  it('GET /admin debe devolver un JSON con la lista de administradores', async () => {
    const res = await request(app).get('/admin');

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true); // ahora res.body es un array
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('admin_id');
    expect(res.body[0]).toHaveProperty('user_name');
    expect(res.body[0]).toHaveProperty('password');
  });
});

//--------------------------------------------------------------

// PRUEBAS DE INTERGRACIÓN PARA LAS RUTAS DE /PRODUCT

