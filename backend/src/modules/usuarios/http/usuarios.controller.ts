import type { Request, Response } from 'express';
import { firmarToken } from '#shared/crypto/jwt.js';
import type { UsuariosService } from '../application/usuarios.service.js';
import { parseRegistrarUsuario } from './usuarios.schema.js';

export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  registrar = async (req: Request, res: Response): Promise<void> => {
    const datos = parseRegistrarUsuario(req.body);
    const usuario = await this.usuariosService.registrar(datos);
    const token = firmarToken({ sub: usuario.id, email: usuario.email });
    res.status(201).json({ token, usuario });
  };
}
