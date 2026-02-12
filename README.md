<p align="center">
  <img src="https://vuejs.org/images/logo.png" alt="Vue Logo" width="120" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://nestjs.com/img/logo-small.svg" alt="NestJS Logo" width="120" />
</p>

Aplicación moderna de administración para tienda en línea construida con un stack fullstack moderno y escalable.

El proyecto está dividido en dos aplicaciones independientes:

- 🔹 **Frontend** → Vue 3 + TypeScript + TailwindCSS + Pinia
- 🔹 **Backend** → NestJS + PostgreSQL + Docker

---

# 📂 Estructura del Proyecto
```bash
admin-shop/
│
├── frontend/ # Aplicación Vue 3
│
├── backend/ # API REST con NestJS
│
└── README.md
```
---

# ⚙️ Instalación General

Clonar el repositorio:

```bash
git clone https://github.com/Carlos-MKR/vue-nest-admin-shop
cd vue-nest-admin-shop

Ir a la carpeta del frontend:
cd frontend

1️⃣ Instalar dependencias
npm install

2️⃣ Configurar variables de entorno
Crear un archivo .env basado en el .env.template

Ejemplo de configuración:
VITE_API_URL=http://localhost:3000/api

3️⃣ Ejecutar en desarrollo
npm run dev
```

🛠 Backend Setup (NestJS API)

```bash
Ir a la carpeta del backend:
cd backend

1️⃣ Instalar dependencias
npm install

2️⃣ Configurar variables de entorno
Crear un archivo .env basado en el .env.template

3️⃣ Levantar base de datos con Docker
docker-compose up -d

4️⃣ Ejecutar servidor en desarrollo
npm run start:dev

5️⃣ Ejecutar Seed (Datos de prueba)
Con el backend corriendo:
http://localhost:3000/api/seed

Esto poblará la base de datos con información inicial.

🔐 Flujo de Conexión
El frontend consume la API desde:
http://localhost:3000/api
```
