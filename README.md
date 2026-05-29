# Munequitas

Tienda online con frontend React + Vite y backend NestJS + Prisma conectado a PostgreSQL en Supabase.

El frontend visual ya esta aprobado. Los cambios de integracion deben hacerse en servicios y configuracion, sin redisenar componentes.

## Supabase

La base de datos real ya fue creada ejecutando:

- `sql/munequitas_01_schema.sql`
- `sql/munequitas_02_seed.sql`

Esa estructura SQL es la fuente de verdad. No uses Prisma Migrate para recrear, resetear o modificar la base en Supabase.

## Backend local

```bash
cd backend
npm install
cp .env.example .env
npm run prisma:generate
npm run start:dev
```

Variables requeridas en `backend/.env`:

```bash
NODE_ENV=development
PORT=3001
DATABASE_URL="postgresql://postgres.<PROJECT_REF>:<DB_PASSWORD>@<REGION>.pooler.supabase.com:5432/postgres?sslmode=require"
CORS_ORIGINS="http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:5173"
API_PREFIX="api"
SWAGGER_ENABLED=true
```

La API queda en `http://localhost:3001/api`.

Swagger queda en `http://localhost:3001/api/docs` solo cuando `SWAGGER_ENABLED=true`.

## Frontend local

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

`frontend/.env`:

```bash
VITE_API_URL=http://localhost:3001/api
```

En desarrollo, el catalogo conserva un fallback controlado a mocks si la API no responde. La integracion principal es siempre `VITE_API_URL`.

## Endpoints principales

- `GET /api/health`
- `GET /api/categories`
- `GET /api/categories/:slug`
- `GET /api/collections`
- `GET /api/collections/:slug`
- `GET /api/dolls`
- `GET /api/dolls/:slug`
- `GET /api/combos`
- `GET /api/combos/:slug`
- `POST /api/newsletter`
- `POST /api/contact`

Filtros de `GET /api/dolls`:

```text
search, category, collection, productType, available, featured, minPrice, maxPrice, sortBy, order, page, limit
```

Valores validos:

- `productType`: `doll`, `accessory`, `keychain`
- `sortBy`: `price`, `createdAt`, `popularity`, `name`
- `order`: `asc`, `desc`

## Docker

```bash
docker build -t munequitas-backend ./backend
docker run --env-file ./backend/.env -p 3001:3001 munequitas-backend
```

Tambien puedes usar:

```bash
cd backend
docker compose up --build
```

El contenedor escucha en `0.0.0.0:3001` y usa `PORT`.

## Deploy en Azure

Variables sugeridas para Azure App Service:

```bash
NODE_ENV=production
PORT=3001
WEBSITES_PORT=3001
DATABASE_URL="postgresql://postgres.<PROJECT_REF>:<DB_PASSWORD>@<REGION>.pooler.supabase.com:5432/postgres?sslmode=require"
CORS_ORIGINS="https://TU-FRONTEND.azurestaticapps.net,https://TU-DOMINIO.com"
API_PREFIX="api"
SWAGGER_ENABLED=false
```

Pasos:

1. Crear la imagen Docker.
2. Subir la imagen a Azure Container Registry o Docker Hub.
3. Crear App Service usando contenedor.
4. Configurar App Settings: `NODE_ENV`, `PORT`, `WEBSITES_PORT`, `DATABASE_URL`, `CORS_ORIGINS`, `API_PREFIX`, `SWAGGER_ENABLED`.
5. Probar `/api/health`.
6. Probar `/api/dolls`.
7. Probar `/api/combos`.
8. Configurar `VITE_API_URL` en el frontend apuntando al backend publicado.

Health check sugerido en Azure: `/api/health`.

## Imagenes

Las imagenes publicas del catalogo viven en:

- `frontend/public/images/categories/`
- `frontend/public/images/collections/`
- `frontend/public/images/dolls/`
- `frontend/public/images/accessories/`
- `frontend/public/images/keychains/`
- `frontend/public/images/combos/`

Las rutas deben coincidir con `image_url` en Supabase, por ejemplo `/images/keychains/mini-ellen-joe.jpg`.

## Verificacion

Backend:

```bash
cd backend
npm run prisma:generate
npm run build
npm run test
```

Frontend:

```bash
cd frontend
npm run build
npm run lint
```
