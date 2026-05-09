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
      const { nombre, id_sistema_rol } = req.body;
      if (!nombre) { res.status(400).json({ error: 'Campo requerido: nombre' }); return; }
      const ficha = await fichaService.createFicha(Number(req.params.personajeId), req.user.id, {
        nombre, id_sistema_rol,
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
      const { nombre } = req.body;
      const result = await fichaService.updateFicha(
        Number(req.params.fichaId),
        Number(req.params.personajeId),
        req.user.id,
        { nombre }
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

  // --- CampoValor ---

  async getValores(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) { res.status(401).json({ error: 'No autorizado' }); return; }
      const valores = await fichaService.getValores(
        Number(req.params.fichaId),
        Number(req.params.personajeId),
        req.user.id
      );
      res.json(valores);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      const status = ['Personaje no encontrado', 'Ficha no encontrada'].includes(message) ? 404 : 500;
      res.status(status).json({ error: message });
    }
  },

  async createValor(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) { res.status(401).json({ error: 'No autorizado' }); return; }
      const { id_campo_plantilla, id_item_valor, valor_texto, valor_numero } = req.body;
      if (!id_campo_plantilla) { res.status(400).json({ error: 'Campo requerido: id_campo_plantilla' }); return; }
      const valor = await fichaService.createValor(
        Number(req.params.fichaId),
        Number(req.params.personajeId),
        req.user.id,
        { id_campo_plantilla, id_item_valor, valor_texto, valor_numero }
      );
      res.status(201).json(valor);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      const status = ['Personaje no encontrado', 'Ficha no encontrada'].includes(message) ? 404 : 500;
      res.status(status).json({ error: message });
    }
  },

  async updateValor(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) { res.status(401).json({ error: 'No autorizado' }); return; }
      const { id_item_valor, valor_texto, valor_numero } = req.body;
      const result = await fichaService.updateValor(
        Number(req.params.valorId),
        Number(req.params.fichaId),
        Number(req.params.personajeId),
        req.user.id,
        { id_item_valor, valor_texto, valor_numero }
      );
      if (result.count === 0) { res.status(404).json({ error: 'Valor no encontrado' }); return; }
      res.json({ message: 'Valor actualizado' });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      const status = ['Personaje no encontrado', 'Ficha no encontrada'].includes(message) ? 404 : 500;
      res.status(status).json({ error: message });
    }
  },

  async deleteValor(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) { res.status(401).json({ error: 'No autorizado' }); return; }
      const result = await fichaService.deleteValor(
        Number(req.params.valorId),
        Number(req.params.fichaId),
        Number(req.params.personajeId),
        req.user.id
      );
      if (result.count === 0) { res.status(404).json({ error: 'Valor no encontrado' }); return; }
      res.json({ message: 'Valor eliminado' });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      const status = ['Personaje no encontrado', 'Ficha no encontrada'].includes(message) ? 404 : 500;
      res.status(status).json({ error: message });
    }
  },
};
