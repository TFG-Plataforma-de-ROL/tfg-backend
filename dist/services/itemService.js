// src/services/itemService.ts
import { prisma } from '../utils/prisma.js';
export const itemService = {
    async getItems(filters) {
        return prisma.item.findMany({
            where: {
                ...(filters?.tipo_item && { tipo_item: filters.tipo_item }),
                ...(filters?.id_sistema_rol && { id_sistema_rol: filters.id_sistema_rol }),
            },
            include: { sistema_rol: { select: { id_sistema_rol: true, nombre: true } } },
            orderBy: [{ tipo_item: 'asc' }, { nombre: 'asc' }],
        });
    },
    async getItemById(id) {
        return prisma.item.findUnique({
            where: { id_item: id },
            include: { sistema_rol: { select: { id_sistema_rol: true, nombre: true } } },
        });
    },
    async createItem(nombre, tipo_item, id_sistema_rol, todos_datos) {
        return prisma.item.create({
            data: { nombre, tipo_item, id_sistema_rol, todos_datos },
        });
    },
    async updateItem(id, data) {
        return prisma.item.update({
            where: { id_item: id },
            data,
        });
    },
    async deleteItem(id) {
        return prisma.item.delete({
            where: { id_item: id },
        });
    },
};
//# sourceMappingURL=itemService.js.map