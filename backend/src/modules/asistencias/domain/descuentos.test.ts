import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { Item, TipoItem } from '#modules/items/domain/item.model.js';
import { calcularDescuentos } from './descuentos.js';

let contador = 0;

function item(tipo: TipoItem, precio: number): Item {
  contador += 1;
  const fecha = new Date('2026-01-01T00:00:00Z');
  return {
    id: `00000000-0000-0000-0000-${String(contador).padStart(12, '0')}`,
    nombre: `${tipo} ${contador}`,
    tipo,
    precio,
    createdAt: fecha,
    updatedAt: fecha,
  };
}

const servicio = (precio: number): Item => item('servicio', precio);
const producto = (precio: number): Item => item('producto', precio);

describe('calcularDescuentos - servicios', () => {
  it('sin servicios no aplica descuento', () => {
    const { servicios } = calcularDescuentos([]);
    assert.deepEqual(servicios, { cantidad: 0, subtotal: 0, porcentaje: 0, descuento: 0, total: 0 });
  });

  it('con 1 servicio no aplica descuento aunque supere Q1500', () => {
    const { servicios } = calcularDescuentos([servicio(2000)]);
    assert.equal(servicios.porcentaje, 0);
    assert.equal(servicios.descuento, 0);
    assert.equal(servicios.total, 2000);
  });

  it('con 2 servicios y suma <= Q1500 aplica 3%', () => {
    const { servicios } = calcularDescuentos([servicio(700), servicio(800)]);
    assert.equal(servicios.cantidad, 2);
    assert.equal(servicios.subtotal, 1500);
    assert.equal(servicios.porcentaje, 3);
    assert.equal(servicios.descuento, 45);
    assert.equal(servicios.total, 1455);
  });

  it('con 2 servicios y suma > Q1500 aplica 5%', () => {
    const { servicios } = calcularDescuentos([servicio(850), servicio(900)]);
    assert.equal(servicios.subtotal, 1750);
    assert.equal(servicios.porcentaje, 5);
    assert.equal(servicios.descuento, 87.5);
    assert.equal(servicios.total, 1662.5);
  });

  it('con 3+ servicios baratos sigue siendo 3%', () => {
    const { servicios } = calcularDescuentos([servicio(100), servicio(100), servicio(100)]);
    assert.equal(servicios.porcentaje, 3);
  });
});

describe('calcularDescuentos - productos', () => {
  it('con 2 productos no aplica descuento', () => {
    const { productos } = calcularDescuentos([producto(500), producto(500)]);
    assert.equal(productos.porcentaje, 0);
    assert.equal(productos.total, 1000);
  });

  it('con 3 productos aplica 3%', () => {
    const { productos } = calcularDescuentos([producto(100), producto(100), producto(100)]);
    assert.equal(productos.cantidad, 3);
    assert.equal(productos.porcentaje, 3);
    assert.equal(productos.descuento, 9);
    assert.equal(productos.total, 291);
  });

  it('con 4 productos sigue en 3%', () => {
    const { productos } = calcularDescuentos([
      producto(10),
      producto(10),
      producto(10),
      producto(10),
    ]);
    assert.equal(productos.porcentaje, 3);
  });

  it('con 5 productos aplica 5% sin importar el precio', () => {
    const { productos } = calcularDescuentos([
      producto(1),
      producto(1),
      producto(1),
      producto(1),
      producto(1),
    ]);
    assert.equal(productos.porcentaje, 5);
    assert.equal(productos.subtotal, 5);
    assert.equal(productos.descuento, 0.25);
    assert.equal(productos.total, 4.75);
  });
});

describe('calcularDescuentos - mezcla y totales', () => {
  it('calcula cada tipo por separado y suma los totales', () => {
    const resumen = calcularDescuentos([
      servicio(850),
      servicio(900),
      producto(100),
      producto(100),
      producto(100),
    ]);

    assert.equal(resumen.servicios.porcentaje, 5);
    assert.equal(resumen.productos.porcentaje, 3);
    assert.equal(resumen.subtotal, 2050);
    assert.equal(resumen.descuentoTotal, 96.5);
    assert.equal(resumen.total, 1953.5);
  });

  it('los productos no cuentan para el umbral de servicios', () => {
    const resumen = calcularDescuentos([servicio(1000), producto(1000)]);
    assert.equal(resumen.servicios.porcentaje, 0);
    assert.equal(resumen.productos.porcentaje, 0);
    assert.equal(resumen.descuentoTotal, 0);
  });

  it('redondea a dos decimales', () => {
    const resumen = calcularDescuentos([servicio(50.3), servicio(49.99)]);
    assert.equal(resumen.servicios.subtotal, 100.29);
    assert.equal(resumen.servicios.descuento, 3.01);
    assert.equal(resumen.servicios.total, 97.28);
  });
});
