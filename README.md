# Disagro — Feria de Promociones

Plataforma para que los clientes de Disagro confirmen su asistencia al evento anual de promociones y seleccionen los servicios y productos que les interesan. Con esa selección la empresa prepara un portafolio de promociones personalizado y otorga un porcentaje de descuento según las reglas del evento.

Stack: **Node.js - TypeScript - React - PostgreSQL**.

## Demo en vivo

| Servicio | URL |
|---|---|
| Frontend | https://prueba-tecnica-disagro-frontend-latest.onrender.com |
| Backend (API) | https://prueba-tecnica-disagro-backend-latest.onrender.com/api |

Desplegados en Render (plan free) desde las imágenes que publica el pipeline de CI/CD en GitHub Container Registry. Al no tener tráfico constante, la primera petición tras un rato de inactividad puede tardar 30–60 s en responder mientras la instancia despierta.

## Estructura del repositorio

| Carpeta / archivo | Descripción |
|---|---|
| [`backend/`](backend/) | API REST en Express + TypeScript. Catálogo, registro de clientes, sesión con JWT, confirmación de asistencia y cálculo de descuentos. |
| [`frontend/`](frontend/) | SPA en React + TypeScript + Vite con el formulario de confirmación. |
| [`docker-compose.yml`](docker-compose.yml) | Levanta backend + frontend juntos en local con un solo comando. |
| [`.github/workflows/`](.github/workflows/) | Pipelines de CI/CD (ver abajo). |
| [`Prueba_Tecnica Disagro.pdf`](Prueba_Tecnica%20Disagro.pdf) | Enunciado original de la prueba. |

Cada carpeta de servicio tiene su propio README con la arquitectura interna, los endpoints/rutas y cómo correrlo: [`backend/README.md`](backend/README.md) y [`frontend/README.md`](frontend/README.md).

## Reglas de descuento

| Tipo | Condición | Descuento |
|---|---|---|
| Servicios | 2 o más | 3 % |
| Servicios | 2 o más y suma > Q 1,500 | 5 % |
| Productos | 3 o más | 3 % |
| Productos | 5 o más | 5 % |

El descuento se calcula por separado para servicios y productos y se muestra al cliente mientras selecciona, antes de confirmar.

## Docker

Cada servicio tiene su propio `Dockerfile` multi-stage (imagen final sin herramientas de build) y `.dockerignore` (excluye `.env`, `node_modules`, `dist`). Para levantar todo en local:

```bash
docker compose up --build
```

Esto construye backend (`node:22-alpine`, expone `3000`) y frontend (build con Vite servido por `nginx:alpine`, expone `80`→`8081`). El backend lee sus variables de `backend/.env` (no versionado); el frontend recibe `VITE_API_URL` como build arg. Ver el detalle en el README de cada carpeta.

## CI/CD

Dos workflows de GitHub Actions:

- **[`develop.yml`](.github/workflows/develop.yml)** — en cada push/PR a `develop`: corre los tests unitarios del backend.
- **[`main.yml`](.github/workflows/main.yml)** — en cada push a `main`:
  1. Corre los tests del backend (si fallan, no continúa).
  2. Construye y publica las imágenes de backend y frontend en GitHub Container Registry, etiquetadas con el **SHA del commit** y `latest`:
     `ghcr.io/jleonel18/prueba_tecnica_disagro-{backend,frontend}:<sha>`
  3. Dispara el deploy en Render de esa misma imagen por SHA (deploy hooks con el parámetro `imgURL`), así el ambiente productivo siempre corre exactamente el commit que pasó los tests.
