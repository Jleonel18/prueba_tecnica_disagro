import 'dotenv/config';
import { Pool, type PoolClient, type QueryResultRow } from 'pg';

const connectionString = process.env['DB_POSTGRES'];

if (!connectionString) {
  throw new Error('DB_POSTGRES no está definida. Revisa backend/.env.');
}

// Único punto de conexión a NeonDB en todo el backend. No se exporta: nada
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 10_000,
});

// Ejecuta una query y devuelve solo las filas. Útil para SELECTs. No admite SQL injection: los parámetros deben pasarse en `params`.
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = [],
): Promise<T[]> {
  const result = await pool.query<T>(text, params);
  return result.rows;
}

// Ejecuta `fn` dentro de una transacción: COMMIT si termina bien, ROLLBACK si lanza.
export async function withTransaction<T>(
  fn: (client: PoolClient) => Promise<T>,
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

/** Cierra el pool. Solo para scripts de un solo uso (ping, etc). */
export async function closePool(): Promise<void> {
  await pool.end();
}
