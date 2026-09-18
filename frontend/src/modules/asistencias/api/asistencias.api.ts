import { apiFetch } from '../../../shared/api/httpClient';
import type { AsistenciaDetalle, ConfirmarAsistenciaInput, Cotizacion } from '../types/asistencia';

export function cotizarAsistencia(itemIds: string[]): Promise<Cotizacion> {
  return apiFetch<Cotizacion>('/asistencias/cotizar', {
    method: 'POST',
    body: { itemIds },
  });
}

export function obtenerMiAsistencia(token: string): Promise<AsistenciaDetalle> {
  return apiFetch<AsistenciaDetalle>('/asistencias/me', { token });
}

export function confirmarAsistencia(
  datos: ConfirmarAsistenciaInput,
  token: string,
): Promise<AsistenciaDetalle> {
  return apiFetch<AsistenciaDetalle>('/asistencias', {
    method: 'POST',
    body: datos,
    token,
  });
}
