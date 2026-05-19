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
    async saveCampos(idFicha, idPersonaje, idUsuario, campos) {
        const personaje = await prisma.personaje.findFirst({
            where: { id_personaje: idPersonaje, id_usuario: idUsuario },
        });
        if (!personaje)
            throw new Error('Personaje no encontrado');
        const ficha = await prisma.fichaPersonaje.findFirst({
            where: { id_ficha: idFicha, id_personaje: idPersonaje },
        });
        if (!ficha)
            throw new Error('Ficha no encontrada');
        // Resolve nombre_campo → id_campo_plantilla using the plantilla linked to this ficha's sistema_rol
        const plantilla = await prisma.fichaPlantilla.findFirst({
            where: { id_sistema_rol: ficha.id_sistema_rol ?? undefined },
            include: { campos: true },
        });
        if (!plantilla)
            throw new Error('Plantilla no encontrada para este sistema de rol');
        const campoMap = new Map(plantilla.campos.map((c) => [c.nombre_campo, c.id_campo_plantilla]));
        await prisma.$transaction(async (tx) => {
            await tx.campoValor.deleteMany({ where: { id_ficha: idFicha } });
            const toCreate = campos
                .map((c) => {
                const id_campo_plantilla = campoMap.get(c.nombre_campo);
                if (!id_campo_plantilla)
                    return null;
                return {
                    id_ficha: idFicha,
                    id_campo_plantilla,
                    id_item_valor: c.id_item_valor ?? null,
                    valor: c.valor !== undefined ? c.valor : null,
                };
            })
                .filter((c) => c !== null);
            if (toCreate.length > 0) {
                await tx.campoValor.createMany({ data: toCreate });
            }
        });
        return prisma.fichaPersonaje.findFirst({
            where: { id_ficha: idFicha },
            include: { campos_valor: { include: { campo_plantilla: true } } },
        });
    },
};
//# sourceMappingURL=fichaService.js.map