import type { Asistencia } from './asistencia.model.js';

export interface AsistenciaRepository {
  findByUsuarioId(usuarioId: string): Promise<Asistencia | null>;
  findItemIdsByAsistenciaId(asistenciaId: string): Promise<string[]>;
  create(datos: {
    usuarioId: string;
    fechaHoraAsistencia: Date;
    itemIds: string[];
  }): Promise<Asistencia>;
}
