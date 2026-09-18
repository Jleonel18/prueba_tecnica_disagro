import { BadRequestError } from '#shared/http/errors.js';

export interface LoginInput {
  email: string;
  password: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseLogin(body: unknown): LoginInput {
  const datos = (typeof body === 'object' && body !== null ? body : {}) as Record<
    string,
    unknown
  >;
  const { email, password } = datos;

  if (typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    throw new BadRequestError('Email inválido');
  }

  // No se valida longitud mínima aquí a propósito: cualquier contraseña
  // incorrecta debe resultar en 401, no en 400.
  if (typeof password !== 'string' || password.length < 1) {
    throw new BadRequestError('La contraseña es requerida');
  }

  return {
    email: email.trim(),
    password,
  };
}
