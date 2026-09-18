interface AsistenciaResumenFormProps {
  fecha: string;
  onFechaChange: (value: string) => void;
  fechaMinima: string;
  yaConfirmada: boolean;
  cargando: boolean;
  confirmando: boolean;
  seleccionCount: number;
  error: string | null;
}

export function AsistenciaResumenForm({
  fecha,
  onFechaChange,
  fechaMinima,
  yaConfirmada,
  cargando,
  confirmando,
  seleccionCount,
  error,
}: AsistenciaResumenFormProps) {
  return (
    <div className="h-full rounded-xl border border-brand-300 bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-brand-700">Tu asistencia</h2>

      {yaConfirmada && (
        <p className="mb-6 rounded-lg bg-brand-100 px-3 py-2 text-sm text-brand-700">
          Ya confirmaste tu asistencia. No puedes volver a registrarla.
        </p>
      )}

      <label
        htmlFor="fecha"
        className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
      >
        Fecha y hora
      </label>
      <input
        id="fecha"
        type="datetime-local"
        value={fecha}
        onChange={(event) => onFechaChange(event.target.value)}
        min={fechaMinima}
        disabled={yaConfirmada}
        required
        className="mb-6 block w-full rounded-lg border border-gray-400 px-3 py-3 leading-tight text-gray-900 focus:border-brand-500 focus:outline-none disabled:bg-gray-100 disabled:text-gray-500"
      />

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={yaConfirmada || cargando || confirmando || seleccionCount === 0 || !fecha}
        className="block w-full rounded-lg bg-brand-500 px-3 py-3 font-bold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
      >
        {yaConfirmada
          ? 'Asistencia registrada'
          : confirmando
            ? 'Confirmando…'
            : 'Confirmar asistencia'}
      </button>
    </div>
  );
}
