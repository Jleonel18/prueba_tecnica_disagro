import type { DescuentoPorTipo, ResumenDescuentos } from '../types/asistencia';

const precioFormatter = new Intl.NumberFormat('es-GT', {
  style: 'currency',
  currency: 'GTQ',
});

interface ResumenPorTipoProps {
  titulo: string;
  resumen: DescuentoPorTipo;
}

function ResumenPorTipo({ titulo, resumen }: ResumenPorTipoProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{titulo}</p>
      <p className="mt-1 text-sm text-gray-700">{resumen.cantidad} seleccionados</p>
      <p className="text-sm text-gray-700">Descuento: {resumen.porcentaje}%</p>
      <p className="mt-1 font-semibold text-gray-800">{precioFormatter.format(resumen.total)}</p>
    </div>
  );
}

interface CotizacionResumenProps {
  descuentos: ResumenDescuentos | null;
}

export function CotizacionResumen({ descuentos }: CotizacionResumenProps) {
  if (!descuentos) {
    return (
      <div className="rounded-xl border border-dashed border-brand-300 bg-white p-6 text-center text-sm text-gray-500">
        Selecciona productos o servicios para ver el descuento aplicado.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-brand-300 bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-brand-700">Descuento aplicado</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ResumenPorTipo titulo="Servicios" resumen={descuentos.servicios} />
        <ResumenPorTipo titulo="Productos" resumen={descuentos.productos} />
        <div className="rounded-lg bg-brand-100 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Total</p>
          <p className="mt-1 text-sm text-gray-700">
            Subtotal: {precioFormatter.format(descuentos.subtotal)}
          </p>
          <p className="text-sm text-gray-700">
            Descuento: -{precioFormatter.format(descuentos.descuentoTotal)}
          </p>
          <p className="mt-1 text-lg font-bold text-brand-700">
            {precioFormatter.format(descuentos.total)}
          </p>
        </div>
      </div>
    </div>
  );
}
