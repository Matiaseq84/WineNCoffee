import { supabase } from '../config/db.js';
import bcrypt from 'bcrypt';

// POST
export const postProduct = async (req, res) => {
    const {
        name,
        description,
        photo,
        thumbnail,
        price,
        category,
        subcategory,
        stock
    } = req.body; // toma los datos de la req, crea las variables y le asigna los datos según los nombres dentro de la req

    try {

        const { data, error } = await supabase
      .from('product')
      .insert([
            {
                name,
                description,
                photo,
                thumbnail,
                price,
                category,
                subcategory,
                stock
            }
        ])
      .select();

    if (error) {
      return res.status(500).json({ error: 'Error al ingresar el producto' });
    }

    //201 -> creado
    res.status(201).json(data);

    }catch (err) {
        console.error('Error al ingresar el producto:', err.message);
        res.status(500).json({error: 'Error al registrar el producto'});
    }
};

// GET
export const getProducts = async (req, res) => {
  try {
    const { data, error } = await supabase.from('product').select('*');

    if (error) {
      return res.status(500).json({ error: 'Error al obtener datos de productos' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Error al obtener los productos:', err.message);
    res.status(500).json({ error: 'Error interno al obtener los productos' });
  }
};

// GET por id
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .eq('product_id', id);

    if (error) {
      return res.status(500).json({ error: 'Error al obtener el producto' });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json(data[0]);
  } catch (err) {
    console.error('Error al obtener el producto:', err.message);
    res.status(500).json({ error: 'Error interno al obtener el producto' });
  }
};

// PUT id
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
        name,
        description,
        photo,
        thumbnail,
        price,
        category,
        subcategory,
        stock
   } = req.body;

  try {

    const updateData = {
        name,
        description,
        photo,
        thumbnail,
        price,
        category,
        subcategory,
        stock
   }

    const { data, error } = await supabase
      .from('product')
      .update(updateData)
      .eq('product_id', id)
      .select();

    if (error) {
      return res.status(500).json({ error: 'Error al actualizar el producto' });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto actualizado correctamente', data });
  } catch (err) {
    console.error('Error al actualizar el producto:', err.message);
    res.status(500).json({ error: 'Error interno al actualizar el producto' });
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('product')
      .delete()
      .eq('product_id', id)
      .select();

    if (error) {
      return res.status(500).json({ error: 'Error al eliminar el producto' });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    console.error('Error al eliminar el producto:', err.message);
    res.status(500).json({ error: 'Error interno al eliminar el producto' });
  }
};