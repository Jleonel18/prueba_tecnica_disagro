import { ItemRepositoryPg } from '#modules/items/infrastructure/item.repository.pg.js';
import { AsistenciasService } from './application/asistencias.service.js';
import { AsistenciaRepositoryPg } from './infrastructure/asistencia.repository.pg.js';
import { AsistenciasController } from './http/asistencias.controller.js';
import { crearAsistenciasRouter } from './http/asistencias.routes.js';

const asistenciaRepository = new AsistenciaRepositoryPg();
const itemRepository = new ItemRepositoryPg();
const asistenciasService = new AsistenciasService(asistenciaRepository, itemRepository);
const asistenciasController = new AsistenciasController(asistenciasService);

export const asistenciasRouter = crearAsistenciasRouter(asistenciasController);
