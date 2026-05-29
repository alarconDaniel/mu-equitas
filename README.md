# Muñequitas

Muñequitas es una tienda online visual tipo fashion ecommerce para vender muñecas. El proyecto tiene un frontend en React + Vite + TypeScript y un backend en NestJS + PostgreSQL + Prisma.

## Requisitos

- Node.js 20 o superior
- Docker Desktop
- npm

## Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

El frontend corre en `http://localhost:3000` y consume `VITE_API_URL`, por defecto:

```bash
VITE_API_URL=http://localhost:3001/api
```

Si la API no esta disponible en desarrollo, el catalogo usa los datos mock locales como fallback controlado.

## Backend

```bash
cd backend
npm install
cp .env.example .env
docker compose up -d
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run start:dev
```

La API queda disponible en `http://localhost:3001/api`.

Swagger queda disponible en:

```text
http://localhost:3001/api/docs
```

## Endpoints principales

- `GET /api/health`
- `GET /api/dolls`
- `GET /api/dolls/:slug`
- `POST /api/dolls`
- `PATCH /api/dolls/:id`
- `DELETE /api/dolls/:id`
- `GET /api/categories`
- `GET /api/categories/:slug`
- `GET /api/collections`
- `GET /api/collections/:slug`
- `POST /api/newsletter`
- `POST /api/contact`

Filtros soportados en `GET /api/dolls`:

```text
search, category, collection, available, minPrice, maxPrice, sortBy, order, page, limit
```

Ejemplo:

```text
http://localhost:3001/api/dolls?category=personalizadas&sortBy=price&order=asc&page=1&limit=12
```

## Verificacion

Backend:

```bash
npm run build
npm run test
npm run test:e2e
```

Frontend:

```bash
npm run build
npm run lint
```
