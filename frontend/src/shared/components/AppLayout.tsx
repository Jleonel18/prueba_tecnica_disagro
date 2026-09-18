import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { useAuth } from '../auth/useAuth';
import disagroLogo from '/disagro.png';

export function AppLayout() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate(ROUTES.HOME);
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow">
        <nav className="mx-auto flex max-w-5xl items-center gap-6 px-4 py-3">
          <Link to={ROUTES.HOME}>
            <img src={disagroLogo} alt="Disagro" className="h-10 w-auto" />
          </Link>
          <Link to={ROUTES.ITEMS}>Items</Link>
          <Link to={ROUTES.ASISTENCIAS}>Asistencias</Link>
          {isAuthenticated ? (
            <button type="button" onClick={handleLogout} className="ml-auto">
              Cerrar sesión
            </button>
          ) : (
            <Link to={ROUTES.LOGIN} className="ml-auto">Login</Link>
          )}
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
