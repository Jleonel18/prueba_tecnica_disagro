export class AsistenciaYaConfirmadaError extends Error {
  constructor(public readonly usuarioId: string) {
    super(`El usuario ${usuarioId} ya confirmó su asistencia`);
    this.name = 'AsistenciaYaConfirmadaError';
  }
}
