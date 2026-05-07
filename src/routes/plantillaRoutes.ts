// src/routes/plantillaRoutes.ts
import { Router } from 'express';
import { plantillaController } from '../controllers/plantillaController.js';
import { authMiddleware } from '../middleware/auth.js';
import { adminMiddleware } from '../middleware/admin.js';

const router = Router();

// Lectura pública
router.get('/', plantillaController.getPlantillas);
router.get('/:id', plantillaController.getPlantillaById);

// Escritura restringida a administradores — plantilla
router.post('/', authMiddleware, adminMiddleware, plantillaController.createPlantilla);
router.put('/:id', authMiddleware, adminMiddleware, plantillaController.updatePlantilla);
router.delete('/:id', authMiddleware, adminMiddleware, plantillaController.deletePlantilla);

// Escritura restringida a administradores — campos anidados
router.post('/:plantillaId/campos', authMiddleware, adminMiddleware, plantillaController.createCampo);
router.put('/:plantillaId/campos/:campoId', authMiddleware, adminMiddleware, plantillaController.updateCampo);
router.delete('/:plantillaId/campos/:campoId', authMiddleware, adminMiddleware, plantillaController.deleteCampo);

export default router;
