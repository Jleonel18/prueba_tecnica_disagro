import { query } from '#db/pool.js';
import type { UsuarioRow } from '#db/types.js';
import type { Usuario } from '../domain/usuario.model.js';
import type { UsuarioRepository } from '../domain/usuario.repository.js';
import { EmailYaRegistradoError } from '../domain/usuario.errors.js';

interface PgError extends Error {
  code?: string;
  constraint?: string;
}

function esViolacionDeEmailUnico(error: unknown): error is PgError {
  const pgError = error as PgError;
  return (
    error instanceof Error &&
    pgError.code === '23505' &&
    pgError.constraint === 'ux_usuarios_email'
  );
}

function mapRow(row: UsuarioRow): Usuario {
  return {
    id: row.id,
    nombre: row.nombre,
    apellidos: row.apellidos,
    email: row.email,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export class UsuarioRepositoryPg implements UsuarioRepository {
  async findById(id: string): Promise<Usuario | null> {
    const rows = await query<UsuarioRow>(
      'SELECT * FROM usuarios WHERE id = $1',
      [id],
    );
    const row = rows[0];
    return row ? mapRow(row) : null;
  }

  async findCredencialesByEmail(
    email: string,
  ): Promise<{ usuario: Usuario; passwordHash: string } | null> {
    const rows = await query<UsuarioRow>(
      'SELECT * FROM usuarios WHERE email = $1',
      [email],
    );
    const row = rows[0];
    return row ? { usuario: mapRow(row), passwordHash: row.password_hash } : null;
  }

  async create(datos: {
    nombre: string;
    apellidos: string;
    email: string;
    passwordHash: string;
  }): Promise<Usuario> {
    try {
      const rows = await query<UsuarioRow>(
        `INSERT INTO usuarios (nombre, apellidos, email, password_hash)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [datos.nombre, datos.apellidos, datos.email, datos.passwordHash],
      );
      const row = rows[0];
      if (!row) {
        throw new Error('El INSERT de usuario no devolvió ninguna fila.');
      }
      return mapRow(row);
    } catch (error) {
      if (esViolacionDeEmailUnico(error)) {
        throw new EmailYaRegistradoError(datos.email);
      }
      throw error;
    }
  }
}
