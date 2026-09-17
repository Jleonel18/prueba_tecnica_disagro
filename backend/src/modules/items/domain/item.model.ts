import type { TipoItem } from '#db/types.js';


export type { TipoItem };

export interface Item {
  id: string;
  nombre: string;
  tipo: TipoItem;
  precio: number;
  createdAt: Date;
  updatedAt: Date;
}
