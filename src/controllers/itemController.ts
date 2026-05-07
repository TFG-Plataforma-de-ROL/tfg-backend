// src/controllers/itemController.ts
import { Request, Response } from 'express';
import { itemService } from '../services/itemService.js';

export const itemController = {
  async getItems(req: Request, res: Response): Promise<void> {
    try {
      const { tipo_item, id_sistema_rol } = req.query;
      const items = await itemService.getItems({
        tipo_item: tipo_item as string | undefined,
        id_sistema_rol: id_sistema_rol ? Number(id_sistema_rol) : undefined,
      });
      res.json(items);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(500).json({ error: message });
    }
  },

  async getItemById(req: Request, res: Response): Promise<void> {
    try {
      const item = await itemService.getItemById(Number(req.params.id));
      if (!item) { res.status(404).json({ error: 'Item no encontrado' }); return; }
      res.json(item);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(500).json({ error: message });
    }
  },

  async createItem(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, tipo_item, id_sistema_rol, todos_datos } = req.body;
      if (!nombre || !tipo_item) {
        res.status(400).json({ error: 'Campos requeridos: nombre, tipo_item' });
        return;
      }
      const item = await itemService.createItem(nombre, tipo_item, id_sistema_rol, todos_datos);
      res.status(201).json(item);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(500).json({ error: message });
    }
  },

  async updateItem(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, tipo_item, id_sistema_rol, todos_datos } = req.body;
      const item = await itemService.updateItem(Number(req.params.id), { nombre, tipo_item, id_sistema_rol, todos_datos });
      res.json(item);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(500).json({ error: message });
    }
  },

  async deleteItem(req: Request, res: Response): Promise<void> {
    try {
      await itemService.deleteItem(Number(req.params.id));
      res.json({ message: 'Item eliminado' });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      res.status(500).json({ error: message });
    }
  },
};
