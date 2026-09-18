import { BadRequestError } from '#shared/http/errors.js';
import { esUuid } from '#shared/http/validators.js';

export interface ConfirmarAsistenciaInput {
  fechaHoraAsistencia: Date;
  itemIds: string[];
}

export interface CotizarInput {
  itemIds: string[];
}

const MAX_ITEMS = 50;

function toRecord(body: unknown): Record<string, unknown> {
  return (typeof body === 'object' && body !== null ? body : {}) as Record<string, unknown>;
}

function parseItemIds(valor: unknown): string[] {
  if (!Array.isArray(valor) || valor.length === 0) {
    throw new BadRequestError('Selecciona al menos un servicio o producto');
  }
  if (valor.length > MAX_ITEMS) {
    throw new BadRequestError(`No puedes seleccionar más de ${MAX_ITEMS} items`);
  }
  if (!valor.every(esUuid)) {
    throw new BadRequestError('Id de item inválido');
  }
  return [...new Set(valor)];
}

export function parseCotizar(body: unknown): CotizarInput {
  const { itemIds } = toRecord(body);
  return { itemIds: parseItemIds(itemIds) };
}

export function parseConfirmarAsistencia(body: unknown): ConfirmarAsistenciaInput {
  const { fechaHoraAsistencia, itemIds } = toRecord(body);

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

  return {
    fechaHoraAsistencia: fecha,
    itemIds: parseItemIds(itemIds),
  };
}
