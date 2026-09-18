import type { Item } from '../../items/types/item';

export interface DescuentoPorTipo {
  cantidad: number;
  subtotal: number;
  porcentaje: number;
  descuento: number;
  total: number;
}

export interface ResumenDescuentos {
  servicios: DescuentoPorTipo;
  productos: DescuentoPorTipo;
  subtotal: number;
  descuentoTotal: number;
  total: number;
}

export interface Cotizacion {
  items: Item[];
  descuentos: ResumenDescuentos;
}

export interface Asistencia {
  id: string;
  usuarioId: string;
  fechaHoraAsistencia: string;
  createdAt: string;
  updatedAt: string;
}

export interface AsistenciaDetalle extends Asistencia, Cotizacion {}

export interface ConfirmarAsistenciaInput {
  fechaHoraAsistencia: string;
  itemIds: string[];
}
