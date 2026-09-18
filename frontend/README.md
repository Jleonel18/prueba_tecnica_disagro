# Frontend

Frontend de la plataforma. React 19 + TypeScript + React Router sobre Vite, estilos con Tailwind CSS v4.

**Demo en vivo:** https://prueba-tecnica-disagro-frontend-latest.onrender.com
(consume el backend en https://prueba-tecnica-disagro-backend-latest.onrender.com/api — instancia free de Render, puede tardar ~30-60 s en despertar tras un rato sin tráfico)

## Arquitectura

Igual que el backend, el código está organizado **por módulos de dominio** y dentro de cada uno **por capa**, para que agregar una feature no obligue a tocar carpetas ajenas y cada pieza se pueda razonar sola.

```
src/
├── main.tsx              punto de entrada, monta <App />
├── App.tsx                envuelve el router en AuthProvider
├── router.tsx             mapa de rutas → páginas
├── routes.ts               constantes de rutas (ROUTES.*)
├── config/env.ts          lectura de variables de entorno (VITE_*)
├── shared/
│   ├── api/               httpClient (fetch + Authorization) y authStorage (localStorage)
│   ├── auth/               AuthContext + AuthProvider + useAuth (sesión reactiva)
│   ├── components/        AppLayout, SearchInput, NotFoundPage
│   └── hooks/              useDebouncedValue
└── modules/
    ├── auth/                login, registro
    ├── items/               catálogo de productos y servicios
    └── asistencias/         confirmar asistencia, cotización y descuentos
```

### Capas de un módulo

```
modules/<modulo>/
├── types/        contratos que espejan la respuesta del backend
├── api/          funciones que llaman a apiFetch() contra /api/<recurso>
├── hooks/        estado + efectos: piden datos, exponen loading/error
├── components/   piezas de UI reutilizables dentro del módulo
└── pages/        se montan directo en router.tsx
```

| Capa | Responsabilidad | Depende de |
|---|---|---|
| **types** | Espejo TypeScript de lo que devuelve cada endpoint. No tiene lógica. | nada |
| **api** | Una función por endpoint (`listarItems`, `loginUsuario`…), siempre sobre `apiFetch`. | types, `shared/api/httpClient` |
| **hooks** | Un caso de uso de UI por hook (`useItems`, `useConfirmarAsistencia`…): dispara la llamada, guarda `loading`/`error`/dato, cancela si el componente se desmonta. | api |
| **components** | JSX puro con props tipadas, sin `fetch` directo. | hooks (vía props) |
| **pages** | Componen hooks + components para una ruta completa. | todo lo anterior |

La dependencia siempre apunta hacia adentro: `pages → components/hooks → api → types`. Ningún componente llama a `fetch` directamente; siempre pasa por `apiFetch` ([shared/api/httpClient.ts](src/shared/api/httpClient.ts)), que centraliza la URL base, el header `Authorization` y el mapeo de errores del backend a `ApiError`.

### Sesión

El backend es stateless (JWT); el frontend guarda el token en `localStorage` (clave `disagro_token`, ver [shared/api/authStorage.ts](src/shared/api/authStorage.ts)) y lo reexpone de forma reactiva con [`AuthContext`](src/shared/auth/AuthContext.ts) + [`AuthProvider`](src/shared/auth/AuthProvider.tsx): cualquier componente puede leer `isAuthenticated`/`token` con `useAuth()` y se re-renderiza al instante en login/logout, sin releer `localStorage` a mano.

Se descartaron las cookies de sesión a propósito: frontend y backend viven en subdominios distintos de `onrender.com`, que está en la Public Suffix List, así que el navegador los trata como sitios distintos y una cookie sería de terceros (Safari la bloquea por defecto). `localStorage` + `Authorization: Bearer` evita ese problema sin necesitar un proxy same-origin.

`useLogin`/`useRegistro` llaman a `POST /auth/login` y `POST /usuarios`, guardan el token vía `AuthProvider.login()` y navegan a `ROUTES.HOME`. `AppLayout` cambia el link "Login" por "Cerrar sesión" según `isAuthenticated`.

## Rutas

| Ruta | Página | Layout | Notas |
|---|---|---|---|
| `/` | — | `AppLayout` | Redirige a `/items` |
| `/login` | `LoginPage` | propio (pantalla completa) | Fuera del `AppLayout`: no lleva nav |
| `/registro` | `RegistroPage` | propio (pantalla completa) | ídem |
| `/items` | `ItemsPage` | `AppLayout` | Catálogo con buscador (`?q=`) |
| `/asistencias` | `AsistenciasPage` | `AppLayout` | Ver comportamiento abajo |
| `*` | `NotFoundPage` | `AppLayout` | 404 |

`ROUTES` en [routes.ts](src/routes.ts) es la única fuente de verdad de los paths — nunca se escribe un string de ruta a mano en un `Link`/`navigate`.

### Comportamiento de `/asistencias`

- **Sin sesión:** solo un link "Inicia sesión para registrar tu asistencia" → `/login`.
- **Con sesión, sin asistencia confirmada:** formulario (fecha/hora + selección de items con buscador) + cotización en vivo contra `POST /asistencias/cotizar`.
- **Con sesión y ya confirmada:** el formulario se bloquea (el backend permite una sola confirmación por usuario) y se muestran la fecha y el desglose de descuento ya guardados.

## Paleta de colores

Definida como design tokens de Tailwind v4 en [`index.css`](src/index.css) vía `@theme`, lo que genera automáticamente las utilidades `bg-brand-*`, `text-brand-*`, `border-brand-*`:

| Token | Hex | Uso |
|---|---|---|
| `brand-100` | `#dce8b4` | fondos suaves, tiles |
| `brand-300` | `#a7c957` | bordes, hover de tiles |
| `brand-500` | `#6a994e` | acciones primarias (botones, links) |
| `brand-700` | `#386641` | texto de énfasis, hover de botones |
| `brand-accent` | `#b08968` | acentos secundarios |

## Puesta en marcha

Requisitos: Node 22+, npm.

```bash
npm install
```

Variable de entorno en `frontend/.env`:

| Variable | Requerida | Descripción |
|---|---|---|
| `VITE_API_URL` | no | Base de la API (por defecto `http://localhost:3000/api`) |

```bash
npm run dev       # servidor con recarga en http://localhost:5173
npm run lint      # oxlint
npm run build     # tsc -b && vite build → dist/
npm run preview   # sirve dist/ localmente
```

`VITE_API_URL` se hornea en el bundle en build time (no es configurable después de compilar): si cambia la URL del backend hay que rebuildear.

## Docker

```bash
docker build -t disagro-frontend --build-arg VITE_API_URL=http://localhost:3000/api .
docker run --rm -p 8081:80 disagro-frontend
```

Multi-stage ([Dockerfile](Dockerfile)): `node:22-alpine` compila con `npm ci && npm run build`, luego `nginx:alpine` sirve `dist/` con fallback a `index.html` para las rutas de React Router ([nginx.conf](nginx.conf)). Imagen final ~90 MB, sin Node en runtime.

Para levantar frontend + backend juntos, ver [`docker-compose.yml`](../docker-compose.yml) en la raíz del repo.
