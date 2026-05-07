// src/routes/sistemaRolRoutes.ts
import { Router } from 'express';
import { sistemaRolController } from '../controllers/sistemaRolController.js';
import { authMiddleware } from '../middleware/auth.js';
import { adminMiddleware } from '../middleware/admin.js';

const router = Router();

// Lectura pública — el usuario necesita ver los sistemas antes de crear personajes
router.get('/', sistemaRolController.getSistemasRol);
router.get('/:id', sistemaRolController.getSistemaRolById);

// Escritura restringida a administradores
router.post('/', authMiddleware, adminMiddleware, sistemaRolController.createSistemaRol);
router.put('/:id', authMiddleware, adminMiddleware, sistemaRolController.updateSistemaRol);
router.delete('/:id', authMiddleware, adminMiddleware, sistemaRolController.deleteSistemaRol);

export default router;
