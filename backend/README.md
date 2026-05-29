# Muñequitas Backend

API REST construida con NestJS, PostgreSQL y Prisma para alimentar catalogo, categorias, colecciones, newsletter y contacto.

## Stack

- NestJS + TypeScript
- PostgreSQL
- Prisma ORM
- class-validator y class-transformer
- @nestjs/config
- Swagger/OpenAPI
- Jest y Supertest

## Variables de entorno

Copia `.env.example` a `.env`:

```bash
PORT=3001
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/munequitas_db?schema=public"
CORS_ORIGIN="http://localhost:3000"
```

## Instalacion y base de datos

```bash
npm install
docker compose up -d
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

El seed crea 6 categorias, 4 colecciones y 12 muñecas iniciales.

## Desarrollo

```bash
npm run start:dev
```

La API se publica bajo el prefijo `/api`.

```text
GET http://localhost:3001/api/health
GET http://localhost:3001/api/dolls
```

Swagger:

```text
http://localhost:3001/api/docs
```

## Scripts

```bash
npm run start:dev
npm run build
npm run test
npm run test:e2e
npm run prisma:migrate
npm run prisma:generate
npm run prisma:seed
```

## Endpoints

### Health

- `GET /api/health`

### Dolls

- `GET /api/dolls`
- `GET /api/dolls/:slug`
- `POST /api/dolls`
- `PATCH /api/dolls/:id`
- `DELETE /api/dolls/:id`

`GET /api/dolls` soporta:

- `search`
- `category`
- `collection`
- `available`
- `minPrice`
- `maxPrice`
- `sortBy`: `price`, `createdAt`, `popularity`, `name`
- `order`: `asc`, `desc`
- `page`
- `limit`

### Categories

- `GET /api/categories`
- `GET /api/categories/:slug`
- `POST /api/categories`
- `PATCH /api/categories/:id`
- `DELETE /api/categories/:id`

### Collections

- `GET /api/collections`
- `GET /api/collections/:slug`
- `POST /api/collections`
- `PATCH /api/collections/:id`
- `DELETE /api/collections/:id`

### Newsletter

```http
POST /api/newsletter
Content-Type: application/json

{
  "email": "correo@ejemplo.com"
}
```

### Contact

```http
POST /api/contact
Content-Type: application/json

{
  "name": "Nombre",
  "email": "correo@ejemplo.com",
  "subject": "Asunto",
  "message": "Mensaje"
}
```
