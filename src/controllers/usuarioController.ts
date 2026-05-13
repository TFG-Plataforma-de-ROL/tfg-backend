import { Request, Response } from 'express';
import { usuarioService } from '../services/usuarioService.js';

export const usuarioController = {
  async getMe(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) { res.status(401).json({ error: 'No autorizado' }); return; }
      const usuario = await usuarioService.getMe(req.user.id);
      if (!usuario) { res.status(404).json({ error: 'Usuario no encontrado' }); return; }
      res.json(usuario);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(500).json({ error: message });
    }
  },

  async updateNombre(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) { res.status(401).json({ error: 'No autorizado' }); return; }
      const { nombre } = req.body;
      if (!nombre?.trim()) { res.status(400).json({ error: 'El nombre es obligatorio' }); return; }
      const usuario = await usuarioService.updateNombre(req.user.id, nombre.trim());
      res.json(usuario);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(500).json({ error: message });
    }
  },

  async updateAvatar(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) { res.status(401).json({ error: 'No autorizado' }); return; }
      if (!req.file) { res.status(400).json({ error: 'No se ha enviado ninguna imagen' }); return; }
      const avatarUrl = `/uploads/avatars/${req.file.filename}`;
      const result = await usuarioService.updateAvatar(req.user.id, avatarUrl);
      res.json(result);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(500).json({ error: message });
    }
  },

  async updateEmail(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) { res.status(401).json({ error: 'No autorizado' }); return; }
      const { email } = req.body
      if (!email?.trim()) { res.status(400).json({ error: 'El email es obligatorio' }); return; }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email.trim())) { res.status(400).json({ error: 'Email no válido' }); return; }
      const usuario = await usuarioService.updateEmail(req.user.id, email.trim())
      res.json(usuario)
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado'
      res.status(400).json({ error: message })
    }
  },

  async updatePassword(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) { res.status(401).json({ error: 'No autorizado' }); return; }
      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) {
        res.status(400).json({ error: 'Campos requeridos: currentPassword, newPassword' });
        return;
      }
      if (newPassword.length < 6) {
        res.status(400).json({ error: 'La nueva contraseña debe tener al menos 6 caracteres' });
        return;
      }
      await usuarioService.updatePassword(req.user.id, currentPassword, newPassword);
      res.json({ message: 'Contraseña actualizada' });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(400).json({ error: message });
    }
  },
};
