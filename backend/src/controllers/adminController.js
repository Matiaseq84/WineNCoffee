import { supabase } from '../config/db.js';
import bcrypt from 'bcrypt';

// POST /admin - Crear administrador
export const postAdmin = async (req, res) => {
  const { user_name, password } = req.body;

  try {
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('admin')
      .insert([{ user_name, password: hashedPassword }])
      .select();

    if (error) {
      return res.status(500).json({ error: 'Error al registrar el administrador' });
    }

    res.status(201).json({ message: 'Administrador registrado correctamente', data });
  } catch (err) {
    console.error('Error al registrar al administrador:', err.message);
    res.status(500).json({ error: 'Error interno al registrar administrador' });
  }
};

// GET /admin - Listar todos los administradores
export const getAdmins = async (req, res) => {
  try {
    const { data, error } = await supabase.from('admin').select('*');

    if (error) {
      return res.status(500).json({ error: 'Error al obtener datos de administradores' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Error al obtener administradores:', err.message);
    res.status(500).json({ error: 'Error interno al obtener administradores' });
  }
};

// GET /admin/:id - Obtener administrador por ID
export const getAdminById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('admin')
      .select('*')
      .eq('admin_id', id);

    if (error) {
      return res.status(500).json({ error: 'Error al obtener el administrador' });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Administrador no encontrado' });
    }

    res.status(200).json(data[0]);
  } catch (err) {
    console.error('Error al obtener el administrador:', err.message);
    res.status(500).json({ error: 'Error interno al obtener administrador' });
  }
};

// PUT /admin/:id - Actualizar administrador
export const updateAdmin = async (req, res) => {
  const { id } = req.params;
  const { user_name, password } = req.body;

  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const updateData = { user_name };
    if (hashedPassword) updateData.password = hashedPassword;

    const { data, error } = await supabase
      .from('admin')
      .update(updateData)
      .eq('admin_id', id)
      .select();

    if (error) {
      return res.status(500).json({ error: 'Error al actualizar el administrador' });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Administrador no encontrado' });
    }

    res.status(200).json({ message: 'Administrador actualizado correctamente', data });
  } catch (err) {
    console.error('Error al actualizar administrador:', err.message);
    res.status(500).json({ error: 'Error interno al actualizar administrador' });
  }
};

// DELETE /admin/:id - Eliminar administrador
export const deleteAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('admin')
      .delete()
      .eq('admin_id', id)
      .select();

    if (error) {
      return res.status(500).json({ error: 'Error al eliminar el administrador' });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Administrador no encontrado' });
    }

    res.status(200).json({ message: 'Administrador eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar administrador:', err.message);
    res.status(500).json({ error: 'Error interno al eliminar administrador' });
  }
};
