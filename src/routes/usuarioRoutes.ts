import { Router } from 'express';
import { usuarioController } from '../controllers/usuarioController.js';
import { authMiddleware } from '../middleware/auth.js';
import { uploadAvatar } from '../middleware/upload.js';

const router = Router();

router.use(authMiddleware);

router.get('/me', usuarioController.getMe);
router.patch('/me/nombre', usuarioController.updateNombre);
router.patch('/me/email', usuarioController.updateEmail);
router.patch('/me/avatar', uploadAvatar, usuarioController.updateAvatar);
router.patch('/me/password', usuarioController.updatePassword);

export default router;
