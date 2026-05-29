# Munequitas Backend

API REST en NestJS para catalogo, combos, newsletter y contacto.

## Base de datos

La base real vive en Supabase PostgreSQL y ya fue creada con los scripts SQL del repositorio. El `schema.prisma` esta alineado a esas tablas y solo se usa para generar el cliente Prisma.

No ejecutes Prisma Migrate contra Supabase para recrear la base.

## Variables

```bash
NODE_ENV=development
PORT=3001
DATABASE_URL="postgresql://postgres.<PROJECT_REF>:<DB_PASSWORD>@<REGION>.pooler.supabase.com:5432/postgres?sslmode=require"
CORS_ORIGINS="http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:5173"
API_PREFIX="api"
SWAGGER_ENABLED=true
```

## Desarrollo

```bash
npm install
npm run prisma:generate
npm run start:dev
```

La API escucha en `0.0.0.0:${PORT}` y publica rutas bajo `/${API_PREFIX}`.

## Endpoints

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

`GET /api/dolls` soporta `search`, `category`, `collection`, `productType`, `available`, `featured`, `minPrice`, `maxPrice`, `sortBy`, `order`, `page` y `limit`.

## Docker

```bash
docker build -t munequitas-backend .
docker run --env-file ./.env -p 3001:3001 munequitas-backend
```

## Azure App Service

Configura estas App Settings:

```bash
NODE_ENV=production
PORT=3001
WEBSITES_PORT=3001
DATABASE_URL="postgresql://postgres.<PROJECT_REF>:<DB_PASSWORD>@<REGION>.pooler.supabase.com:5432/postgres?sslmode=require"
CORS_ORIGINS="https://TU-FRONTEND.azurestaticapps.net,https://TU-DOMINIO.com"
API_PREFIX="api"
SWAGGER_ENABLED=false
```

Health check sugerido: `/api/health`.

## Verificacion

```bash
npm run prisma:generate
npm run build
npm run test
```
