import type { Item } from '#modules/items/domain/item.model.js';
import type { ResumenDescuentos } from './descuentos.js';

export interface Asistencia {
  id: string;
  usuarioId: string;
  fechaHoraAsistencia: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AsistenciaDetalle extends Asistencia {
  items: Item[];
  descuentos: ResumenDescuentos;
}
