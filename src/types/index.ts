// src/types/index.ts
export interface JwtPayload {
  id: number;
  email: string;
  is_admin: boolean;
  iat?: number;
  exp?: number;
}

export interface UsuarioDTO {
  id: number;
  nombre: string;
  email: string;
  created_at?: string;
}

export interface TareaDTO {
  id: number;
  titulo: string;
  descripcion?: string;
  completado: boolean;
  usuario_id: number;
  created_at?: string;
}
