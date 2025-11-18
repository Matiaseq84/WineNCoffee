import { supabase } from "../config/db.js";
import { io } from "../../app.js"; // Importamos io desde app.js

// Crear una nueva orden
export const createOrder = async (req, res) => {
  try {
    const { client_id, amount, shipping_address_id } = req.body;

    if (!client_id || !amount) {
      return res.status(400).json({
        error: "Faltan datos obligatorios (client_id o amount).",
      });
    }

    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          client_id,
          order_date: new Date().toISOString(),
          amount,
          status: "pending",
          shipping_address_id: shipping_address_id || null,
        },
      ])
      .select();

    if (error) throw error;

    res.status(201).json({
      message: "Orden creada correctamente.",
      order: data[0],
    });
  } catch (error) {
    console.error("Error al crear la orden:", error);
    res.status(500).json({ error: "Error interno al crear la orden." });
  }
};

// Obtener todas las ordenes con nombre de cliente
export const getOrders = async (req, res) => {
  try {
    // 1) Traemos las órdenes
    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select("order_id, client_id, order_date, amount, status")
      .order("order_date", { ascending: false });

    if (ordersError) throw ordersError;

    if (!orders || orders.length === 0) {
      return res.status(200).json([]);
    }

    // 2) IDs de clientes únicos
    const clientIds = [
      ...new Set(orders.map((o) => o.client_id).filter((id) => id != null)),
    ];

    // 3) Traemos los clientes
    const { data: clients, error: clientsError } = await supabase
      .from("client") // nombre de la tabla segun tu CREATE TABLE
      .select("client_id, first_name, last_name")
      .in("client_id", clientIds);

    if (clientsError) throw clientsError;

    // 4) Mapa client_id -> cliente
    const clientMap = new Map(
      (clients || []).map((c) => [c.client_id, c])
    );

    // 5) Armamos la respuesta final
    const formatted = orders.map((o) => {
      const client = clientMap.get(o.client_id);
      return {
        order_id: o.order_id,
        client_id: o.client_id,
        client_name: client
          ? `${client.first_name} ${client.last_name}`
          : null,
        order_date: o.order_date,
        amount: o.amount,
        status: o.status,
      };
    });

    return res.status(200).json(formatted);
  } catch (error) {
    console.error("Error al obtener órdenes:", error);
    return res
      .status(500)
      .json({ error: "Error interno al obtener órdenes." });
  }
};


/*// Obtener todas las ordenes simple
export const getOrders = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("order_id, client_id, order_date, amount, status")
      .order("order_date", { ascending: false });

    if (error) throw error;

    // siempre devolvemos un array
    return res.status(200).json(data || []);
  } catch (error) {
    console.error("Error al obtener órdenes:", error);
    return res
      .status(500)
      .json({ error: "Error interno al obtener órdenes." });
  }
};*/



// Obtener una orden por ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select(`
        order_id,
        order_date,
        amount,
        status,
        client:client_id(first_name, last_name, email),
        address:shipping_address_id(street, city, province, country),
        shipping_cost,
        payment:payment(payment_method)
      `)
      .eq("order_id", parseInt(id))
      .single();

    if (orderError) throw orderError;
    if (!order)
      return res.status(404).json({ error: "Orden no encontrada." });

    const { data: items, error: itemsError } = await supabase
      .from("order_items")
      .select(`
        product_id,
        quantity,
        product:product_id(name, price)
      `)
      .eq("order_id", parseInt(id));

    if (itemsError) throw itemsError;

    const subtotal = items.reduce(
      (acc, item) => acc + Number(item.product.price) * item.quantity,
      0
    );

    const fullOrder = {
      id: order.order_id,
      confirmation_date: order.order_date,
      status: order.status,
      client: order.client,
      address: order.address,
      payment: order.payment?.[0] || null,
      items: items.map((i) => ({
        product_id: i.product_id,
        name: i.product.name,
        price: Number(i.product.price),
        qty: i.quantity,
      })),
      subtotal,
      shippingCost: order.shipping_cost,
      total: subtotal,
    };

    return res.json(fullOrder);
  } catch (error) {
    console.error("Error al obtener la orden completa:", error);
    res.status(500).json({ error: "Error interno al obtener la orden." });
  }
};

// Actualizar el estado de una orden
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "paid", "shipped", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Estado no válido." });
    }

    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("order_id", id)
      .select()
      .single();

    if (error) throw error;

    // Emitir actualización en tiempo real
    io.emit("orderStatusUpdated", {
      orderId: id,
      newStatus: status,
    });

    res.json({
      message: `Estado actualizado a "${status}" correctamente.`,
      order: data,
    });
  } catch (error) {
    console.error("Error al actualizar el estado de la orden:", error);
    res.status(500).json({
      error: "Error interno al actualizar la orden.",
    });
  }
};
