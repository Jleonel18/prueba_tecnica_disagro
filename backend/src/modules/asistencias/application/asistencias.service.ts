import { BadRequestError, ConflictError, NotFoundError } from '#shared/http/errors.js';
import type { ItemRepository } from '#modules/items/domain/item.repository.js';
import type { AsistenciaDetalle } from '../domain/asistencia.model.js';
import type { AsistenciaRepository } from '../domain/asistencia.repository.js';
import { AsistenciaYaConfirmadaError } from '../domain/asistencia.errors.js';
import { calcularDescuentos } from '../domain/descuentos.js';

export class AsistenciasService {
  constructor(
    private readonly asistenciaRepository: AsistenciaRepository,
    private readonly itemRepository: ItemRepository,
  ) {}

  async confirmar(
    usuarioId: string,
    datos: { fechaHoraAsistencia: Date; itemIds: string[] },
  ): Promise<AsistenciaDetalle> {
    const items = await this.itemRepository.findByIds(datos.itemIds);
    if (items.length !== datos.itemIds.length) {
      throw new BadRequestError('Uno o más items no existen');
    }

    try {
      const asistencia = await this.asistenciaRepository.create({
        usuarioId,
        fechaHoraAsistencia: datos.fechaHoraAsistencia,
        itemIds: datos.itemIds,
      });
      return { ...asistencia, items, descuentos: calcularDescuentos(items) };
    } catch (error) {
      if (error instanceof AsistenciaYaConfirmadaError) {
        throw new ConflictError('Ya confirmaste tu asistencia');
      }
      throw error;
    }
  }

  async obtenerDeUsuario(usuarioId: string): Promise<AsistenciaDetalle> {
    const asistencia = await this.asistenciaRepository.findByUsuarioId(usuarioId);
    if (!asistencia) {
      throw new NotFoundError('Aún no has confirmado tu asistencia');
    }

    const itemIds = await this.asistenciaRepository.findItemIdsByAsistenciaId(asistencia.id);
    const items = await this.itemRepository.findByIds(itemIds);
    return { ...asistencia, items, descuentos: calcularDescuentos(items) };
  }
}
