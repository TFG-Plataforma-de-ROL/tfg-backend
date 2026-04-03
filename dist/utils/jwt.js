// src/utils/jwt.ts
import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'tu_secreto_super_seguro_cambiar_en_prod';
export const generateToken = (payload) => {
    return jwt.sign(payload, SECRET, { expiresIn: '24h' });
};
export const verifyToken = (token) => {
    return jwt.verify(token, SECRET);
};
//# sourceMappingURL=jwt.js.map