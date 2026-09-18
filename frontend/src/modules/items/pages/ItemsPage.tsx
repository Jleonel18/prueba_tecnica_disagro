import { useState } from 'react';
import { SearchInput } from '../../../shared/components/SearchInput';
import { useDebouncedValue } from '../../../shared/hooks/useDebouncedValue';
import { ItemCard } from '../components/ItemCard';
import { useItems } from '../hooks/useItems';

export function ItemsPage() {
  const [busqueda, setBusqueda] = useState('');
  const busquedaDebounced = useDebouncedValue(busqueda);
  const { items, loading, error } = useItems({ q: busquedaDebounced || undefined });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Productos y servicios</h1>

      <div className="mb-6 max-w-sm">
        <SearchInput
          value={busqueda}
          onChange={setBusqueda}
          placeholder="Buscar productos y servicios"
        />
      </div>

      {loading && <p className="text-sm text-gray-600">Cargando productos y servicios…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
      {!loading && !error && items.length === 0 && (
        <p className="text-sm text-gray-600">No hay productos o servicios disponibles.</p>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
