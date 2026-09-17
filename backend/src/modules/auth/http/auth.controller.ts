import type { Request, Response } from 'express';
import { UnauthorizedError } from '#shared/http/errors.js';
import type { AuthService } from '../application/auth.service.js';
import { parseLogin } from './auth.schema.js';

export class AuthController {
  constructor(private readonly authService: AuthService) {}


  login = async (req: Request, res: Response): Promise<void> => {
    const credenciales = parseLogin(req.body);
    const { token, usuario } = await this.authService.login(credenciales);
    res.json({ token, usuario });
  };

  me = async (req: Request, res: Response): Promise<void> => {
    if (!req.sesion) {
      throw new UnauthorizedError();
    }
    const usuario = await this.authService.obtenerSesionActual(req.sesion);
    res.json(usuario);
  };
}
