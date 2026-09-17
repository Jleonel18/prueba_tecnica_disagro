import { BadRequestError } from '#shared/http/errors.js';
import { esUuid } from '#shared/http/validators.js';

export interface ConfirmarAsistenciaInput {
  fechaHoraAsistencia: Date;
  itemIds: string[];
}

const MAX_ITEMS = 50;

export function parseConfirmarAsistencia(body: unknown): ConfirmarAsistenciaInput {
  const datos = (typeof body === 'object' && body !== null ? body : {}) as Record<
    string,
    unknown
  >;
  const { fechaHoraAsistencia, itemIds } = datos;

  if (typeof fechaHoraAsistencia !== 'string') {
    throw new BadRequestError('La fecha y hora de asistencia es requerida');
  }
  const fecha = new Date(fechaHoraAsistencia);
  if (Number.isNaN(fecha.getTime())) {
    throw new BadRequestError('Fecha y hora de asistencia inválida');
  }
  if (fecha.getTime() <= Date.now()) {
    throw new BadRequestError('La fecha y hora de asistencia debe ser futura');
  }

  if (!Array.isArray(itemIds) || itemIds.length === 0) {
    throw new BadRequestError('Selecciona al menos un servicio o producto');
  }
  if (itemIds.length > MAX_ITEMS) {
    throw new BadRequestError(`No puedes seleccionar más de ${MAX_ITEMS} items`);
  }
  if (!itemIds.every(esUuid)) {
    throw new BadRequestError('Id de item inválido');
  }

  return {
    fechaHoraAsistencia: fecha,
    itemIds: [...new Set(itemIds)],
  };
}
