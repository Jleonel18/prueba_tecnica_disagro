import { Router } from 'express';
import { requireAuth } from '#shared/middleware/require-auth.js';
import type { AuthController } from './auth.controller.js';

export function crearAuthRouter(controller: AuthController): Router {
  const router = Router();

  router.post('/login', controller.login);
  router.get('/me', requireAuth, controller.me);

  return router;
}
