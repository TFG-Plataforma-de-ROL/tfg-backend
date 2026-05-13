import { usuarioService } from '../services/usuarioService.js';
export const usuarioController = {
    async getMe(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'No autorizado' });
                return;
            }
            const usuario = await usuarioService.getMe(req.user.id);
            if (!usuario) {
                res.status(404).json({ error: 'Usuario no encontrado' });
                return;
            }
            res.json(usuario);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error inesperado';
            res.status(500).json({ error: message });
        }
    },
    async updateNombre(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'No autorizado' });
                return;
            }
            const { nombre } = req.body;
            if (!nombre?.trim()) {
                res.status(400).json({ error: 'El nombre es obligatorio' });
                return;
            }
            const usuario = await usuarioService.updateNombre(req.user.id, nombre.trim());
            res.json(usuario);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error inesperado';
            res.status(500).json({ error: message });
        }
    },
    async updateAvatar(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'No autorizado' });
                return;
            }
            if (!req.file) {
                res.status(400).json({ error: 'No se ha enviado ninguna imagen' });
                return;
            }
            const avatarUrl = `/uploads/avatars/${req.file.filename}`;
            const result = await usuarioService.updateAvatar(req.user.id, avatarUrl);
            res.json(result);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error inesperado';
            res.status(500).json({ error: message });
        }
    },
    async updatePassword(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ error: 'No autorizado' });
                return;
            }
            const { currentPassword, newPassword } = req.body;
            if (!currentPassword || !newPassword) {
                res.status(400).json({ error: 'Campos requeridos: currentPassword, newPassword' });
                return;
            }
            if (newPassword.length < 6) {
                res.status(400).json({ error: 'La nueva contraseña debe tener al menos 6 caracteres' });
                return;
            }
            await usuarioService.updatePassword(req.user.id, currentPassword, newPassword);
            res.json({ message: 'Contraseña actualizada' });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error inesperado';
            res.status(400).json({ error: message });
        }
    },
};
//# sourceMappingURL=usuarioController.js.map