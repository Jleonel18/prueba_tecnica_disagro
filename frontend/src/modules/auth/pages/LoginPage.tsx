import { type SubmitEvent as ReactSubmitEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes';
import { AuthField } from '../components/AuthField';
import { AuthLayout } from '../components/AuthLayout';
import { useLogin } from '../hooks/useLogin';

export function LoginPage() {
  const { login, loading, error } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: ReactSubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    login({ email, password });
  }

  return (
    <AuthLayout title="Inicia Sesión">
      <form onSubmit={handleSubmit}>
        <AuthField
          label="Your email"
          id="email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="nombre@disagro.com"
          autoComplete="email"
        />
        <AuthField
          label="Contraseña"
          id="password"
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
        />

        {error && <p className="mb-4 text-xs text-red-600">{error}</p>}

        <div className="flex flex-row justify-between">
          <Link to={ROUTES.REGISTRO} className="text-brand-500 text-sm md:text-md">
            Regístrate
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 md:mt-10 w-full flex justify-center text-sm md:text-xl text-white bg-brand-500 hover:bg-brand-700 transition-colors py-2 rounded-md disabled:opacity-60"
        >
          {loading ? 'Ingresando…' : 'Login'}
        </button>
      </form>
    </AuthLayout>
  );
}
