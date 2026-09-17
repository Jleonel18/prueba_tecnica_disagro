import { useEffect, useState } from 'react';
import { ApiError } from '../../../shared/api/httpClient';
import { useAuth } from '../../../shared/auth/useAuth';
import { obtenerMiAsistencia } from '../api/asistencias.api';
import type { AsistenciaDetalle } from '../types/asistencia';

export function useMiAsistencia() {
  const { token } = useAuth();
  const [asistencia, setAsistencia] = useState<AsistenciaDetalle | null>(null);
  const [loading, setLoading] = useState(token !== null);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!token) return;

    let cancelado = false;
    // oxlint-disable-next-line react/set-state-in-effect -- fetch legítimo disparado por cambios de sesión/recarga
    setLoading(true);
    setError(null);

    obtenerMiAsistencia(token)
      .then((datos) => {
        if (!cancelado) setAsistencia(datos);
      })
      .catch((err) => {
        if (cancelado) return;
        // 404 significa "aún no has confirmado", no es un error para el usuario.
        if (err instanceof ApiError && err.status === 404) {
          setAsistencia(null);
          return;
        }
        setError(err instanceof ApiError ? err.message : 'No se pudo cargar tu asistencia');
      })
      .finally(() => {
        if (!cancelado) setLoading(false);
      });

    return () => {
      cancelado = true;
    };
  }, [token, version]);

  // Sin sesión no hay nada que cargar: se deriva en vez de sincronizarlo en un efecto.
  return {
    asistencia: token ? asistencia : null,
    loading: token ? loading : false,
    error,
    recargar: () => setVersion((v) => v + 1),
  };
}
