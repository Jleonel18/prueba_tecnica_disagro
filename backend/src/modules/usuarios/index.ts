import { UsuariosService } from './application/usuarios.service.js';
import { UsuarioRepositoryPg } from './infrastructure/usuario.repository.pg.js';
import { UsuariosController } from './http/usuarios.controller.js';
import { crearUsuariosRouter } from './http/usuarios.routes.js';

// Composition root del módulo: el único archivo que conoce las cuatro capas
// a la vez. Cambiar de motor de base de datos = cambiar solo esta línea.
const usuarioRepository = new UsuarioRepositoryPg();
const usuariosService = new UsuariosService(usuarioRepository);
const usuariosController = new UsuariosController(usuariosService);

export const usuariosRouter = crearUsuariosRouter(usuariosController);
