import type { Item } from '#modules/items/domain/item.model.js';

export interface DescuentoPorTipo {
  cantidad: number;
  subtotal: number;
  porcentaje: number;
  descuento: number;
  total: number;
}

export interface ResumenDescuentos {
  servicios: DescuentoPorTipo;
  productos: DescuentoPorTipo;
  subtotal: number;
  descuentoTotal: number;
  total: number;
}

const PORCENTAJE_BAJO = 3;
const PORCENTAJE_ALTO = 5;
const MIN_SERVICIOS = 2;
const UMBRAL_SERVICIOS_ALTO = 1500;
const MIN_PRODUCTOS_BAJO = 3;
const MIN_PRODUCTOS_ALTO = 5;

function redondear(valor: number): number {
  return Math.round(valor * 100) / 100;
}

function porcentajeServicios(cantidad: number, subtotal: number): number {
  if (cantidad < MIN_SERVICIOS) {
    return 0;
  }
  return subtotal > UMBRAL_SERVICIOS_ALTO ? PORCENTAJE_ALTO : PORCENTAJE_BAJO;
}

function porcentajeProductos(cantidad: number): number {
  if (cantidad >= MIN_PRODUCTOS_ALTO) {
    return PORCENTAJE_ALTO;
  }
  return cantidad >= MIN_PRODUCTOS_BAJO ? PORCENTAJE_BAJO : 0;
}

function resumirTipo(
  items: Item[],
  calcularPorcentaje: (cantidad: number, subtotal: number) => number,
): DescuentoPorTipo {
  const cantidad = items.length;
  const subtotal = redondear(items.reduce((suma, item) => suma + item.precio, 0));
  const porcentaje = calcularPorcentaje(cantidad, subtotal);
  const descuento = redondear((subtotal * porcentaje) / 100);
  return { cantidad, subtotal, porcentaje, descuento, total: redondear(subtotal - descuento) };
}

export function calcularDescuentos(items: Item[]): ResumenDescuentos {
  const servicios = resumirTipo(
    items.filter((item) => item.tipo === 'servicio'),
    porcentajeServicios,
  );
  const productos = resumirTipo(
    items.filter((item) => item.tipo === 'producto'),
    porcentajeProductos,
  );

  return {
    servicios,
    productos,
    subtotal: redondear(servicios.subtotal + productos.subtotal),
    descuentoTotal: redondear(servicios.descuento + productos.descuento),
    total: redondear(servicios.total + productos.total),
  };
}
