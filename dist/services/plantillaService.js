// src/services/plantillaService.ts
import { prisma } from '../utils/prisma.js';
export const plantillaService = {
    // --- FichaPlantilla ---
    async getPlantillas(id_sistema_rol) {
        return prisma.fichaPlantilla.findMany({
            where: { ...(id_sistema_rol && { id_sistema_rol }) },
            include: {
                sistema_rol: { select: { id_sistema_rol: true, nombre: true } },
                campos: true,
            },
            orderBy: { nombre_plantilla: 'asc' },
        });
    },
    async getPlantillaById(id) {
        return prisma.fichaPlantilla.findUnique({
            where: { id_plantilla: id },
            include: {
                sistema_rol: { select: { id_sistema_rol: true, nombre: true } },
                campos: true,
            },
        });
    },
    async createPlantilla(nombre_plantilla, id_sistema_rol, version) {
        return prisma.fichaPlantilla.create({
            data: { nombre_plantilla, id_sistema_rol, version },
        });
    },
    async updatePlantilla(id, data) {
        return prisma.fichaPlantilla.update({
            where: { id_plantilla: id },
            data,
        });
    },
    async deletePlantilla(id) {
        return prisma.fichaPlantilla.delete({
            where: { id_plantilla: id },
        });
    },
    // --- CampoPlantilla ---
    async createCampo(id_plantilla, nombre_campo, id_item_tipo) {
        // Verifica que la plantilla exista
        const plantilla = await prisma.fichaPlantilla.findUnique({ where: { id_plantilla } });
        if (!plantilla)
            throw new Error('Plantilla no encontrada');
        return prisma.campoPlantilla.create({
            data: { id_plantilla, nombre_campo, id_item_tipo },
        });
    },
    async updateCampo(id_campo, id_plantilla, data) {
        return prisma.campoPlantilla.updateMany({
            where: { id_campo_plantilla: id_campo, id_plantilla },
            data,
        });
    },
    async deleteCampo(id_campo, id_plantilla) {
        return prisma.campoPlantilla.deleteMany({
            where: { id_campo_plantilla: id_campo, id_plantilla },
        });
    },
};
//# sourceMappingURL=plantillaService.js.map