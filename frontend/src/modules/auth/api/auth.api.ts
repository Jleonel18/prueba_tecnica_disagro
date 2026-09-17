import { apiFetch } from '../../../shared/api/httpClient';
import type {
  LoginInput,
  LoginResponse,
  RegistrarUsuarioInput,
  RegistrarUsuarioResponse,
} from '../types/usuario';

export function registrarUsuario(datos: RegistrarUsuarioInput): Promise<RegistrarUsuarioResponse> {
  return apiFetch<RegistrarUsuarioResponse>('/usuarios', {
    method: 'POST',
    body: datos,
  });
}

export function loginUsuario(credenciales: LoginInput): Promise<LoginResponse> {
  return apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: credenciales,
  });
}
