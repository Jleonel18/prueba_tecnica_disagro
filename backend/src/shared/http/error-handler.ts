import type { ErrorRequestHandler } from 'express';
import { AppError } from './errors.js';

// Middleware de error final: se registra con app.use(errorHandler) DESPUÉS
// de montar todas las rutas. Express 5 lo invoca automáticamente cuando un
// handler lanza o devuelve una promesa rechazada (ver usuarios.controller.ts,
// que no tiene try/catch por eso).
export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  // Cualquier otro error es un bug o un fallo de infraestructura: se registra
  // completo en el servidor, pero nunca se expone error.message al cliente
  // (podría filtrar detalles de SQL, rutas de archivo, etc.).
  console.error(error);
  res.status(500).json({ error: 'Error interno del servidor' });
};
