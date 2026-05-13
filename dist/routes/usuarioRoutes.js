import { Router } from 'express';
import { usuarioController } from '../controllers/usuarioController.js';
import { authMiddleware } from '../middleware/auth.js';
const router = Router();
router.use(authMiddleware);
router.get('/me', usuarioController.getMe);
router.patch('/me/nombre', usuarioController.updateNombre);
router.patch('/me/password', usuarioController.updatePassword);
export default router;
//# sourceMappingURL=usuarioRoutes.js.map