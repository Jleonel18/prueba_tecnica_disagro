import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './routes';
import { AppLayout } from './shared/components/AppLayout';
import { HomePage } from './modules/items/pages/HomePage';
import { LoginPage } from './modules/auth/pages/LoginPage';
import { RegistroPage } from './modules/auth/pages/RegistroPage';
import { ItemsPage } from './modules/items/pages/ItemsPage';
import { ItemDetallePage } from './modules/items/pages/ItemDetallePage';
import { AsistenciasPage } from './modules/asistencias/pages/AsistenciasPage';
import { AsistenciaNuevaPage } from './modules/asistencias/pages/AsistenciaNuevaPage';
import { NotFoundPage } from './shared/components/NotFoundPage';

export const router = createBrowserRouter([
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  { path: ROUTES.REGISTRO, element: <RegistroPage /> },
  {
    element: <AppLayout />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.ITEMS, element: <ItemsPage /> },
      { path: ROUTES.ITEM_DETALLE, element: <ItemDetallePage /> },
      { path: ROUTES.ASISTENCIAS, element: <AsistenciasPage /> },
      { path: ROUTES.ASISTENCIA_NUEVA, element: <AsistenciaNuevaPage /> },
      { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
    ],
  },
]);
