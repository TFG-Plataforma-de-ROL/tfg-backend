// src/services/fichaService.ts
import { prisma } from '../utils/prisma.js';
export const fichaService = {
    async getFichas(idPersonaje, idUsuario) {
        const personaje = await prisma.personaje.findFirst({
            where: { id_personaje: idPersonaje, id_usuario: idUsuario },
        });
        if (!personaje)
            throw new Error('Personaje no encontrado');
        return prisma.fichaPersonaje.findMany({
            where: { id_personaje: idPersonaje },
            include: { sistema_rol: { select: { id_sistema_rol: true, nombre: true } } },
            orderBy: { id_ficha: 'desc' },
        });
    },
    async getFichaById(idFicha, idPersonaje, idUsuario) {
        const personaje = await prisma.personaje.findFirst({
            where: { id_personaje: idPersonaje, id_usuario: idUsuario },
        });
        if (!personaje)
            throw new Error('Personaje no encontrado');
        return prisma.fichaPersonaje.findFirst({
            where: { id_ficha: idFicha, id_personaje: idPersonaje },
            include: {
                sistema_rol: true,
                campos_valor: { include: { campo_plantilla: true } },
            },
        });
    },
    async createFicha(idPersonaje, idUsuario, data) {
        const personaje = await prisma.personaje.findFirst({
            where: { id_personaje: idPersonaje, id_usuario: idUsuario },
        });
        if (!personaje)
            throw new Error('Personaje no encontrado');
        return prisma.fichaPersonaje.create({
            data: { id_personaje: idPersonaje, ...data },
        });
    },
    async updateFicha(idFicha, idPersonaje, idUsuario, data) {
        const personaje = await prisma.personaje.findFirst({
            where: { id_personaje: idPersonaje, id_usuario: idUsuario },
        });
        if (!personaje)
            throw new Error('Personaje no encontrado');
        return prisma.fichaPersonaje.updateMany({
            where: { id_ficha: idFicha, id_personaje: idPersonaje },
            data,
        });
    },
    async deleteFicha(idFicha, idPersonaje, idUsuario) {
        const personaje = await prisma.personaje.findFirst({
            where: { id_personaje: idPersonaje, id_usuario: idUsuario },
        });
        if (!personaje)
            throw new Error('Personaje no encontrado');
        return prisma.fichaPersonaje.deleteMany({
            where: { id_ficha: idFicha, id_personaje: idPersonaje },
        });
    },
};
//# sourceMappingURL=fichaService.js.map