export interface Usuario {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegistrarUsuarioInput {
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
}

export interface RegistrarUsuarioResponse {
  token: string;
  usuario: Usuario;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}
