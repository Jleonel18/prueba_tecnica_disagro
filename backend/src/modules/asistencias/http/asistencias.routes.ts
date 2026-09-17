import { Router } from 'express';
import { requireAuth } from '#shared/middleware/require-auth.js';
import type { AsistenciasController } from './asistencias.controller.js';

export function crearAsistenciasRouter(controller: AsistenciasController): Router {
  const router = Router();

  router.post('/', requireAuth, controller.confirmar);
  router.get('/me', requireAuth, controller.me);

  return router;
}
