// src/controllers/sistemaRolController.ts
import { Request, Response } from 'express';
import { sistemaRolService } from '../services/sistemaRolService.js';

export const sistemaRolController = {
  async getSistemasRol(_req: Request, res: Response): Promise<void> {
    try {
      const sistemas = await sistemaRolService.getSistemasRol();
      res.json(sistemas);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(500).json({ error: message });
    }
  },

  async getSistemaRolById(req: Request, res: Response): Promise<void> {
    try {
      const sistema = await sistemaRolService.getSistemaRolById(Number(req.params.id));
      if (!sistema) { res.status(404).json({ error: 'Sistema de rol no encontrado' }); return; }
      res.json(sistema);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(500).json({ error: message });
    }
  },

  async createSistemaRol(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, descripcion } = req.body;
      if (!nombre) { res.status(400).json({ error: 'Campo requerido: nombre' }); return; }
      const sistema = await sistemaRolService.createSistemaRol(nombre, descripcion);
      res.status(201).json(sistema);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(500).json({ error: message });
    }
  },

  async updateSistemaRol(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, descripcion } = req.body;
      const sistema = await sistemaRolService.updateSistemaRol(Number(req.params.id), { nombre, descripcion });
      res.json(sistema);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(500).json({ error: message });
    }
  },

  async deleteSistemaRol(req: Request, res: Response): Promise<void> {
    try {
      await sistemaRolService.deleteSistemaRol(Number(req.params.id));
      res.json({ message: 'Sistema de rol eliminado' });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(500).json({ error: message });
    }
  },
};
