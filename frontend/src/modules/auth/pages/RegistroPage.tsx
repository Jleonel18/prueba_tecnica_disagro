import { type SubmitEvent as ReactSubmitEvent, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../routes";
import { AuthField } from "../components/AuthField";
import { AuthLayout } from "../components/AuthLayout";
import { useRegistro } from "../hooks/useRegistro";
import disagroLogo from "/disagro.png";

export function RegistroPage() {
  const { registrar, loading, error } = useRegistro();
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: ReactSubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    registrar({ nombre, apellidos, email, password });
  }

  return (
    <>
      <AuthLayout title="Crear cuenta">
        <div className="mb-6 flex justify-center">
          <img src={disagroLogo} alt="Disagro" className="h-10 w-auto" />
        </div>
        <form onSubmit={handleSubmit}>
          <AuthField
            label="Nombre"
            id="nombre"
            type="text"
            value={nombre}
            onChange={setNombre}
            placeholder="Juan"
            autoComplete="given-name"
          />
          <AuthField
            label="Apellidos"
            id="apellidos"
            type="text"
            value={apellidos}
            onChange={setApellidos}
            placeholder="Pérez"
            autoComplete="family-name"
          />
          <AuthField
            label="Correo"
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
            placeholder="Mínimo 8 caracteres"
            autoComplete="new-password"
          />

          {error && <p className="mb-4 text-xs text-red-600">{error}</p>}

          <div className="flex flex-row items-center justify-between">
            <span className="text-brand-accent text-sm md:text-md">
              ¿Ya tienes cuenta?
            </span>
            <Link
              to={ROUTES.LOGIN}
              className="text-brand-500 text-sm md:text-md"
            >
              Inicia sesión
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 md:mt-10 w-full flex justify-center text-sm md:text-xl text-white bg-brand-500 hover:bg-brand-700 transition-colors py-2 rounded-md disabled:opacity-60"
          >
            {loading ? "Creando cuenta…" : "Crear cuenta"}
          </button>
        </form>
      </AuthLayout>
    </>
  );
}
