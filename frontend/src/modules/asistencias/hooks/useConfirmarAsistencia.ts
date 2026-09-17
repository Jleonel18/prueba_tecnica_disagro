import { useState } from 'react';
import { ApiError } from '../../../shared/api/httpClient';
import { useAuth } from '../../../shared/auth/useAuth';
import { confirmarAsistencia } from '../api/asistencias.api';
import type { AsistenciaDetalle, ConfirmarAsistenciaInput } from '../types/asistencia';

export function useConfirmarAsistencia() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function confirmar(datos: ConfirmarAsistenciaInput): Promise<AsistenciaDetalle | null> {
    if (!token) {
      setError('Debes iniciar sesión para confirmar tu asistencia');
      return null;
    }

    setLoading(true);
    setError(null);
    try {
      return await confirmarAsistencia(datos, token);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo confirmar tu asistencia');
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { confirmar, loading, error };
}
