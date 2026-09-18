import type { Request, Response } from 'express';
import type { ItemsService } from '../application/items.service.js';
import { parseItemId, parseListarItems } from './items.schema.js';

export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  listar = async (req: Request, res: Response): Promise<void> => {
    const filtros = parseListarItems(req.query);
    const items = await this.itemsService.listar(filtros);
    res.json(items);
  };

  obtenerPorId = async (req: Request, res: Response): Promise<void> => {
    const id = parseItemId(req.params['id']);
    const item = await this.itemsService.obtenerPorId(id);
    res.json(item);
  };
}
