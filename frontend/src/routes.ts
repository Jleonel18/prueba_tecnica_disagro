export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTRO: '/registro',
  ITEMS: '/items',
  ITEM_DETALLE: '/items/:id',
  ASISTENCIAS: '/asistencias',
  NOT_FOUND: '*',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];

export const buildRoute = {
  itemDetalle: (id: number | string) => `/items/${id}`,
};
