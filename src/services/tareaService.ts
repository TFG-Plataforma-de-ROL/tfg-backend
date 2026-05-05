// src/services/tareaService.ts
import { prisma } from '../utils/prisma.js';

export const tareaService = {
  async getTareas(usuarioId: number) {
    return prisma.tarea.findMany({
      where: { usuario_id: usuarioId },
      orderBy: { created_at: 'desc' },
    });
  },

  async getTareaById(id: number, usuarioId: number) {
    return prisma.tarea.findFirst({
      where: { id, usuario_id: usuarioId },
    });
  },

  async createTarea(titulo: string, descripcion: string | undefined, usuarioId: number) {
    return prisma.tarea.create({
      data: {
        titulo,
        descripcion,
        usuario_id: usuarioId,
      },
    });
  },

  async updateTarea(id: number, usuarioId: number, data: Record<string, any>) {
    return prisma.tarea.updateMany({
      where: { id, usuario_id: usuarioId },
      data,
    });
  },

  async deleteTarea(id: number, usuarioId: number) {
    return prisma.tarea.deleteMany({
      where: { id, usuario_id: usuarioId },
    });
  },
};
