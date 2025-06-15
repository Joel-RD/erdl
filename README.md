# 🚀 Erdl

## 📄 Descripción

Erdl es una aplicación para acortar URLs desarrollada con Node.js, Express y TypeScript. Permite a los usuarios acortar enlaces y redirigirlos, almacenando la información en una base de datos PostgreSQL. Incluye validación de URLs, límites de uso y limpieza automática de enlaces antiguos.

---

## 🛠️ Requisitos previos

- 🟢 Node.js >= 18.x
- 📦 npm >= 9.x
- 🐘 PostgreSQL >= 13.x

---

## ⚙️ Instalación y configuración

1. **Clona el repositorio:**

   ```sh
   git clone https://github.com/Joel-RD/erdl.git
   ```

2. **Instala las dependencias:**

   ```sh
   npm install
   ```

3. **Actualizar dependencias**

   ```sh
   npm updated
   ```

3. **Configura las variables de entorno:**

   - Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido (ajusta los valores según tu entorno):
     ```env
     NODE_ENV=Development
     BASE_URL=http://localhost:
     LOCAL_DB=postgresql://usuario:contraseña@localhost:5432/shortener
     CLOUD_DB=postgresql://usuario:contraseña@host:puerto/shortener
     PORT=7261
     APP_PROTOCOL=http
     APP_DOMAIN=localhost
     APP_SUBDOMAIN=urlCut
     ```

4. **Configura la base de datos:**
   - Asegúrate de tener PostgreSQL corriendo.
   - Ejecuta este script para acceder a psql por terminal:
     ```sh
     psql -U <usuario>
     contraseña: <contraseña>
     ```
   - Ingrese el siguiente código SQL para crear la DB y la tabla:
   ```sql
   CREATE DATABASE shortener;

   CREATE TABLE url_shortener (
   id SERIAL PRIMARY KEY,
   short_url VARCHAR(50) UNIQUE NOT NULL,
   url_id varchar(50) unique not null,
   original_url TEXT NOT NULL,
   created_at TIMESTAMP DEFAULT NOW(),
   clicks INTEGER DEFAULT 0
   );
   ```

---

## 📜 Scripts disponibles

- `npm run build` — Compila el código TypeScript a JavaScript en la carpeta `dir/`.
- `npm run dev` — Compila y ejecuta el servidor en modo desarrollo con recarga automática y copilacion de typescrypt.
- `npm start` — Ejecuta el servidor en modo producción.
- `npm test` — Ejecuta los tests con Jest.

---

## 📁 Estructura del proyecto

- `src/` — Código fuente principal (TypeScript)
  - `app.ts` — Configuración de la app Express
  - `index.ts` — Punto de entrada
  - `config/` — Configuración y variables de entorno
  - `controller/` — Lógica de acortado y redirección
  - `models/` — Conexión y queries a la base de datos
  - `routers/` — Rutas de la API y redirección
  - `utils/` — Utilidades: validación, generación de IDs, límites, limpieza
  - `short.html` — Interfaz web para acortar URLs
  - `error.html` — Página de error
- `dir/` — Código JavaScript compilado
- `test/` — Pruebas unitarias e integración

---

## 🚦 Uso

1. **Inicia el servidor:**
   ```sh
   npm run dev
   # o en producción
   npm run build && npm start
   ```
2. **Abre en tu navegador:**
   - 🌐 [http://localhost:7261](http://localhost:7261) (o el puerto configurado)
3. **Interfaz web:**
   - Usa el formulario para acortar URLs.
4. **API REST:**
   - `POST /api/v1/short` — Acorta una URL. Body: `{ "orig_url": "https://ejemplo.com" }`
   - `GET /:short_url` — Redirige a la URL original.

---

## 📝 Notas adicionales

- 🧹 El sistema elimina automáticamente URLs con más de 7 días de antigüedad.
- ⏳ Hay límites diarios/semanales para evitar abuso.
- 🟦 El código fuente está en TypeScript, pero se ejecuta el JavaScript compilado en `dir/`.
- 🛠️ Para desarrollo, puedes modificar los archivos en `src/` y usar `npm run dev`.

---

## 🧪 Pruebas

- Ejecuta `npm test` para correr los tests unitarios y de integración.

---

## 📄 Licencia

MIT
