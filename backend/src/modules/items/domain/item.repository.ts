import type { Item, TipoItem } from './item.model.js';

export interface ListarItemsFiltros {
  busqueda?: string;
  tipo?: TipoItem;
}

export interface ItemRepository {
  findAll(filtros: ListarItemsFiltros): Promise<Item[]>;
  findById(id: string): Promise<Item | null>;
  // Lo usará asistencias para validar la selección del cliente y calcular descuentos.
  findByIds(ids: string[]): Promise<Item[]>;
}
