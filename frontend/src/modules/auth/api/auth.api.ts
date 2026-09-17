import { apiFetch } from '../../../shared/api/httpClient';
import type { RegistrarUsuarioInput, RegistrarUsuarioResponse } from '../types/usuario';

export function registrarUsuario(datos: RegistrarUsuarioInput): Promise<RegistrarUsuarioResponse> {
  return apiFetch<RegistrarUsuarioResponse>('/usuarios', {
    method: 'POST',
    body: datos,
  });
}
