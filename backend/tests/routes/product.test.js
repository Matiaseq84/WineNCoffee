import request from 'supertest';
import app from '../../app.js';

// PRUEBAS UNITARIAS PARA LAS RUTAS DE /PRODUCT

// prueba si la ruta devuelve un jason con por lo menos un producto
describe('Rutas /product', () => {
  it('GET /product debe devolver un JSON con la lista de productos', async () => {
    const res = await request(app).get('/product');

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true); // ahora res.body es un array
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('product_id');
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('description');
    expect(res.body[0]).toHaveProperty('photo');
    expect(res.body[0]).toHaveProperty('thumbnail');
    expect(res.body[0]).toHaveProperty('price');
    expect(res.body[0]).toHaveProperty('category');
    expect(res.body[0]).toHaveProperty('subcategory');
    expect(res.body[0]).toHaveProperty('stock');
  });
});

//--------------------------------------------------------------

// PRUEBAS DE INTERGRACIÓN PARA LAS RUTAS DE /PRODUCT