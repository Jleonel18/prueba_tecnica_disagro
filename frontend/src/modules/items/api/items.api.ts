import { apiFetch } from '../../../shared/api/httpClient';
import type { Item, ListarItemsFiltros } from '../types/item';

function buildQuery(filtros: ListarItemsFiltros): string {
  const params = new URLSearchParams();
  if (filtros.q) params.set('q', filtros.q);
  if (filtros.tipo) params.set('tipo', filtros.tipo);
  const query = params.toString();
  return query ? `?${query}` : '';
}

export function listarItems(filtros: ListarItemsFiltros = {}): Promise<Item[]> {
  return apiFetch<Item[]>(`/items${buildQuery(filtros)}`);
}

export function obtenerItemPorId(id: string): Promise<Item> {
  return apiFetch<Item>(`/items/${id}`);
}
