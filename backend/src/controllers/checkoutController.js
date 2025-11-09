import { supabase } from "../config/db.js";
import { checkProductStock, decrementProductStock } from "./productController.js";

export const createCheckout = async (req, res) => {
  try {
    const { cliente, direccion, carrito, metodoPago, total } = req.body;

    console.log("🧾 Datos recibidos del frontend:", { cliente, direccion, carrito, metodoPago });

    // ========================
    // 1️⃣ Insertar o reutilizar cliente existente
    // ========================
    const { data: existingClient, error: searchError } = await supabase
      .from("client")
      .select("client_id")
      .eq("dni", cliente.dni)
      .single();

    if (searchError && searchError.code !== "PGRST116") throw searchError;

    let clientId;

    if (existingClient) {
      clientId = existingClient.client_id;
      console.log("👤 Cliente ya existente con ID:", clientId);
    } else {
      const { data: newClient, error: insertClientError } = await supabase
        .from("client")
        .insert([
          {
            dni: cliente.dni,
            first_name: cliente.first_name,
            last_name: cliente.last_name,
            telephone: cliente.phone,
            email: cliente.email,
          },
        ])
        .select()
        .single();

      if (insertClientError) throw insertClientError;
      clientId = newClient.client_id;
      console.log("✅ Nuevo cliente insertado:", clientId);
    }

    // ========================
    // 2️⃣ Insertar dirección
    // ========================
    const { data: newAddress, error: addressError } = await supabase
      .from("address")
      .insert([
        {
          street: direccion.street,
          city: direccion.city,
          province: direccion.province,
          country: direccion.country,
          postal_code: direccion.postal_code,
          client_id: clientId,
        },
      ])
      .select()
      .single();

    if (addressError) throw addressError;

    console.log("📍 Dirección insertada:", newAddress.address_id);

    // ========================
    // 3️⃣ Crear la orden principal
    // ========================
    const { data: newOrder, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          client_id: clientId,
          order_date: new Date().toISOString(),
          amount: total,
          status: "pending",
        },
      ])
      .select()
      .single();

    if (orderError) throw orderError;
    const orderId = newOrder.order_id;
    console.log("🆕 Orden creada:", orderId);

    // ========================
    // 4️⃣ Insertar ítems del pedido y actualizar stock
    // ========================
    for (const item of carrito) {
      const productId = item.product_id || item.id;
      const quantity = item.qty;

      // a) Verificar stock
      await checkProductStock(productId, quantity);

      // b) Insertar ítem del pedido
      const { error: itemError } = await supabase
        .from("order_items")
        .insert([
          {
            order_id: orderId,
            product_id: productId,
            quantity,
          },
        ]);

      if (itemError) throw itemError;

      // c) Descontar stock
      await decrementProductStock(productId, quantity);
      console.log(`📦 Stock descontado correctamente para producto ${productId}`);
    }

    // ========================
    // 5️⃣ Respuesta final
    // ========================
    return res.status(200).json({
      success: true,
      message: "Cliente, dirección, orden e ítems registrados correctamente.",
      orderId,
      clientId,
    });
  } catch (error) {
    console.error("Error en createCheckout:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
