// src/routes/sistemaRolRoutes.ts
import { Router } from 'express';
import { sistemaRolController } from '../controllers/sistemaRolController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Lectura pública — el usuario necesita ver los sistemas antes de crear personajes
router.get('/', sistemaRolController.getSistemasRol);
router.get('/:id', sistemaRolController.getSistemaRolById);

// Escritura protegida
router.post('/', authMiddleware, sistemaRolController.createSistemaRol);
router.put('/:id', authMiddleware, sistemaRolController.updateSistemaRol);
router.delete('/:id', authMiddleware, sistemaRolController.deleteSistemaRol);

export default router;
