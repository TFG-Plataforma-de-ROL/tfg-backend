// src/middleware/admin.ts
import { Request, Response, NextFunction } from 'express';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ error: 'No autorizado' });
    return;
  }
  if (!req.user.is_admin) {
    res.status(403).json({ error: 'Acceso restringido a administradores' });
    return;
  }
  next();
};
