import { type SubmitEvent as ReactSubmitEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes';
import { useAuth } from '../../../shared/auth/useAuth';
import { useItems } from '../../items/hooks/useItems';
import { AsistenciaResumenForm } from '../components/AsistenciaResumenForm';
import { CotizacionResumen } from '../components/CotizacionResumen';
import { ItemsSeleccionablesTable } from '../components/ItemsSeleccionablesTable';
import { useConfirmarAsistencia } from '../hooks/useConfirmarAsistencia';
import { useCotizar } from '../hooks/useCotizar';
import { useMiAsistencia } from '../hooks/useMiAsistencia';
import { toDatetimeLocalValue } from '../utils/datetimeLocal';

function fechaMinima(): string {
  return toDatetimeLocalValue(new Date(Date.now() + 60 * 60 * 1000));
}

export function AsistenciasPage() {
  const { isAuthenticated } = useAuth();
  const { asistencia, loading: cargandoAsistencia, error: errorAsistencia, recargar } = useMiAsistencia();
  const { items, loading: cargandoItems, error: errorItems } = useItems();
  const { confirmar, loading: confirmando, error: errorConfirmar } = useConfirmarAsistencia();

  const [fechaBorrador, setFechaBorrador] = useState('');
  const [seleccionadosBorrador, setSeleccionadosBorrador] = useState<string[]>([]);

  const yaConfirmada = asistencia !== null;

  // Si ya existe una asistencia confirmada, el form solo refleja esos datos:
  // no hace falta un efecto que los copie a estado, se derivan en el render.
  const fecha = asistencia
    ? toDatetimeLocalValue(new Date(asistencia.fechaHoraAsistencia))
    : fechaBorrador;
  const seleccionados = asistencia ? asistencia.items.map((item) => item.id) : seleccionadosBorrador;

  const { cotizacion: cotizacionEnVivo } = useCotizar(yaConfirmada ? [] : seleccionados);
  const descuentos = asistencia ? asistencia.descuentos : (cotizacionEnVivo?.descuentos ?? null);

  function toggleItem(id: string) {
    if (yaConfirmada) return;
    setSeleccionadosBorrador((actuales) =>
      actuales.includes(id) ? actuales.filter((itemId) => itemId !== id) : [...actuales, id],
    );
  }

  async function handleSubmit(event: ReactSubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (yaConfirmada) return;
    const creada = await confirmar({
      fechaHoraAsistencia: new Date(fecha).toISOString(),
      itemIds: seleccionados,
    });
    if (creada) recargar();
  }

  if (!isAuthenticated) {
    return (
      <div>
        <h1 className="mb-4 text-2xl font-bold text-gray-800">Asistencias</h1>
        <Link to={ROUTES.LOGIN} className="text-brand-500 underline hover:text-brand-700">
          Inicia sesión para registrar tu asistencia
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Asistencias</h1>

      {errorAsistencia && <p className="mb-4 text-sm text-red-600">{errorAsistencia}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 lg:flex-row">
        <div className="w-full lg:w-1/3">
          <AsistenciaResumenForm
            fecha={fecha}
            onFechaChange={setFechaBorrador}
            fechaMinima={fechaMinima()}
            yaConfirmada={yaConfirmada}
            cargando={cargandoAsistencia}
            confirmando={confirmando}
            seleccionCount={seleccionados.length}
            error={errorConfirmar}
          />
        </div>

        <div className="w-full lg:w-2/3">
          <ItemsSeleccionablesTable
            items={items}
            seleccionados={seleccionados}
            onToggle={toggleItem}
            disabled={yaConfirmada}
            loading={cargandoItems}
            error={errorItems}
          />
        </div>
      </form>

      <div className="mt-6">
        <CotizacionResumen descuentos={descuentos} />
      </div>
    </div>
  );
}
