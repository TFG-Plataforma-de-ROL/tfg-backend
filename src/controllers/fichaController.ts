// src/controllers/fichaController.ts
import { Request, Response } from 'express';
import { fichaService } from '../services/fichaService.js';

export const fichaController = {
  async getFichas(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) { res.status(401).json({ error: 'No autorizado' }); return; }
      const fichas = await fichaService.getFichas(Number(req.params.personajeId), req.user.id);
      res.json(fichas);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      const status = message === 'Personaje no encontrado' ? 404 : 500;
      res.status(status).json({ error: message });
    }
  },

  async getFichaById(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) { res.status(401).json({ error: 'No autorizado' }); return; }
      const ficha = await fichaService.getFichaById(
        Number(req.params.fichaId),
        Number(req.params.personajeId),
        req.user.id
      );
      if (!ficha) { res.status(404).json({ error: 'Ficha no encontrada' }); return; }
      res.json(ficha);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      const status = message === 'Personaje no encontrado' ? 404 : 500;
      res.status(status).json({ error: message });
    }
  },

  async createFicha(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) { res.status(401).json({ error: 'No autorizado' }); return; }
      const { nombre, id_sistema_rol, id_especie, id_clase, nivel, fuerza, destreza, constitucion, inteligencia, sabiduria, carisma, puntos_vida, clase_armadura } = req.body;
      if (!nombre) { res.status(400).json({ error: 'Campo requerido: nombre' }); return; }
      const ficha = await fichaService.createFicha(Number(req.params.personajeId), req.user.id, {
        nombre, id_sistema_rol, id_especie, id_clase, nivel, fuerza, destreza, constitucion, inteligencia, sabiduria, carisma, puntos_vida, clase_armadura,
      });
      res.status(201).json(ficha);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      const status = message === 'Personaje no encontrado' ? 404 : 500;
      res.status(status).json({ error: message });
    }
  },

  async updateFicha(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) { res.status(401).json({ error: 'No autorizado' }); return; }
      const { nombre, id_especie, id_clase, nivel, fuerza, destreza, constitucion, inteligencia, sabiduria, carisma, puntos_vida, clase_armadura } = req.body;
      const result = await fichaService.updateFicha(
        Number(req.params.fichaId),
        Number(req.params.personajeId),
        req.user.id,
        { nombre, id_especie, id_clase, nivel, fuerza, destreza, constitucion, inteligencia, sabiduria, carisma, puntos_vida, clase_armadura }
      );
      if (result.count === 0) { res.status(404).json({ error: 'Ficha no encontrada' }); return; }
      res.json({ message: 'Ficha actualizada' });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      const status = message === 'Personaje no encontrado' ? 404 : 500;
      res.status(status).json({ error: message });
    }
  },

  async deleteFicha(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) { res.status(401).json({ error: 'No autorizado' }); return; }
      const result = await fichaService.deleteFicha(
        Number(req.params.fichaId),
        Number(req.params.personajeId),
        req.user.id
      );
      if (result.count === 0) { res.status(404).json({ error: 'Ficha no encontrada' }); return; }
      res.json({ message: 'Ficha eliminada' });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      const status = message === 'Personaje no encontrado' ? 404 : 500;
      res.status(status).json({ error: message });
    }
  },
};
