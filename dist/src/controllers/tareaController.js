import { tareaService } from '../services/tareaService';
export const tareaController = {
    async getTareas(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'No autorizado' });
                return;
            }
            const tareas = await tareaService.getTareas(req.user.id);
            res.json(tareas);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async createTarea(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'No autorizado' });
                return;
            }
            const { titulo, descripcion } = req.body;
            if (!titulo) {
                res.status(400).json({ error: 'Titulo requerido' });
                return;
            }
            const tarea = await tareaService.createTarea(titulo, descripcion, req.user.id);
            res.status(201).json(tarea);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async updateTarea(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'No autorizado' });
                return;
            }
            const { id } = req.params;
            const result = await tareaService.updateTarea(Number(id), req.user.id, req.body);
            if (result.count === 0) {
                res.status(404).json({ error: 'Tarea no encontrada' });
                return;
            }
            res.json({ message: 'Tarea actualizada' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async deleteTarea(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'No autorizado' });
                return;
            }
            const { id } = req.params;
            const result = await tareaService.deleteTarea(Number(id), req.user.id);
            if (result.count === 0) {
                res.status(404).json({ error: 'Tarea no encontrada' });
                return;
            }
            res.json({ message: 'Tarea eliminada' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
//# sourceMappingURL=tareaController.js.map