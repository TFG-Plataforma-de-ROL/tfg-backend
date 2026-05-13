import { prisma } from '../utils/prisma.js';
import { comparePassword, hashPassword } from '../utils/password.js';

export const usuarioService = {
  async getMe(userId: number) {
    return prisma.usuario.findUnique({
      where: { id_usuario: userId },
      select: {
        id_usuario: true,
        nombre: true,
        email: true,
        avatar_url: true,
        is_admin: true,
        created_at: true,
        personajes: {
          select: {
            id_personaje: true,
            nombre: true,
            descripcion: true,
            sistema_rol: { select: { nombre: true } },
          },
          orderBy: { id_personaje: 'desc' },
        },
      },
    });
  },

  async updateNombre(userId: number, nombre: string) {
    return prisma.usuario.update({
      where: { id_usuario: userId },
      data: { nombre },
      select: { id_usuario: true, nombre: true, email: true, created_at: true },
    });
  },

  async updateAvatar(userId: number, avatarUrl: string) {
    return prisma.usuario.update({
      where: { id_usuario: userId },
      data: { avatar_url: avatarUrl },
      select: { id_usuario: true, avatar_url: true },
    });
  },

  async updatePassword(userId: number, currentPassword: string, newPassword: string) {
    const usuario = await prisma.usuario.findUnique({ where: { id_usuario: userId } });
    if (!usuario) throw new Error('Usuario no encontrado');

    const isValid = await comparePassword(currentPassword, usuario.password);
    if (!isValid) throw new Error('La contraseña actual es incorrecta');

    const hashed = await hashPassword(newPassword);
    await prisma.usuario.update({
      where: { id_usuario: userId },
      data: { password: hashed },
    });
  },
};
