// src/routes/itemRoutes.ts
import { Router } from 'express';
import { itemController } from '../controllers/itemController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Lectura pública — necesario al crear/editar fichas
router.get('/', itemController.getItems);
router.get('/:id', itemController.getItemById);

// Escritura protegida
router.post('/', authMiddleware, itemController.createItem);
router.put('/:id', authMiddleware, itemController.updateItem);
router.delete('/:id', authMiddleware, itemController.deleteItem);

export default router;
