import type { Item } from '../../items/types/item';

const precioFormatter = new Intl.NumberFormat('es-GT', {
  style: 'currency',
  currency: 'GTQ',
});

const tipoBadgeClass: Record<Item['tipo'], string> = {
  servicio: 'bg-brand-100 text-brand-700',
  producto: 'bg-brand-accent/20 text-brand-accent',
};

interface ItemsSeleccionablesTableProps {
  items: Item[];
  seleccionados: string[];
  onToggle: (id: string) => void;
  disabled: boolean;
  loading: boolean;
  error: string | null;
}

export function ItemsSeleccionablesTable({
  items,
  seleccionados,
  onToggle,
  disabled,
  loading,
  error,
}: ItemsSeleccionablesTableProps) {
  return (
    <div className="h-full rounded-xl border border-brand-300 bg-white shadow-md">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-brand-700">Servicios y productos</h2>
        <p className="text-sm text-gray-500">Elige qué quieres aplicar a tu asistencia.</p>
      </div>

      {loading && <p className="px-6 py-4 text-sm text-gray-600">Cargando items…</p>}
      {error && <p className="px-6 py-4 text-sm text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto p-3">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-600">
              <tr>
                <th className="w-12 p-3"></th>
                <th className="p-3 text-left">Item</th>
                <th className="p-3 text-left">Tipo</th>
                <th className="p-3 text-right">Precio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr
                  key={item.id}
                  className={seleccionados.includes(item.id) ? 'bg-brand-100/40' : undefined}
                >
                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={seleccionados.includes(item.id)}
                      onChange={() => onToggle(item.id)}
                      disabled={disabled}
                      className="accent-brand-500 disabled:opacity-50"
                    />
                  </td>
                  <td className="p-3 font-medium text-gray-800">{item.nombre}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${tipoBadgeClass[item.tipo]}`}
                    >
                      {item.tipo}
                    </span>
                  </td>
                  <td className="p-3 text-right text-gray-700">
                    {precioFormatter.format(item.precio)}
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-sm text-gray-500">
                    No hay items disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
