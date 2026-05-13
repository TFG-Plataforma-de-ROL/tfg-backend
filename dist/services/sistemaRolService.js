// src/services/sistemaRolService.ts
import { prisma } from '../utils/prisma.js';
export const sistemaRolService = {
    async getSistemasRol() {
        return prisma.sistemaRol.findMany({
            orderBy: { nombre: 'asc' },
        });
    },
    async getSistemaRolById(id) {
        return prisma.sistemaRol.findUnique({
            where: { id_sistema_rol: id },
        });
    },
    async createSistemaRol(nombre, descripcion) {
        return prisma.sistemaRol.create({
            data: { nombre, descripcion },
        });
    },
    async updateSistemaRol(id, data) {
        return prisma.sistemaRol.update({
            where: { id_sistema_rol: id },
            data,
        });
    },
    async deleteSistemaRol(id) {
        return prisma.sistemaRol.delete({
            where: { id_sistema_rol: id },
        });
    },
};
//# sourceMappingURL=sistemaRolService.js.map