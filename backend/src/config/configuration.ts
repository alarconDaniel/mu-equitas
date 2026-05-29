const DEFAULT_CORS_ORIGINS =
  'http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:5173';

function parseCsv(value = '') {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseBoolean(value: string | undefined, fallback: boolean) {
  if (value === undefined) {
    return fallback;
  }

  return value.toLowerCase() === 'true';
}

function parsePort(value: string | undefined) {
  const port = Number(value);
  return Number.isInteger(port) && port > 0 ? port : 3001;
}

export default () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parsePort(process.env.PORT),
  databaseUrl: process.env.DATABASE_URL,
  corsOrigins: parseCsv(process.env.CORS_ORIGINS ?? DEFAULT_CORS_ORIGINS),
  apiPrefix: (process.env.API_PREFIX ?? 'api').replace(/^\/+|\/+$/g, ''),
  swaggerEnabled: parseBoolean(process.env.SWAGGER_ENABLED, true),
});
