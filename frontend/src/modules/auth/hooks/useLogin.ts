import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes';
import { ApiError } from '../../../shared/api/httpClient';
import { useAuth } from '../../../shared/auth/useAuth';
import { loginUsuario } from '../api/auth.api';
import type { LoginInput } from '../types/usuario';

export function useLogin() {
  const navigate = useNavigate();
  const { login: guardarSesion } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(credenciales: LoginInput): Promise<void> {
    setLoading(true);
    setError(null);
    try {
      const { token } = await loginUsuario(credenciales);
      guardarSesion(token);
      navigate(ROUTES.HOME);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo iniciar sesión');
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}
