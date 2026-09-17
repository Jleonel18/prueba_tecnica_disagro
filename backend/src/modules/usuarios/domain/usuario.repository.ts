import type { Usuario } from "./usuario.model.js";

export interface UsuarioRepository {
    findByEmail(email: string): Promise<Usuario | null>;
    findById(id: string): Promise<Usuario | null>;
    create(datos: {nombre: string; apellidos: string; email: string, passwordHash: string}): Promise<Usuario>;
    findCredencialesByEmail(email: string): Promise<{ usuario: Usuario; passwordHash: string } | null>;
}