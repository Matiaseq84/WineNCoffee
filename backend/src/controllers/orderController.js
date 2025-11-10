// controllers/orderController.js
import { supabase } from '../config/db.js';

// Crear una nueva orden
export const createOrder = async (req, res) => {
  try {
    const { client_id, amount, shipping_address_id } = req.body;

    if (!client_id || !amount) {
      return res.status(400).json({ error: 'Faltan datos obligatorios (client_id o amount).' });
    }

    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          client_id,
          order_date: new Date().toISOString(),
          amount,
          status: 'pending',
          shipping_address_id: shipping_address_id || null,
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      message: 'Orden creada correctamente.',
      order: data[0],
    });
  } catch (error) {
    console.error('Error al crear la orden:', error);
    res.status(500).json({ error: 'Error interno al crear la orden.' });
  }
};

// Obtener todas las órdenes
export const getOrders = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        client:first_name,
        client:last_name,
        address:shipping_address_id(street, city, province)
      `)
      .order('order_date', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    res.status(500).json({ error: 'Error interno al obtener órdenes.' });
  }
};

// Obtener una orden por ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        client:client_id(first_name, last_name, email),
        address:shipping_address_id(street, city, province)
      `)
      .eq('order_id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: 'Orden no encontrada.' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error al obtener la orden:', error);
    res.status(500).json({ error: 'Error interno al obtener la orden.' });
  }
};

// Actualizar el estado de una orden
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'El estado es obligatorio.' });
    }

    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('order_id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      message: 'Estado de la orden actualizado correctamente.',
      order: data,
    });
  } catch (error) {
    console.error('Error al actualizar el estado de la orden:', error);
    res.status(500).json({ error: 'Error interno al actualizar la orden.' });
  }
};
