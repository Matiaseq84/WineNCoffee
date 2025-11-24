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
      (item) => `
        <li style="
          margin-bottom: 6px;
          font-size: 15px;
          color: #222;
        ">
          ${item.name} (x${item.qty}) – 
          <strong>$${(item.price * item.qty).toLocaleString("es-AR")}</strong>
        </li>
      `
    )
    .join("");

  const trackingUrl = `http://localhost:5173/order/${orderId}`;

  const mailOptions = {
    from: `"Wine & Coffee" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Confirmación de tu pedido #${orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; background: #FAF7F2; padding: 20px; border-radius: 10px;">
        
        <h2 style="color: #5A001E;">¡Gracias por tu compra, ${client.first_name}!</h2>
        <p style="color: #222;">Tu pedido fue recibido correctamente y está siendo procesado.</p>

        <div style="margin-top: 20px;">
          <h3 style="color: #5A001E;">📦 Detalle del pedido:</h3>
          <ul style="list-style: none; padding-left: 0;">${itemList}</ul>

          <p style="font-size: 18px; margin-top: 10px; color: #222;">
            <strong>Total:</strong> 
            <span style="color: #5A001E;">$${total.toLocaleString("es-AR")} ARS</span>
          </p>
        </div>

        <div style="margin-top: 25px;">
          <a 
            href="${trackingUrl}"
            style="
              display: inline-block;
              background: #C6A667;
              color: #fff;
              padding: 12px 18px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: bold;
              font-size: 15px;
            "
          >
            Ver seguimiento del pedido
          </a>
        </div>

        <p style="margin-top: 25px; color: #222;">
          Te enviaremos otro correo cuando tu pedido esté en camino 🚚
        </p>

        <p style="margin-top: 20px; color: #5A001E;">
          Gracias por confiar en nosotros,<br>
          <strong>El equipo de Wine & Coffee ☕🍷</strong>
        </p>

      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

