import { closePool, query } from './pool.js';

interface VersionRow {
  version: string;
}

async function main(): Promise<void> {
  const rows = await query<VersionRow>('SELECT version()');
  const version = rows[0]?.version;
  console.log('Conectado a NeonDB:', version ?? '(sin respuesta)');
}

main()
  .catch((error: unknown) => {
    console.error('No se pudo conectar a NeonDB:', error);
    process.exitCode = 1;
  })
  .finally(() => {
    void closePool();
  });
