import { Router } from 'express';
import { usuariosRouter } from './usuarios/index.js';
import { authRouter } from './auth/index.js';
import { itemsRouter } from './items/index.js';
import { asistenciasRouter } from './asistencias/index.js';

export const apiRouter: Router = Router();

apiRouter.use('/usuarios', usuariosRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/items', itemsRouter);
apiRouter.use('/asistencias', asistenciasRouter);
