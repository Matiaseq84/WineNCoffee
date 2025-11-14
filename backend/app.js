import express from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";
import path from "path";

import admin from "./src/routes/adminRoutes.js";
import product from "./src/routes/productRoutes.js";
import checkout from "./src/routes/checkoutRoutes.js";
import order from "./src/routes/orderRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas
app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

app.use("/product", product);
app.use("/admin", admin);
app.use("/checkout", checkout);
app.use("/order", order);

// Archivos estáticos
app.use(express.static("public"));
app.use(express.static(path.join(process.cwd(), "public")));

// ======================
// Configuración Socket.io
// ======================
const server = http.createServer(app);

export const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("Cliente conectado al seguimiento:", socket.id);

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// ======================
//  Iniciar servidor
// ======================
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
