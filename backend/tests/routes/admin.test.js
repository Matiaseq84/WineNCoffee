import request from 'supertest';
import app from '../../app.js';

describe('Rutas /admin', () => {

  let nuevoAdministradorID;
  const userNamePrueba = 'admin2';

  //post
  it('Debe crear un nuevo administrador', async () => {
    const res = await request(app)
      .post('/admin')
      .send({ user_name : userNamePrueba, password : '1234'});
    
    expect(res.statusCode).toBe(201);
    expect(res.body.data).toBeDefined();
    expect(res.body.data[0].user_name).toBe(userNamePrueba);

    nuevoAdministradorID = res.body.data[0].admin_id;
  });

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

  // get con id
  it('Debe devolver un administrador por id', async () => {
    const res = await request(app).get(`/admin/${nuevoAdministradorID}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.admin_id).toBe(nuevoAdministradorID);
    expect(res.body.user_name).toBe(userNamePrueba);
  });

  // get con admin nuevo
  it('Debe devolver todos los administradores con el nuevo', async () => {
    const res = await request(app).get('/admin');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    const admin = res.body.find(a => a.admin_id === nuevoAdministradorID);
    expect(admin).toBeDefined();
    expect(admin.user_name).toBe(userNamePrueba);
  });

  // put
  it('Debe actualizar un administrador existente', async () => {
    const nuevoNombre = 'Nicolino Roche';

    const res = await request(app)
      .put(`/admin/${nuevoAdministradorID}`)
      .send({ user_name : nuevoNombre, password : '5678'});

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toBeDefined;
    expect(res.body.data[0].user_name).toBe(nuevoNombre);
  });

  // delete
  it('Debe eliminar un administrador', async () => {
    const res = await request(app).delete(`/admin/${nuevoAdministradorID}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Administrador eliminado correctamente');

    const verificarBorrado = await request(app).get(`/admin/${nuevoAdministradorID}`);
  });
});