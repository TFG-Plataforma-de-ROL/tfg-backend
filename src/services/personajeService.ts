// src/services/personajeService.ts
import { prisma } from '../utils/prisma.js';

export const personajeService = {
  async getPersonajes(idUsuario: number) {
    return prisma.personaje.findMany({
      where: { id_usuario: idUsuario },
      include: { sistema_rol: { select: { id_sistema_rol: true, nombre: true } } },
      orderBy: { id_personaje: 'desc' },
    });
  },

  async getPersonajeById(idPersonaje: number, idUsuario: number) {
    return prisma.personaje.findFirst({
      where: { id_personaje: idPersonaje, id_usuario: idUsuario },
      include: { sistema_rol: true, fichas: true },
    });
  },

  async createPersonaje(nombre: string, idSistemaRol: number, idUsuario: number, descripcion?: string) {
    return prisma.personaje.create({
      data: { nombre, id_sistema_rol: idSistemaRol, id_usuario: idUsuario, descripcion },
    });
  },

  async updatePersonaje(idPersonaje: number, idUsuario: number, data: { nombre?: string; descripcion?: string }) {
    return prisma.personaje.updateMany({
      where: { id_personaje: idPersonaje, id_usuario: idUsuario },
      data,
    });
  },

  async deletePersonaje(idPersonaje: number, idUsuario: number) {
    return prisma.personaje.deleteMany({
      where: { id_personaje: idPersonaje, id_usuario: idUsuario },
    });
  },
};
