// src/utils/jwt.ts
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/index.js';

const SECRET = process.env.JWT_SECRET || 'tu_secreto_super_seguro_cambiar_en_prod';

export const generateToken = (payload: Omit<JwtPayload, 'iat' | 'exp'>): string => {
  return jwt.sign(payload, SECRET, { expiresIn: '24h' });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, SECRET) as JwtPayload;
};
