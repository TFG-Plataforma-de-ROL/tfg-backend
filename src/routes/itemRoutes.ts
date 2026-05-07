// src/routes/itemRoutes.ts
import { Router } from 'express';
import { itemController } from '../controllers/itemController.js';
import { authMiddleware } from '../middleware/auth.js';
import { adminMiddleware } from '../middleware/admin.js';

const router = Router();

// Lectura pública — necesario al crear/editar fichas
router.get('/', itemController.getItems);
router.get('/:id', itemController.getItemById);

// Escritura restringida a administradores
router.post('/', authMiddleware, adminMiddleware, itemController.createItem);
router.put('/:id', authMiddleware, adminMiddleware, itemController.updateItem);
router.delete('/:id', authMiddleware, adminMiddleware, itemController.deleteItem);

export default router;
