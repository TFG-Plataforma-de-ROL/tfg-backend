import { authService } from '../services/authService';
export const authController = {
    async register(req, res) {
        try {
            const { nombre, email, password } = req.body;
            if (!nombre || !email || !password) {
                res.status(400).json({ error: 'Campos requeridos: nombre, email, password' });
                return;
            }
            const result = await authService.register(nombre, email, password);
            res.status(201).json({ user: result.usuario, token: result.token });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ error: 'Campos requeridos: email, password' });
                return;
            }
            const result = await authService.login(email, password);
            res.json({ user: result.usuario, token: result.token });
        }
        catch (error) {
            res.status(401).json({ error: error.message });
        }
    },
    async logout(req, res) {
        // En este caso, el logout es client-side (eliminar token)
        res.json({ message: 'Sesión cerrada' });
    },
};
//# sourceMappingURL=authController.js.map