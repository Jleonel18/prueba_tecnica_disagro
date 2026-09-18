import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';

export function NotFoundPage() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="mt-2">Página no encontrada</p>
      <Link to={ROUTES.HOME} className="mt-4 inline-block text-blue-600 underline">Volver al inicio</Link>
    </div>
  );
}
