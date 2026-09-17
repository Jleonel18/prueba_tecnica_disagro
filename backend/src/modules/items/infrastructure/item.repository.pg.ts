import { query } from '#db/pool.js';
import type { ItemCatalogoRow } from '#db/types.js';
import type { Item } from '../domain/item.model.js';
import type { ItemRepository, ListarItemsFiltros } from '../domain/item.repository.js';

function mapRow(row: ItemCatalogoRow): Item {
  return {
    id: row.id,
    nombre: row.nombre,
    tipo: row.tipo,
    // numeric(10,2) llega como string desde pg; dos decimales caben sin
    // pérdida en un number.
    precio: Number(row.precio),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export class ItemRepositoryPg implements ItemRepository {
  async findAll(filtros: ListarItemsFiltros): Promise<Item[]> {
    const condiciones: string[] = [];
    const params: unknown[] = [];

    if (filtros.busqueda) {
      params.push(`%${filtros.busqueda}%`);
      condiciones.push(`nombre ILIKE $${params.length}`);
    }
    if (filtros.tipo) {
      params.push(filtros.tipo);
      condiciones.push(`tipo = $${params.length}`);
    }

    const where = condiciones.length > 0 ? `WHERE ${condiciones.join(' AND ')}` : '';
    const rows = await query<ItemCatalogoRow>(
      `SELECT * FROM items_catalogo ${where} ORDER BY tipo, nombre`,
      params,
    );
    return rows.map(mapRow);
  }

  async findById(id: string): Promise<Item | null> {
    const rows = await query<ItemCatalogoRow>(
      'SELECT * FROM items_catalogo WHERE id = $1',
      [id],
    );
    const row = rows[0];
    return row ? mapRow(row) : null;
  }

  async findByIds(ids: string[]): Promise<Item[]> {
    if (ids.length === 0) {
      return [];
    }
    const rows = await query<ItemCatalogoRow>(
      'SELECT * FROM items_catalogo WHERE id = ANY($1::uuid[])',
      [ids],
    );
    return rows.map(mapRow);
  }
}
