// src/routes/tareaRoutes.ts
import { Router } from 'express';
import { tareaController } from '../controllers/tareaController';
import { authMiddleware } from '../middleware/auth';
const router = Router();
router.use(authMiddleware);
router.get('/', tareaController.getTareas);
router.post('/', tareaController.createTarea);
router.put('/:id', tareaController.updateTarea);
router.delete('/:id', tareaController.deleteTarea);
export default router;
//# sourceMappingURL=tareaRoutes.js.map