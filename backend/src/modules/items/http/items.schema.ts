import { BadRequestError } from '#shared/http/errors.js';
import type { TipoItem } from '../domain/item.model.js';
import type { ListarItemsFiltros } from '../domain/item.repository.js';

const TIPOS_ITEM: readonly TipoItem[] = ['servicio', 'producto'];
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function esTipoItem(valor: unknown): valor is TipoItem {
  return typeof valor === 'string' && (TIPOS_ITEM as readonly string[]).includes(valor);
}

export function parseListarItems(query: unknown): ListarItemsFiltros {
  const datos = (typeof query === 'object' && query !== null ? query : {}) as Record<
    string,
    unknown
  >;
  const { q, tipo } = datos;

  const filtros: ListarItemsFiltros = {};

  if (q !== undefined) {
    if (typeof q !== 'string') {
      throw new BadRequestError('El parámetro q debe ser texto');
    }
    const busqueda = q.trim();
    if (busqueda.length > 150) {
      throw new BadRequestError('La búsqueda no puede superar los 150 caracteres');
    }
    if (busqueda.length > 0) {
      filtros.busqueda = busqueda;
    }
  }

  if (tipo !== undefined) {
    if (!esTipoItem(tipo)) {
      throw new BadRequestError('tipo inválido: use servicio o producto');
    }
    filtros.tipo = tipo;
  }

  return filtros;
}

export function parseItemId(param: unknown): string {
  if (typeof param !== 'string' || !UUID_REGEX.test(param)) {
    throw new BadRequestError('Id de item inválido');
  }
  return param;
}
