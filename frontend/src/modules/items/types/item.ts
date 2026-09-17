export type TipoItem = 'servicio' | 'producto';

export interface Item {
  id: string;
  nombre: string;
  tipo: TipoItem;
  precio: number;
  createdAt: string;
  updatedAt: string;
}

export interface ListarItemsFiltros {
  q?: string;
  tipo?: TipoItem;
}
