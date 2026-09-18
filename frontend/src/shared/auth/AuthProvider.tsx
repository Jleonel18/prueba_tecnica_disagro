import { useMemo, useState, type ReactNode } from 'react';
import { authStorage } from '../api/authStorage';
import { AuthContext, type AuthContextValue } from './AuthContext';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => authStorage.getToken());

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      isAuthenticated: token !== null,
      login: (nuevoToken: string) => {
        authStorage.setToken(nuevoToken);
        setToken(nuevoToken);
      },
      logout: () => {
        authStorage.clearToken();
        setToken(null);
      },
    }),
    [token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
