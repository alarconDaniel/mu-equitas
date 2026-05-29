# Muñequitas Frontend

Frontend de la tienda online Muñequitas, construido con React, Vite, TypeScript y Tailwind CSS.

## Requisitos

- Node.js 20 o superior
- Backend disponible en `http://localhost:3001/api` para consumir el catalogo real

## Configuracion

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Crea `.env.local` si necesitas cambiar la URL de la API:
   ```bash
   VITE_API_URL=http://localhost:3001/api
   ```

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

El catalogo consume el backend mediante `src/services`. Si la API no esta disponible durante desarrollo, la app usa los datos mock locales como fallback controlado para conservar la experiencia visual.
