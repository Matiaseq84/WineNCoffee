import { supabase } from "../config/db.js";

export const createCheckout = async (req, res) => {
  try {
    const { cliente, direccion, carrito, metodoPago } = req.body;

    console.log("🧾 Datos recibidos del frontend:", { cliente, direccion, carrito, metodoPago });

    // ========================
    // 1️⃣ Insertar cliente
    // ========================
    const { data: existingClient, error: searchError } = await supabase
      .from("client")
      .select("client_id")
      .eq("dni", cliente.dni)
      .single();

    let clientId;

    if (existingClient) {
      clientId = existingClient.client_id;
      console.log("Cliente ya existente con ID:", clientId);
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

    console.log("✅ Dirección insertada:", newAddress.address_id);

    return res.status(200).json({
      success: true,
      message: "Cliente y dirección registrados correctamente.",
      clientId,
      addressId: newAddress.address_id,
    });
  } catch (error) {
    console.error("❌ Error en createCheckout:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
