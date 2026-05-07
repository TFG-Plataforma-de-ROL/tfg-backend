// src/routes/plantillaRoutes.ts
import { Router } from 'express';
import { plantillaController } from '../controllers/plantillaController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Lectura pública
router.get('/', plantillaController.getPlantillas);
router.get('/:id', plantillaController.getPlantillaById);

// Escritura protegida — plantilla
router.post('/', authMiddleware, plantillaController.createPlantilla);
router.put('/:id', authMiddleware, plantillaController.updatePlantilla);
router.delete('/:id', authMiddleware, plantillaController.deletePlantilla);

// Escritura protegida — campos anidados
router.post('/:plantillaId/campos', authMiddleware, plantillaController.createCampo);
router.put('/:plantillaId/campos/:campoId', authMiddleware, plantillaController.updateCampo);
router.delete('/:plantillaId/campos/:campoId', authMiddleware, plantillaController.deleteCampo);

export default router;
