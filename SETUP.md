# 🚀 Erdl

## 📄 Descripción

![Node.js](https://img.shields.io/badge/node-%3E%3D%2018-green)
![npm](https://img.shields.io/badge/npm-%3E%3D%209-blue)
![Tests](https://img.shields.io/badge/tests-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-yellow)


**Erdl** es una aplicación para **acortar URLs** desarrollada con **Node.js, Express y TypeScript**.  
Permite a los usuarios generar enlaces cortos y redirigirlos, almacenando la información en **SQLite o TursoDB**.  

Incluye:
- ✅ Validación de URLs  
- ✅ Límites de uso por usuario  
- ✅ Limpieza automática de enlaces expirados  


## 🛠️ Requisitos previos

- 🟢 **Node.js >= 18**  
- 📦 **npm >= 9.x**  
- 💾 **SQLite o TursoDB**  

---

## ⚙️ Instalación y configuración

1. **Clona el repositorio:**
   ```sh
   git clone https://github.com/Joel-RD/erdl.git
   cd erdl

2. **Instala las dependencias y actualizarlas:**

   ```sh
   npm install && npm update
   ```

3. **Configura las variables de entorno:**

   - Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido (ajusta los valores según tu entorno):
     ```bash
     NODE_ENV=development # o production
     BASE_URL=localhost
     ABSOLUTE_PATH_DB=/ruta/a/erdl_shortener.db
     TURSO_DB=https://xxxx.turso.io
     TURSO_DB_AUTH_TOKEN=tu_token
     LOCAL_DB=erdl_shortener.db
     PORT=7261
     APP_PROTOCOL=http
     APP_DOMAIN=localhost
     APP_SUBDOMAIN=urlCut
     FRONTEND_URL=https://www.erdl.my/
     ```

4. **Configura la base de datos:**
   - Asegúrate de tener SQLite corriendo.
   - Crear un arquivo (aqui el nombre de la base de datos).db, en la ruta de su preferencia;
   - Abrir la carpeta en donde creo la base de datos en terminal ejemplo: documents/database.db
   - Lueego ejecuta este script para acceder a sqlite por terminal:
     ```
     sqlite3 example.db
     ```
   - Copie y pegue esto en el orden que se encuntran:
      ```sql
        CREATE TABLE short_links (
            short_links_id INTEGER  PRIMARY KEY,
            shoriginal_url   TEXT     NOT NULL,
            short_code     TEXT     NOT NULL
                            UNIQUE,
            short_url      TEXT     NOT NULL
                            UNIQUE,
            clicks         INTEGER  DEFAULT 0,
            expires        DATETIME,
            created_at     TEXT     DEFAULT (datetime('now', 'localtime') ) 
      )
      ```

      ```sql
         CREATE TABLE subscription_plan (
            subscription_plan_id INTEGER PRIMARY KEY,
            name                 TEXT    NOT NULL,
            price                DOUBLE,
            duration_mouths      TEXT,
            user_limit           INTEGER,
            devices_limit        INTEGER
         )
      ```

      ```sql
         CREATE TABLE users_authentication (
            user_id              INTEGER PRIMARY KEY,
            email                TEXT    UNIQUE,
            password_hash        TEXT,
            type_account         TEXT    CHECK (type_account IN ('user', 'admin') ),
            short_links_id       INTEGER,
            subscription_plan_id INTEGER,
            created_at           TEXT    DEFAULT (datetime('now', 'localtime') ),
            FOREIGN KEY (
               subscription_plan_id
            )
            REFERENCES subscription_plan (subscription_plan_id),
            FOREIGN KEY (
               short_links_id
            )
            REFERENCES short_links (short_links_id) 
         )
      ```




## 📜 Scripts disponibles

- `npm run build` — Compila el código TypeScript a JavaScript en la carpeta `dir/`.
- `npm run dev` — Compila y ejecuta el servidor en modo desarrollo con recarga automática y copilacion de typescrypt.
- `npm start` — Ejecuta el servidor en modo producción.
- `npm test` — Ejecuta los tests con Jest.

## 📁 Estructura del proyecto

- `src/` — Código fuente principal (TypeScript)
  - `app.ts` — Configuración de la app Express
  - `index.ts` — Punto de entrada
  - `config/` — Configuración y variables de entorno
  - `controller/` — Lógica de acortado y redirección
  - `models/` — Conexión y queries a la base de datos
  - `routers/` — Rutas de la API y redirección
  - `utils/` — Utilidades: validación, generación de IDs, límites, limpieza
  - `error.html` — Página de error
- `dir/` — Código JavaScript compilado
- `test/` — Pruebas unitarias e integración

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

## Author

- [Joel:RD-01](https://github.com/Joel-RD)