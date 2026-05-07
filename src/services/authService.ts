// src/services/authService.ts
import { prisma } from '../utils/prisma.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

export const authService = {
  async register(nombre: string, email: string, password: string) {
    const existingUser = await prisma.usuario.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    const hashedPassword = await hashPassword(password);

    const usuario = await prisma.usuario.create({
      data: { nombre, email, password: hashedPassword },
      select: { id_usuario: true, nombre: true, email: true, is_admin: true, created_at: true },
    });

    const token = generateToken({
      id: usuario.id_usuario,
      email: usuario.email,
      is_admin: usuario.is_admin,
    });
    return { usuario, token };
  },

  async login(email: string, password: string) {
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = await comparePassword(password, usuario.password);
    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }

    const token = generateToken({
      id: usuario.id_usuario,
      email: usuario.email,
      is_admin: usuario.is_admin,
    });
    return {
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        email: usuario.email,
        is_admin: usuario.is_admin,
        created_at: usuario.created_at,
      },
      token,
    };
  },
};
