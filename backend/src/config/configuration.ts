export default () => ({
  port: Number(process.env.PORT ?? 3001),
  databaseUrl:
    process.env.DATABASE_URL ??
    'postgresql://postgres:postgres@localhost:5432/munequitas_db?schema=public',
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
});
