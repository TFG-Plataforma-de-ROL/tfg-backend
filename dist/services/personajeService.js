// src/services/personajeService.ts
import { prisma } from '../utils/prisma.js';
export const personajeService = {
    async getPersonajes(idUsuario) {
        return prisma.personaje.findMany({
            where: { id_usuario: idUsuario },
            include: { sistema_rol: { select: { id_sistema_rol: true, nombre: true } } },
            orderBy: { id_personaje: 'desc' },
        });
    },
    async getPersonajeById(idPersonaje, idUsuario) {
        return prisma.personaje.findFirst({
            where: { id_personaje: idPersonaje, id_usuario: idUsuario },
            include: { sistema_rol: true, fichas: true },
        });
    },
    async createPersonaje(nombre, idSistemaRol, idUsuario, descripcion) {
        return prisma.personaje.create({
            data: { nombre, id_sistema_rol: idSistemaRol, id_usuario: idUsuario, descripcion },
        });
    },
    async updatePersonaje(idPersonaje, idUsuario, data) {
        return prisma.personaje.updateMany({
            where: { id_personaje: idPersonaje, id_usuario: idUsuario },
            data,
        });
    },
    async deletePersonaje(idPersonaje, idUsuario) {
        return prisma.personaje.deleteMany({
            where: { id_personaje: idPersonaje, id_usuario: idUsuario },
        });
    },
};
//# sourceMappingURL=personajeService.js.map