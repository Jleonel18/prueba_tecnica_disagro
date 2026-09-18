import { useEffect, useState } from 'react';
import { ApiError } from '../../../shared/api/httpClient';
import { listarItems } from '../api/items.api';
import type { Item, ListarItemsFiltros } from '../types/item';

export function useItems(filtros: ListarItemsFiltros = {}) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;

    setLoading(true);
    setError(null);

    listarItems(filtros)
      .then((datos) => {
        if (!cancelado) setItems(datos);
      })
      .catch((err) => {
        if (!cancelado) {
          setError(err instanceof ApiError ? err.message : 'No se pudieron cargar los productos y servicios');
        }
      })
      .finally(() => {
        if (!cancelado) setLoading(false);
      });

    return () => {
      cancelado = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros.q, filtros.tipo]);

  return { items, loading, error };
}
