# 🍷☕ Wine & Coffee – E-commerce de Bebidas  
### Ayken Soluciones Informáticas

Aplicación web desarrollada para la empresa **Last Mile** como parte del proyecto académico PPIV.  
Permite a los usuarios navegar, registrarse, iniciar sesión, ver productos, hacer pedidos y consultar información relevante.  
Incluye un **panel de administrador** para gestionar productos y pedidos.

---

## 🚀 Tecnologías Utilizadas

### **Frontend**
- React 
- Vite  
- React Router Dom    
- CSS  

### **Backend**
- Node.js  
- Express  
- Supabase (PostgreSQL)  
- Morgan  
- CORS  
- bcrypt / bcryptjs  
- Socket.io  
- Nodemailer  
- Jest + Supertest  



---

## 🛠️ Instalación y uso

### 1️⃣ Clonar el repositorio

git clone https://github.com/Matiaseq84/WineNCoffee.git
cd WineNCoffee

2️⃣ Instalar dependencias
Backend
bash
Copiar código
cd backend
npm install
Frontend
bash
Copiar código
cd ../frontend
npm install

3️⃣ Configurar variables de entorno
Crear archivo:

📌 backend/.env


Copiar código
SUPABASE_URL=https://kvgebjwnyqbkieklnrci.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2Z2ViandueXFia2lla2xucmNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwODkxMDksImV4cCI6MjA3NTY2NTEwOX0.BKVtFBmbcpqzwF1C0DALEaoQXZwnUs58S93BBq5Qfks
EMAIL_USER=matiaseq@gmail.com
EMAIL_PASS=jzmy xbwj zfpv uecf


4️⃣ Ejecutar el proyecto completo


'''bash

npm run dev

🔗 Accesos:
Frontend: http://localhost:5173

Backend: http://localhost:3000

🧩 Características principales
👤 Para usuarios
Registro e inicio de sesión

Navegación por categorías (Vinos / Café)

Vista de productos

Carrito


🔑 Para administradores
Gestión de productos

Gestión de pedidos

Vista centralizada de usuarios

Herramientas internas

🧪 Pruebas
Backend:
Tests unitarios (Jest)

Tests de integración (Supertest)

Frontend:
Renderizados básicos

Navegación entre rutas

👥 Equipo de desarrollo
Proyecto realizado por Ayken Soluciones Informáticas, grupo de PPIV:

● Gabriel Iunti
● Matías Quiñones
● Denise Barrera
● Selene Noma
● Iván González


📜 Licencia
Proyecto académico – Uso educativo.
