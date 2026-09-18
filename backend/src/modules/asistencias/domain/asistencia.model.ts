import type { Item } from '#modules/items/domain/item.model.js';
import type { ResumenDescuentos } from './descuentos.js';

export interface Asistencia {
  id: string;
  usuarioId: string;
  fechaHoraAsistencia: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cotizacion {
  items: Item[];
  descuentos: ResumenDescuentos;
}

export interface AsistenciaDetalle extends Asistencia, Cotizacion {}
