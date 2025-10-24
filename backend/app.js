import express from "express";
import cors from "cors";
import morgan from "morgan";
import product from "./src/routes/product.js";
import admin from "./src/routes/admin.js";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

app.use('/product', product);
app.use('/admin', admin);


// servir archivos estáticos desde la carpeta 'public'
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;