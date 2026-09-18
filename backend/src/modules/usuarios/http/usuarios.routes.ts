import { Router } from 'express';
import type { UsuariosController } from './usuarios.controller.js';

export function crearUsuariosRouter(controller: UsuariosController): Router {
  const router = Router();

  router.post('/', controller.registrar);

  return router;
}
