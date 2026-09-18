import { UsuarioRepositoryPg } from '#modules/usuarios/infrastructure/usuario.repository.pg.js';
import { AuthService } from './application/auth.service.js';
import { AuthController } from './http/auth.controller.js';
import { crearAuthRouter } from './http/auth.routes.js';

const usuarioRepository = new UsuarioRepositoryPg();
const authService = new AuthService(usuarioRepository);
const authController = new AuthController(authService);

export const authRouter = crearAuthRouter(authController);
