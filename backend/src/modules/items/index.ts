import { ItemsService } from './application/items.service.js';
import { ItemRepositoryPg } from './infrastructure/item.repository.pg.js';
import { ItemsController } from './http/items.controller.js';
import { crearItemsRouter } from './http/items.routes.js';

// Composition root del módulo: el único archivo que conoce las cuatro capas
// a la vez.
const itemRepository = new ItemRepositoryPg();
const itemsService = new ItemsService(itemRepository);
const itemsController = new ItemsController(itemsService);

export const itemsRouter = crearItemsRouter(itemsController);
