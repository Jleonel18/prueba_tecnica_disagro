import { Router } from 'express';
import { usuariosRouter } from './usuarios/index.js';
import { authRouter } from './auth/index.js';

// Único lugar que decide el prefijo público de cada módulo.
export const apiRouter: Router = Router();

apiRouter.use('/usuarios', usuariosRouter);
apiRouter.use('/auth', authRouter);
