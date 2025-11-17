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

// GET /product/search?name=xxx
export const searchProducts = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: "Debe enviar el parámetro 'name'." });
  }

  try {
    const { data, error } = await supabase
      .from("product")
      .select("*")
      .ilike("category", `%${name}%`);  // <-- BUSCA INSENSIBLE A MAYÚSCULAS

    if (error) {
      return res.status(500).json({ error: "Error al buscar productos" });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Error en la búsqueda de productos:", err.message);
    res.status(500).json({ error: "Error interno en la búsqueda" });
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

// Verificar si hay stock suficiente antes de confirmar la compra
export const checkProductStock = async (productId, quantity) => {
  try {
    const { data, error } = await supabase
      .from("product")
      .select("stock, name")
      .eq("product_id", productId)
      .single();

    if (error) throw new Error(`Error al obtener stock del producto ${productId}`);

    if (!data || data.stock < quantity) {
      throw new Error(
        `Stock insuficiente para el producto "${data?.name || productId}". Disponible: ${data?.stock || 0}`
      );
    }

    return true;
  } catch (err) {
    throw err;
  }
};

export const decrementProductStock = async (productId, quantity) => {
  try {
    // Obtener stock actual
    const { data: product, error: fetchError } = await supabase
      .from("product")
      .select("stock")
      .eq("product_id", productId)
      .single();

    if (fetchError) throw fetchError;

    const newStock = Math.max(0, (product?.stock || 0) - quantity);

    const { error: updateError } = await supabase
      .from("product")
      .update({ stock: newStock })
      .eq("product_id", productId);

    if (updateError) throw updateError;
  } catch (err) {
    throw err;
  }
};
