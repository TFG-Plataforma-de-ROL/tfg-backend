// src/controllers/tareaController.ts
import { Request, Response } from 'express';
import { tareaService } from '../services/tareaService.js';

export const tareaController = {
  async getTareas(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'No autorizado' });
        return;
      }

      const tareas = await tareaService.getTareas(req.user.id);
      res.json(tareas);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(500).json({ error: message });
    }
  },

  async createTarea(req: Request, res: Response): Promise<void> {
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
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(500).json({ error: message });
    }
  },

  async updateTarea(req: Request, res: Response): Promise<void> {
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
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(500).json({ error: message });
    }
  },

  async deleteTarea(req: Request, res: Response): Promise<void> {
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
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(500).json({ error: message });
    }
  },
};
