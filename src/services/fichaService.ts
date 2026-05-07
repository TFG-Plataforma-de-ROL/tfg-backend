// src/services/fichaService.ts
import { prisma } from '../utils/prisma.js';

export const fichaService = {
  async getFichas(idPersonaje: number, idUsuario: number) {
    // Verifica que el personaje pertenece al usuario
    const personaje = await prisma.personaje.findFirst({
      where: { id_personaje: idPersonaje, id_usuario: idUsuario },
    });
    if (!personaje) throw new Error('Personaje no encontrado');

    return prisma.fichaPersonaje.findMany({
      where: { id_personaje: idPersonaje },
      include: {
        especie: { select: { id_item: true, nombre: true } },
        clase: { select: { id_item: true, nombre: true } },
      },
      orderBy: { id_ficha: 'desc' },
    });
  },

  async getFichaById(idFicha: number, idPersonaje: number, idUsuario: number) {
    const personaje = await prisma.personaje.findFirst({
      where: { id_personaje: idPersonaje, id_usuario: idUsuario },
    });
    if (!personaje) throw new Error('Personaje no encontrado');

    return prisma.fichaPersonaje.findFirst({
      where: { id_ficha: idFicha, id_personaje: idPersonaje },
      include: {
        especie: true,
        clase: true,
        sistema_rol: true,
        campos_valor: { include: { campo_plantilla: true } },
      },
    });
  },

  async createFicha(
    idPersonaje: number,
    idUsuario: number,
    data: {
      nombre: string;
      id_sistema_rol?: number;
      id_especie?: number;
      id_clase?: number;
      nivel?: number;
      fuerza?: number;
      destreza?: number;
      constitucion?: number;
      inteligencia?: number;
      sabiduria?: number;
      carisma?: number;
      puntos_vida?: number;
      clase_armadura?: number;
    }
  ) {
    const personaje = await prisma.personaje.findFirst({
      where: { id_personaje: idPersonaje, id_usuario: idUsuario },
    });
    if (!personaje) throw new Error('Personaje no encontrado');

    return prisma.fichaPersonaje.create({
      data: { id_personaje: idPersonaje, ...data },
    });
  },

  async updateFicha(
    idFicha: number,
    idPersonaje: number,
    idUsuario: number,
    data: {
      nombre?: string;
      id_especie?: number;
      id_clase?: number;
      nivel?: number;
      fuerza?: number;
      destreza?: number;
      constitucion?: number;
      inteligencia?: number;
      sabiduria?: number;
      carisma?: number;
      puntos_vida?: number;
      clase_armadura?: number;
    }
  ) {
    const personaje = await prisma.personaje.findFirst({
      where: { id_personaje: idPersonaje, id_usuario: idUsuario },
    });
    if (!personaje) throw new Error('Personaje no encontrado');

    return prisma.fichaPersonaje.updateMany({
      where: { id_ficha: idFicha, id_personaje: idPersonaje },
      data,
    });
  },

  async deleteFicha(idFicha: number, idPersonaje: number, idUsuario: number) {
    const personaje = await prisma.personaje.findFirst({
      where: { id_personaje: idPersonaje, id_usuario: idUsuario },
    });
    if (!personaje) throw new Error('Personaje no encontrado');

    return prisma.fichaPersonaje.deleteMany({
      where: { id_ficha: idFicha, id_personaje: idPersonaje },
    });
  },
};
