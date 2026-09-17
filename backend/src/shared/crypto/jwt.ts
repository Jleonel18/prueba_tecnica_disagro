import jwt from 'jsonwebtoken';
import { env } from '#config/env.js';
import type { SesionPayload } from '#modules/auth/domain/sesion.model.js';

const SIGN_OPTIONS: jwt.SignOptions = {
  expiresIn: env.JWT_EXPIRES_IN as NonNullable<jwt.SignOptions['expiresIn']>,
};

export function firmarToken(payload: SesionPayload): string {
  return jwt.sign(payload, env.JWT_SECRET, SIGN_OPTIONS);
}

// Devuelve el payload si el token es válido y no ha expirado, o `null` en
// cualquier otro caso. Quien llama decide qué error HTTP corresponde.
export function verificarToken(token: string): SesionPayload | null {
  try {
    return jwt.verify(token, env.JWT_SECRET) as SesionPayload;
  } catch {
    return null;
  }
}
