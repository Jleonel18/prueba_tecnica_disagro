import type { Item } from '../types/item';

const precioFormatter = new Intl.NumberFormat('es-GT', {
  style: 'currency',
  currency: 'GTQ',
});

const tipoBadgeClass: Record<Item['tipo'], string> = {
  servicio: 'bg-brand-100 text-brand-700',
  producto: 'bg-brand-accent/20 text-brand-accent',
};

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="group flex w-full flex-col overflow-hidden rounded-xl bg-white shadow-xl transition-[border-radius] hover:rounded-2xl sm:flex-row">
      <img
        className="h-40 w-full object-cover sm:w-4/12"
        alt={item.nombre}
        loading="lazy"
        src={`https://picsum.photos/seed/${item.id}/400/300`}
      />
      <div className="flex flex-1 flex-col justify-between gap-4 p-5">
        <div className="space-y-2">
          <span
            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${tipoBadgeClass[item.tipo]}`}
          >
            {item.tipo}
          </span>
          <h4 className="text-md font-semibold text-gray-800">{item.nombre}</h4>
        </div>

        <span className="text-lg font-semibold text-brand-700">
          {precioFormatter.format(item.precio)}
        </span>
      </div>
    </div>
  );
}
