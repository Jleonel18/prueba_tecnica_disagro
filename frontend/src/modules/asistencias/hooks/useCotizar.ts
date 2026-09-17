import { useEffect, useState } from 'react';
import { ApiError } from '../../../shared/api/httpClient';
import { cotizarAsistencia } from '../api/asistencias.api';
import type { Cotizacion } from '../types/asistencia';

export function useCotizar(itemIds: string[]) {
  const [cotizacion, setCotizacion] = useState<Cotizacion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clave = itemIds.join(',');

  useEffect(() => {
    if (itemIds.length === 0) {
      setCotizacion(null);
      setError(null);
      return;
    }

    let cancelado = false;
    setLoading(true);
    setError(null);

    cotizarAsistencia(itemIds)
      .then((datos) => {
        if (!cancelado) setCotizacion(datos);
      })
      .catch((err) => {
        if (!cancelado) {
          setError(err instanceof ApiError ? err.message : 'No se pudo calcular la cotización');
        }
      })
      .finally(() => {
        if (!cancelado) setLoading(false);
      });

    return () => {
      cancelado = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clave]);

  return { cotizacion, loading, error };
}
