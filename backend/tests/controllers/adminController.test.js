import { jest } from '@jest/globals';
import { getAdmins } from '../../src/controllers/adminController.js';
import * as db from '../../src/config/db.js';

// Mock de supabase
const mockData = [{ admin_id: 1, user_name: 'admin', password: '1234' }];

// Reemplazamos db.supabase por un mock
db.supabase.from = jest.fn(() => db.supabase);
db.supabase.select = jest.fn();

describe('Controlador getAdmins (Unitario)', () => {
  beforeEach(() => {
    // Resetear mocks antes de cada test
    db.supabase.from.mockClear();
    db.supabase.select.mockClear();
  });

  it('Debe devolver los administradores en formato JSON', async () => {
    db.supabase.select.mockResolvedValue({ data: mockData, error: null });

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await getAdmins(req, res);

    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  it('Debe manejar errores de Supabase correctamente', async () => {
    const mockError = new Error('Error en la base de datos');
    db.supabase.select.mockResolvedValue({ data: null, error: mockError });

    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await getAdmins(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Error al obtener datos de administradores'
    });
  });
});
