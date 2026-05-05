// src/controllers/personajeController.ts
import { Request, Response } from 'express';
import { personajeService } from '../services/personajeService.js';

export const personajeController = {
  async getPersonajes(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) { res.status(401).json({ error: 'No autorizado' }); return; }
      const personajes = await personajeService.getPersonajes(req.user.id);
      res.json(personajes);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(500).json({ error: message });
    }
  },

  async getPersonajeById(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) { res.status(401).json({ error: 'No autorizado' }); return; }
      const personaje = await personajeService.getPersonajeById(Number(req.params.id), req.user.id);
      if (!personaje) { res.status(404).json({ error: 'Personaje no encontrado' }); return; }
      res.json(personaje);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(500).json({ error: message });
    }
  },

  async createPersonaje(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) { res.status(401).json({ error: 'No autorizado' }); return; }
      const { nombre, id_sistema_rol, descripcion } = req.body;
      if (!nombre || !id_sistema_rol) {
        res.status(400).json({ error: 'Campos requeridos: nombre, id_sistema_rol' });
        return;
      }
      const personaje = await personajeService.createPersonaje(nombre, Number(id_sistema_rol), req.user.id, descripcion);
      res.status(201).json(personaje);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(500).json({ error: message });
    }
  },

  async updatePersonaje(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) { res.status(401).json({ error: 'No autorizado' }); return; }
      const { nombre, descripcion } = req.body;
      const result = await personajeService.updatePersonaje(Number(req.params.id), req.user.id, { nombre, descripcion });
      if (result.count === 0) { res.status(404).json({ error: 'Personaje no encontrado' }); return; }
      res.json({ message: 'Personaje actualizado' });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(500).json({ error: message });
    }
  },

  async deletePersonaje(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) { res.status(401).json({ error: 'No autorizado' }); return; }
      const result = await personajeService.deletePersonaje(Number(req.params.id), req.user.id);
      if (result.count === 0) { res.status(404).json({ error: 'Personaje no encontrado' }); return; }
      res.json({ message: 'Personaje eliminado' });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(500).json({ error: message });
    }
  },
};
