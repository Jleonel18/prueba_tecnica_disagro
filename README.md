# Disagro — Feria de Promociones

Plataforma para que los clientes de Disagro confirmen su asistencia al evento anual de promociones y seleccionen los servicios y productos que les interesan. Con esa selección la empresa prepara un portafolio de promociones personalizado y otorga un porcentaje de descuento según las reglas del evento.

Stack: **Node.js - TypeScript - React - PostgreSQL**.

## Estructura del repositorio

| Carpeta | Descripción |
|---|---|
| [`backend/`](backend/) | API REST en Express + TypeScript. Catálogo, registro de clientes, sesión con JWT, confirmación de asistencia y cálculo de descuentos. |
| `frontend/` | Aplicación React con el formulario de confirmación. *(en desarrollo)* |
| [`Prueba_Tecnica Disagro.pdf`](Prueba_Tecnica%20Disagro.pdf) | Enunciado original de la prueba. |

## Reglas de descuento

| Tipo | Condición | Descuento |
|---|---|---|
| Servicios | 2 o más | 3 % |
| Servicios | 2 o más y suma > Q 1,500 | 5 % |
| Productos | 3 o más | 3 % |
| Productos | 5 o más | 5 % |

El descuento se calcula por separado para servicios y productos y se muestra al cliente mientras selecciona, antes de confirmar.

## Backend

La arquitectura, los endpoints y las instrucciones para levantar la API están documentados en [`backend/README.md`](backend/README.md).
