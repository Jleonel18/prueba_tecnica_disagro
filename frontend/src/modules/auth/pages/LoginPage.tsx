import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../routes';
import { AuthField } from '../components/AuthField';
import { AuthLayout } from '../components/AuthLayout';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthLayout title="Inicia Sesión">
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

      <div className="flex flex-row justify-between">
        <Link to={ROUTES.REGISTRO} className="text-brand-500 text-sm md:text-md">
          Regístrate
        </Link>
      </div>

      <button
        type="button"
        className="mt-4 md:mt-10 w-full flex justify-center text-sm md:text-xl text-white bg-brand-500 hover:bg-brand-700 transition-colors py-2 rounded-md"
      >
        Login
      </button>
    </AuthLayout>
  );
}
