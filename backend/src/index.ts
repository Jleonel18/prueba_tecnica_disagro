
import { env } from './config/env.js';
import { crearApp } from './app.js';
import { closePool } from './db/pool.js';

const app = crearApp();

const server = app.listen(env.PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${env.PORT}`);
});

async function shutdown(signal: string): Promise<void> {
  console.log(`\n${signal} recibido, cerrando servidor...`);
  await new Promise<void>((resolve) => server.close(() => resolve()));
  await closePool();
  process.exit(0);
}

process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));
