// src/services/tareaService.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const tareaService = {
    async getTareas(usuarioId) {
        return prisma.tarea.findMany({
            where: { usuario_id: usuarioId },
            orderBy: { created_at: 'desc' },
        });
    },
    async getTareaById(id, usuarioId) {
        return prisma.tarea.findFirst({
            where: { id, usuario_id: usuarioId },
        });
    },
    async createTarea(titulo, descripcion, usuarioId) {
        return prisma.tarea.create({
            data: {
                titulo,
                descripcion,
                usuario_id: usuarioId,
            },
        });
    },
    async updateTarea(id, usuarioId, data) {
        return prisma.tarea.updateMany({
            where: { id, usuario_id: usuarioId },
            data,
        });
    },
    async deleteTarea(id, usuarioId) {
        return prisma.tarea.deleteMany({
            where: { id, usuario_id: usuarioId },
        });
    },
};
//# sourceMappingURL=tareaService.js.map