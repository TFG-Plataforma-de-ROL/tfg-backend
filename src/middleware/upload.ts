import multer from 'multer';
import path from 'path';
import fs from 'fs';

const avatarsDir = path.join(process.cwd(), 'uploads', 'avatars');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, avatarsDir),
  filename: (req, _file, cb) => {
    const userId = (req as any).user?.id ?? 'unknown';
    cb(null, `avatar-${userId}-${Date.now()}.jpg`);
  },
});

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes'));
  }
};

export const uploadAvatar = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
}).single('avatar');
