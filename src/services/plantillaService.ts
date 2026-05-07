// src/services/plantillaService.ts
import { prisma } from '../utils/prisma.js';

export const plantillaService = {
  // --- FichaPlantilla ---

  async getPlantillas(id_sistema_rol?: number) {
    return prisma.fichaPlantilla.findMany({
      where: { ...(id_sistema_rol && { id_sistema_rol }) },
      include: {
        sistema_rol: { select: { id_sistema_rol: true, nombre: true } },
        campos: true,
      },
      orderBy: { nombre_plantilla: 'asc' },
    });
  },

  async getPlantillaById(id: number) {
    return prisma.fichaPlantilla.findUnique({
      where: { id_plantilla: id },
      include: {
        sistema_rol: { select: { id_sistema_rol: true, nombre: true } },
        campos: true,
      },
    });
  },

  async createPlantilla(nombre_plantilla: string, id_sistema_rol?: number, version?: number) {
    return prisma.fichaPlantilla.create({
      data: { nombre_plantilla, id_sistema_rol, version },
    });
  },

  async updatePlantilla(id: number, data: { nombre_plantilla?: string; id_sistema_rol?: number; version?: number }) {
    return prisma.fichaPlantilla.update({
      where: { id_plantilla: id },
      data,
    });
  },

  async deletePlantilla(id: number) {
    return prisma.fichaPlantilla.delete({
      where: { id_plantilla: id },
    });
  },

  // --- CampoPlantilla ---

  async createCampo(id_plantilla: number, nombre_campo: string, id_item_tipo?: object) {
    // Verifica que la plantilla exista
    const plantilla = await prisma.fichaPlantilla.findUnique({ where: { id_plantilla } });
    if (!plantilla) throw new Error('Plantilla no encontrada');

    return prisma.campoPlantilla.create({
      data: { id_plantilla, nombre_campo, id_item_tipo },
    });
  },

  async updateCampo(id_campo: number, id_plantilla: number, data: { nombre_campo?: string; id_item_tipo?: object }) {
    return prisma.campoPlantilla.updateMany({
      where: { id_campo_plantilla: id_campo, id_plantilla },
      data,
    });
  },

  async deleteCampo(id_campo: number, id_plantilla: number) {
    return prisma.campoPlantilla.deleteMany({
      where: { id_campo_plantilla: id_campo, id_plantilla },
    });
  },
};
