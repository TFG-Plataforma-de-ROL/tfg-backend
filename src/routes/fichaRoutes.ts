// src/routes/fichaRoutes.ts
import { Router } from 'express';
import { fichaController } from '../controllers/fichaController.js';
import { authMiddleware } from '../middleware/auth.js';

// mergeParams permite acceder a :personajeId definido en el router padre
const router = Router({ mergeParams: true });

router.use(authMiddleware);

router.get('/', fichaController.getFichas);
router.get('/:fichaId', fichaController.getFichaById);
router.post('/', fichaController.createFicha);
router.put('/:fichaId', fichaController.updateFicha);
router.delete('/:fichaId', fichaController.deleteFicha);

export default router;
