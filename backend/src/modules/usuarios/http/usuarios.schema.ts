import { BadRequestError } from '#shared/http/errors.js';

export interface RegistrarUsuarioInput {
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseRegistrarUsuario(body: unknown): RegistrarUsuarioInput {
  const datos = (typeof body === 'object' && body !== null ? body : {}) as Record<
    string,
    unknown
  >;
  const { nombre, apellidos, email, password } = datos;

  if (typeof nombre !== 'string' || nombre.trim().length < 1) {
    throw new BadRequestError('El nombre es requerido');
  }
  if (nombre.trim().length > 100) {
    throw new BadRequestError('El nombre no puede superar los 100 caracteres');
  }

  if (typeof apellidos !== 'string' || apellidos.trim().length < 1) {
    throw new BadRequestError('Los apellidos son requeridos');
  }
  if (apellidos.trim().length > 100) {
    throw new BadRequestError('Los apellidos no pueden superar los 100 caracteres');
  }

  if (typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    throw new BadRequestError('Email inválido');
  }
  if (email.trim().length > 255) {
    throw new BadRequestError('El email no puede superar los 255 caracteres');
  }

  if (typeof password !== 'string' || password.length < 8) {
    throw new BadRequestError('La contraseña debe tener al menos 8 caracteres');
  }
  if (password.length > 100) {
    throw new BadRequestError('La contraseña no puede superar los 100 caracteres');
  }

  return {
    nombre: nombre.trim(),
    apellidos: apellidos.trim(),
    email: email.trim(),
    password,
  };
}
