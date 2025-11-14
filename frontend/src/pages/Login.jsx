// frontend/src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const { data } = await api.post("/auth/login", {
        username: user,
        password: pass,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      if (data.role === "admin") return nav("/admin");
      if (data.role === "seller") return nav("/seller");
      return nav("/");
    } catch (error) {
      console.error("Error login:", error);
      setErr("Credenciales inválidas");
    }
  };

  return (
    <div className="login-container" style={{ textAlign: "center", padding: "2rem" }}>
      <img
        src="/img-inicio.jpg"
        alt="Wine & Coffee"
        style={{ width: 300, height: "auto", marginBottom: 16 }}
      />

      <form
        onSubmit={onSubmit}
        style={{ display: "grid", gap: 10, maxWidth: 320, margin: "0 auto" }}
      >
        <input
          type="text"
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Clave"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit">Iniciar sesión</button>
        {err && <small style={{ color: "crimson" }}>{err}</small>}
      </form>

      <button onClick={() => nav("/register")} style={{ marginTop: 10 }}>
        Registrarse
      </button>
    </div>
  );
}
