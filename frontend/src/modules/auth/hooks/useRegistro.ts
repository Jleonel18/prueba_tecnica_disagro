import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes';
import { ApiError } from '../../../shared/api/httpClient';
import { useAuth } from '../../../shared/auth/useAuth';
import { registrarUsuario } from '../api/auth.api';
import type { RegistrarUsuarioInput } from '../types/usuario';

export function useRegistro() {
  const navigate = useNavigate();
  const { login: guardarSesion } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function registrar(datos: RegistrarUsuarioInput): Promise<void> {
    setLoading(true);
    setError(null);
    try {
      const { token } = await registrarUsuario(datos);
      guardarSesion(token);
      navigate(ROUTES.HOME);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo completar el registro');
    } finally {
      setLoading(false);
    }
  }

  return { registrar, loading, error };
}
