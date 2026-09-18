import { verifyPassword } from '#shared/crypto/password.js';
import { firmarToken } from '#shared/crypto/jwt.js';
import { UnauthorizedError } from '#shared/http/errors.js';
import type { Usuario } from '#modules/usuarios/domain/usuario.model.js';
import type { UsuarioRepository } from '#modules/usuarios/domain/usuario.repository.js';
import type { SesionPayload } from '../domain/sesion.model.js';

export class AuthService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async login(credenciales: { email: string; password: string }): Promise<{
    token: string;
    usuario: Usuario;
  }> {
    const registro = await this.usuarioRepository.findCredencialesByEmail(
      credenciales.email,
    );

    if (!registro || !(await verifyPassword(credenciales.password, registro.passwordHash))) {
      throw new UnauthorizedError('Credenciales inválidas');
    }

    const token = firmarToken({ sub: registro.usuario.id, email: registro.usuario.email });
    return { token, usuario: registro.usuario };
  }

  async obtenerSesionActual(sesion: SesionPayload): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findById(sesion.sub);
    if (!usuario) {
      throw new UnauthorizedError();
    }
    return usuario;
  }
}
