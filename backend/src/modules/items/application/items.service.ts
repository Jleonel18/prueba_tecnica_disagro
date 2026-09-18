import { NotFoundError } from '#shared/http/errors.js';
import type { Item } from '../domain/item.model.js';
import type { ItemRepository, ListarItemsFiltros } from '../domain/item.repository.js';

export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async listar(filtros: ListarItemsFiltros): Promise<Item[]> {
    return this.itemRepository.findAll(filtros);
  }

  async obtenerPorId(id: string): Promise<Item> {
    const item = await this.itemRepository.findById(id);
    if (!item) {
      throw new NotFoundError('Item no encontrado');
    }
    return item;
  }
}
