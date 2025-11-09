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
    // 3️⃣ Crear orden principal
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
    // 4️⃣ Insertar método de pago (tabla customer_method)
    // ========================
    let methodData = {};
    if (metodoPago.type === "credito" || metodoPago.type === "debito") {
      // Si es tarjeta
      methodData = {
        method_type: "card",
        card_owner: metodoPago.datos.nombre,
        card_number: metodoPago.datos.numero,
        card_expiry: metodoPago.datos.vencimiento.trim().slice(0, 5),
        card_code: metodoPago.datos.cvv,
        client_id: clientId,
      };
    } else if (metodoPago.type === "mercadopago") {
      // Si es billetera digital
      methodData = {
        method_type: "wallet",
        wallet_id: "mercadopago",
        client_id: clientId,
      };
    } else {
      throw new Error("Tipo de método de pago no reconocido");
    }

    const { data: customerMethod, error: customerMethodError } = await supabase
      .from("customer_method")
      .insert([methodData])
      .select()
      .single();

    if (customerMethodError) throw customerMethodError;
    const customerMethodId = customerMethod.customer_method_id;
    console.log("💳 Método de pago insertado:", customerMethodId);

    // ========================
    // 5️⃣ Crear registro en payment
    // ========================
    const { data: paymentData, error: paymentError } = await supabase
      .from("payment")
      .insert([
        {
          payment_method: metodoPago.type,
          order_id: orderId,
          installments: metodoPago.datos?.cuotas || null,
          customer_method_id: customerMethodId,
        },
      ])
      .select()
      .single();

    if (paymentError) throw paymentError;
    const paymentId = paymentData.payment_id;
    console.log("💰 Pago registrado correctamente con ID:", paymentId);

    // ========================
    // 6️⃣ Insertar venta final (tabla sale)
    // ========================
    const { error: saleError } = await supabase
      .from("sale")
      .insert([
        {
          order_id: orderId,
          payment_id: paymentId,
          amount: total,
          sale_date: new Date().toISOString(),
        },
      ]);

    if (saleError) throw saleError;
    console.log("🧾 Venta registrada correctamente en 'sale'");

    // ========================
    // 7️⃣ Insertar ítems y actualizar stock
    // ========================
    for (const item of carrito) {
      const productId = item.product_id || item.id;
      const quantity = item.qty;

      await checkProductStock(productId, quantity);

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

      await decrementProductStock(productId, quantity);
      console.log(`📦 Stock actualizado para producto ${productId}`);
    }

        // ========================
    // 8️⃣ Actualizar estado de la orden a "confirmed"
    // ========================
    const { error: updateOrderError } = await supabase
      .from("orders")
      .update({ status: "paid" })
      .eq("order_id", orderId);

    if (updateOrderError) throw updateOrderError;
    console.log("🔄 Estado de la orden actualizado a 'confirmed'");

    // ========================
    // 9️⃣ Respuesta final
    // ========================
    return res.status(200).json({
      success: true,
      message: "Checkout completo: cliente, dirección, orden, pago, venta e ítems registrados.",
      orderId,
      clientId,
    });

  } catch (error) {
    console.error("❌ Error en createCheckout:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
