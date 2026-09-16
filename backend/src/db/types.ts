export type TipoItem = 'servicio' | 'producto';

export interface UsuarioRow {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

export interface ItemCatalogoRow {
  id: string;
  nombre: string;
  tipo: TipoItem;
  precio: string; // numeric llega como string desde pg, no como number.
  created_at: Date;
  updated_at: Date;
}

export interface AsistenciaRow {
  id: string;
  usuario_id: string;
  fecha_hora_asistencia: Date;
  created_at: Date;
  updated_at: Date;
}

export interface AsistenciaItemRow {
  id: string;
  asistencia_id: string;
  item_id: string;
  created_at: Date;
  updated_at: Date;
}
