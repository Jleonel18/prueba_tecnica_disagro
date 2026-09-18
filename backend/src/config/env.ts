import 'dotenv/config';

// DB_POSTGRES NO se valida aquí: db/pool.ts ya la lee y revienta si falta.
// Este archivo es dueño único del resto de la config de la app.

type NodeEnv = 'development' | 'production' | 'test';

function parseNodeEnv(value: string | undefined): NodeEnv {
  if (value === 'production' || value === 'test' || value === 'development') {
    return value;
  }
  return 'development';
}

function parsePort(value: string | undefined): number {
  if (!value) {
    return 3000;
  }
  const port = Number(value);
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error(`PORT inválido: "${value}". Debe ser un entero positivo.`);
  }
  return port;
}

function parseCorsOrigin(value: string | undefined): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : '*';
}

const JWT_SECRET_MIN_LENGTH = 32;

function parseJwtSecret(value: string | undefined): string {
  const trimmed = value?.trim();
  if (!trimmed) {
    throw new Error('JWT_SECRET no está definida. Revisa backend/.env.');
  }
  if (trimmed.length < JWT_SECRET_MIN_LENGTH) {
    throw new Error(
      `JWT_SECRET demasiado corta: debe tener al menos ${JWT_SECRET_MIN_LENGTH} caracteres.`,
    );
  }
  return trimmed;
}

function parseJwtExpiresIn(value: string | undefined): string {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : '8h';
}

export const env = {
  NODE_ENV: parseNodeEnv(process.env['NODE_ENV']),
  PORT: parsePort(process.env['PORT']),
  CORS_ORIGIN: parseCorsOrigin(process.env['CORS_ORIGIN']),
  JWT_SECRET: parseJwtSecret(process.env['JWT_SECRET']),
  JWT_EXPIRES_IN: parseJwtExpiresIn(process.env['JWT_EXPIRES_IN']),
};
