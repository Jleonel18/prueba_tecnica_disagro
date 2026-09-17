import type { NextFunction, Request, Response } from 'express';
import { verificarToken } from '#shared/crypto/jwt.js';
import { UnauthorizedError } from '#shared/http/errors.js';
import type { SesionPayload } from '#modules/auth/domain/sesion.model.js';

declare global {
  namespace Express {
    interface Request {
      sesion?: SesionPayload;
    }
  }
}

// Único punto que sabe de dónde sale el token. Hoy lee el header
// Authorization; migrar a cookie httpOnly implica cambiar solo esta función.
function extraerToken(req: Request): string | null {
  const header = req.header('authorization');
  if (!header) {
    return null;
  }

  const [esquema, token] = header.split(' ');
  if (esquema !== 'Bearer' || !token) {
    return null;
  }
  return token;
}

export function requireAuth(req: Request, _res: Response, next: NextFunction): void {
  const token = extraerToken(req);
  const sesion = token ? verificarToken(token) : null;

  if (!sesion) {
    throw new UnauthorizedError();
  }

  req.sesion = sesion;
  next();
}
