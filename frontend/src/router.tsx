import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from './routes';
import { AppLayout } from './shared/components/AppLayout';
import { LoginPage } from './modules/auth/pages/LoginPage';
import { RegistroPage } from './modules/auth/pages/RegistroPage';
import { ItemsPage } from './modules/items/pages/ItemsPage';
import { AsistenciasPage } from './modules/asistencias/pages/AsistenciasPage';
import { NotFoundPage } from './shared/components/NotFoundPage';

export const router = createBrowserRouter([
  { path: ROUTES.LOGIN, element: <LoginPage /> },
  { path: ROUTES.REGISTRO, element: <RegistroPage /> },
  {
    element: <AppLayout />,
    children: [
      { path: ROUTES.HOME, element: <Navigate to={ROUTES.ITEMS} replace /> },
      { path: ROUTES.ITEMS, element: <ItemsPage /> },
      { path: ROUTES.ASISTENCIAS, element: <AsistenciasPage /> },
      { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
    ],
  },
]);
