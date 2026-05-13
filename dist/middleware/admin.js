export const adminMiddleware = (req, res, next) => {
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
//# sourceMappingURL=admin.js.map