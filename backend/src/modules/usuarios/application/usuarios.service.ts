import { hashPassword } from '#shared/crypto/password.js';
import { ConflictError, NotFoundError } from '#shared/http/errors.js';
import type { Usuario } from '../domain/usuario.model.js';
import type { UsuarioRepository } from '../domain/usuario.repository.js';
import { EmailYaRegistradoError } from '../domain/usuario.errors.js';

export class UsuariosService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async registrar(datos: {
    nombre: string;
    apellidos: string;
    email: string;
    password: string;
  }): Promise<Usuario> {
    const passwordHash = await hashPassword(datos.password);

    try {
      return await this.usuarioRepository.create({
        nombre: datos.nombre,
        apellidos: datos.apellidos,
        email: datos.email,
        passwordHash,
      });
    } catch (error) {
      if (error instanceof EmailYaRegistradoError) {
        throw new ConflictError(error.message);
      }
      throw error;
    }
  }

  async obtenerPorId(id: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findById(id);
    if (!usuario) {
      throw new NotFoundError('Usuario no encontrado');
    }
    return usuario;
  }
}
