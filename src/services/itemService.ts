import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { prisma } from '../utils/prisma.js';

const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), '../../data');

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
    const item = await prisma.item.findUnique({
      where: { id_item: id },
      include: { sistema_rol: { select: { id_sistema_rol: true, nombre: true } } },
    });
    if (!item || !item.ruta_json) return item;

    const raw = await readFile(join(DATA_DIR, item.ruta_json), 'utf-8');
    return { ...item, datos: JSON.parse(raw) };
  },

  async createItem(nombre: string, tipo_item: string, id_sistema_rol?: number, ruta_json?: string) {
    return prisma.item.create({
      data: { nombre, tipo_item, id_sistema_rol, ruta_json },
    });
  },

  async updateItem(id: number, data: { nombre?: string; tipo_item?: string; id_sistema_rol?: number; ruta_json?: string }) {
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
