import express from "express";
import cors from "cors";
import product from "./src/product.js";

const app = express();
const PORT = process.env.PORT || 3000;



app.use(cors());
app.use(express.json());

// Rutas

app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

app.use('/product', product);

// servir archivos estáticos desde la carpeta 'public'
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
