import { Router } from 'express';
import type { ItemsController } from './items.controller.js';

export function crearItemsRouter(controller: ItemsController): Router {
  const router = Router();

  router.get('/', controller.listar);
  router.get('/:id', controller.obtenerPorId);

  return router;
}
