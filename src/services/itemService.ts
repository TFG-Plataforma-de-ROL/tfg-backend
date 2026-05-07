// src/services/itemService.ts
import { prisma } from '../utils/prisma.js';

export const itemService = {
  async getItems(filters?: { tipo_item?: string; id_sistema_rol?: number }) {
    return prisma.item.findMany({
      where: {
        ...(filters?.tipo_item && { tipo_item: filters.tipo_item }),
        ...(filters?.id_sistema_rol && { id_sistema_rol: filters.id_sistema_rol }),
      },
      include: { sistema_rol: { select: { id_sistema_rol: true, nombre: true } } },
      orderBy: [{ tipo_item: 'asc' }, { nombre: 'asc' }],
    });
  },

  async getItemById(id: number) {
    return prisma.item.findUnique({
      where: { id_item: id },
      include: { sistema_rol: { select: { id_sistema_rol: true, nombre: true } } },
    });
  },

  async createItem(nombre: string, tipo_item: string, id_sistema_rol?: number, todos_datos?: object) {
    return prisma.item.create({
      data: { nombre, tipo_item, id_sistema_rol, todos_datos },
    });
  },

  async updateItem(id: number, data: { nombre?: string; tipo_item?: string; id_sistema_rol?: number; todos_datos?: object }) {
    return prisma.item.update({
      where: { id_item: id },
      data,
    });
  },

  async deleteItem(id: number) {
    return prisma.item.delete({
      where: { id_item: id },
    });
  },
};
