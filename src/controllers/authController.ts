// src/controllers/authController.ts
import { Request, Response } from 'express';
import { authService } from '../services/authService.js';

export const authController = {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, email, password } = req.body;

      if (!nombre || !email || !password) {
        res.status(400).json({ error: 'Campos requeridos: nombre, email, password' });
        return;
      }

      const result = await authService.register(nombre, email, password);
      res.status(201).json({ user: result.usuario, token: result.token });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(400).json({ error: message });
    }
  },

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: 'Campos requeridos: email, password' });
        return;
      }

      const result = await authService.login(email, password);
      res.json({ user: result.usuario, token: result.token });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(401).json({ error: message });
    }
  },

  async logout(req: Request, res: Response): Promise<void> {
    // En este caso, el logout es client-side (eliminar token)
    res.json({ message: 'Sesión cerrada' });
  },
};
