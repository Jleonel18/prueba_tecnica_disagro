import type { Request, Response } from 'express';
import { UnauthorizedError } from '#shared/http/errors.js';
import type { AsistenciasService } from '../application/asistencias.service.js';
import { parseConfirmarAsistencia } from './asistencias.schema.js';

export class AsistenciasController {
  constructor(private readonly asistenciasService: AsistenciasService) {}

  confirmar = async (req: Request, res: Response): Promise<void> => {
    if (!req.sesion) {
      throw new UnauthorizedError();
    }
    const datos = parseConfirmarAsistencia(req.body);
    const detalle = await this.asistenciasService.confirmar(req.sesion.sub, datos);
    res.status(201).json(detalle);
  };

  me = async (req: Request, res: Response): Promise<void> => {
    if (!req.sesion) {
      throw new UnauthorizedError();
    }
    const detalle = await this.asistenciasService.obtenerDeUsuario(req.sesion.sub);
    res.json(detalle);
  };
}
