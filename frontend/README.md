# Munequitas Frontend

Frontend React + Vite. La interfaz visual aprobada se conserva; la conexion con backend se controla desde servicios en `src/services`.

## Variables

```bash
VITE_API_URL=http://localhost:3001/api
```

En produccion, `VITE_API_URL` debe apuntar al backend publicado. No uses claves secretas en el frontend.

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run lint
```

## Imagenes

Las imagenes publicas del catalogo estan preparadas en `public/images`. Las rutas deben coincidir con `image_url` en Supabase.
