// src/services/sistemaRolService.ts
import { prisma } from '../utils/prisma.js';

export const sistemaRolService = {
  async getSistemasRol() {
    return prisma.sistemaRol.findMany({
      orderBy: { nombre: 'asc' },
    });
  },

  async getSistemaRolById(id: number) {
    return prisma.sistemaRol.findUnique({
      where: { id_sistema_rol: id },
    });
  },

  async createSistemaRol(nombre: string, descripcion?: string, nivel_maximo?: number) {
    return prisma.sistemaRol.create({
      data: { nombre, descripcion, nivel_maximo },
    });
  },

  async updateSistemaRol(id: number, data: { nombre?: string; descripcion?: string; nivel_maximo?: number }) {
    return prisma.sistemaRol.update({
      where: { id_sistema_rol: id },
      data,
    });
  },

  async deleteSistemaRol(id: number) {
    return prisma.sistemaRol.delete({
      where: { id_sistema_rol: id },
    });
  },
};
