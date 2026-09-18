export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTRO: '/registro',
  ITEMS: '/items',
  ASISTENCIAS: '/asistencias',
  NOT_FOUND: '*',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
