import { itemService } from '../services/itemService.js';
export const itemController = {
    async getItems(req, res) {
        try {
            const { tipo_item, id_sistema_rol } = req.query;
            const items = await itemService.getItems({
                tipo_item: tipo_item,
                id_sistema_rol: id_sistema_rol ? Number(id_sistema_rol) : undefined,
            });
            res.json(items);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error inesperado';
            res.status(500).json({ error: message });
        }
    },
    async getItemById(req, res) {
        try {
            const item = await itemService.getItemById(Number(req.params.id));
            if (!item) {
                res.status(404).json({ error: 'Item no encontrado' });
                return;
            }
            res.json(item);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error inesperado';
            res.status(500).json({ error: message });
        }
    },
    async createItem(req, res) {
        try {
            const { nombre, tipo_item, id_sistema_rol, todos_datos } = req.body;
            if (!nombre || !tipo_item) {
                res.status(400).json({ error: 'Campos requeridos: nombre, tipo_item' });
                return;
            }
            const item = await itemService.createItem(nombre, tipo_item, id_sistema_rol, todos_datos);
            res.status(201).json(item);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error inesperado';
            res.status(500).json({ error: message });
        }
    },
    async updateItem(req, res) {
        try {
            const { nombre, tipo_item, id_sistema_rol, todos_datos } = req.body;
            const item = await itemService.updateItem(Number(req.params.id), { nombre, tipo_item, id_sistema_rol, todos_datos });
            res.json(item);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error inesperado';
            res.status(500).json({ error: message });
        }
    },
    async deleteItem(req, res) {
        try {
            await itemService.deleteItem(Number(req.params.id));
            res.json({ message: 'Item eliminado' });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error inesperado';
            res.status(500).json({ error: message });
        }
    },
};
//# sourceMappingURL=itemController.js.map