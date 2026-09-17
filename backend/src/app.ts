import cors from 'cors';
import express, { type Express } from 'express';
import { errorHandler } from '#shared/http/error-handler.js';
import { env } from './config/env.js';
import { apiRouter } from './modules/routes.js';

export function crearApp(): Express {
  const app = express();

  app.use(cors({ origin: env.CORS_ORIGIN }));
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.use('/api', apiRouter);

  app.use(errorHandler);

  return app;
}
