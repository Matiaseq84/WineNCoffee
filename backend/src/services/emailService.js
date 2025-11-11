import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOrderConfirmationEmail = async (to, orderDetails) => {
  const { orderId, total, items, client } = orderDetails;

  const itemList = items
    .map(
      (item) =>
        `<li>${item.name} (x${item.qty}) - $${(
          item.price * item.qty
        ).toLocaleString("es-AR")}</li>`
    )
    .join("");

  const mailOptions = {
    from: `"Tienda Deportiva" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Confirmación de tu pedido #${orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>¡Gracias por tu compra, ${client.first_name}!</h2>
        <p>Tu pedido fue recibido y está siendo procesado.</p>

        <h3>📦 Detalle del pedido:</h3>
        <ul>${itemList}</ul>

        <p><strong>Total:</strong> $${total.toLocaleString("es-AR")} ARS</p>

        <p>Pronto recibirás otro correo cuando tu pedido esté en camino 🚚</p>
        <br />
        <p>Gracias por confiar en nosotros,<br/>El equipo de Wine & Coffee ☕🍷</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
