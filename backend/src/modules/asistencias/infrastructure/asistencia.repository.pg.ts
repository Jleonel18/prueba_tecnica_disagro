import { query, withTransaction } from '#db/pool.js';
import type { AsistenciaRow } from '#db/types.js';
import type { Asistencia } from '../domain/asistencia.model.js';
import type { AsistenciaRepository } from '../domain/asistencia.repository.js';
import { AsistenciaYaConfirmadaError } from '../domain/asistencia.errors.js';

interface PgError extends Error {
  code?: string;
  constraint?: string;
}

function esViolacionDeAsistenciaUnica(error: unknown): error is PgError {
  const pgError = error as PgError;
  return (
    error instanceof Error &&
    pgError.code === '23505' &&
    pgError.constraint === 'ux_asistencias_usuario'
  );
}

function mapRow(row: AsistenciaRow): Asistencia {
  return {
    id: row.id,
    usuarioId: row.usuario_id,
    fechaHoraAsistencia: row.fecha_hora_asistencia,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export class AsistenciaRepositoryPg implements AsistenciaRepository {
  async findByUsuarioId(usuarioId: string): Promise<Asistencia | null> {
    const rows = await query<AsistenciaRow>(
      'SELECT * FROM asistencias WHERE usuario_id = $1',
      [usuarioId],
    );
    const row = rows[0];
    return row ? mapRow(row) : null;
  }

  async findItemIdsByAsistenciaId(asistenciaId: string): Promise<string[]> {
    const rows = await query<{ item_id: string }>(
      'SELECT item_id FROM asistencia_items WHERE asistencia_id = $1',
      [asistenciaId],
    );
    return rows.map((row) => row.item_id);
  }

  async create(datos: {
    usuarioId: string;
    fechaHoraAsistencia: Date;
    itemIds: string[];
  }): Promise<Asistencia> {
    try {
      return await withTransaction(async (client) => {
        const result = await client.query<AsistenciaRow>(
          `INSERT INTO asistencias (usuario_id, fecha_hora_asistencia)
           VALUES ($1, $2)
           RETURNING *`,
          [datos.usuarioId, datos.fechaHoraAsistencia],
        );
        const row = result.rows[0];
        if (!row) {
          throw new Error('El INSERT de asistencia no devolvió ninguna fila.');
        }

        await client.query(
          `INSERT INTO asistencia_items (asistencia_id, item_id)
           SELECT $1, unnest($2::uuid[])`,
          [row.id, datos.itemIds],
        );

        return mapRow(row);
      });
    } catch (error) {
      if (esViolacionDeAsistenciaUnica(error)) {
        throw new AsistenciaYaConfirmadaError(datos.usuarioId);
      }
      throw error;
    }
  }
}
