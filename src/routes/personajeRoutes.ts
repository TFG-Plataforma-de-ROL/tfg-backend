// src/routes/personajeRoutes.ts
import { Router } from 'express';
import { personajeController } from '../controllers/personajeController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

router.get('/', personajeController.getPersonajes);
router.get('/:id', personajeController.getPersonajeById);
router.post('/', personajeController.createPersonaje);
router.put('/:id', personajeController.updatePersonaje);
router.delete('/:id', personajeController.deletePersonaje);

export default router;
