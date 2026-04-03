// src/services/authService.ts
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';
const prisma = new PrismaClient();
export const authService = {
    async register(nombre, email, password) {
        // Verificar si el usuario ya existe
        const existingUser = await prisma.usuario.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error('El email ya está registrado');
        }
        // Hashear password
        const hashedPassword = await hashPassword(password);
        // Crear usuario
        const usuario = await prisma.usuario.create({
            data: {
                nombre,
                email,
                password: hashedPassword,
            },
            select: {
                id: true,
                nombre: true,
                email: true,
                created_at: true,
            },
        });
        const token = generateToken({ id: usuario.id, email: usuario.email });
        return { usuario, token };
    },
    async login(email, password) {
        const usuario = await prisma.usuario.findUnique({ where: { email } });
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        const isPasswordValid = await comparePassword(password, usuario.password);
        if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }
        const token = generateToken({ id: usuario.id, email: usuario.email });
        return {
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                created_at: usuario.created_at,
            },
            token,
        };
    },
};
//# sourceMappingURL=authService.js.map