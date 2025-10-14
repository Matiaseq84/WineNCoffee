import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }//subpase
});

app.use(cors());
app.use(express.json());


app.get("/", (_req, res) => res.send("Backend funcionando"));


app.get("/api/health", async (_req, res) => {
  try {
    const { rows } = await pool.query("SELECT NOW() AS time;");
    res.json({ ok: true, db_time: rows[0].time });
  } catch (e) {
    console.error("DB health error:", e.message);
    res.status(500).json({ ok: false, error: "No conecta a la DB" });
  }
});

//lee productos
app.get("/api/products", async (_req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT product_id, name, price, category, stock, thumbnail FROM product ORDER BY product_id ASC"
    );
    res.json(rows);
  } catch (e) {
    console.error("DB products error:", e.message);
    res.status(500).json({ error: "No se pudieron leer productos (permiso/tabla)" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
