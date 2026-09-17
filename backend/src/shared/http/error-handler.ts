import type { ErrorRequestHandler } from 'express';
import { AppError } from './errors.js';


export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  console.error(error);
  res.status(500).json({ error: 'Error interno del servidor' });
};
