import { plantillaService } from '../services/plantillaService.js';
export const plantillaController = {
    // --- FichaPlantilla ---
    async getPlantillas(req, res) {
        try {
            const { id_sistema_rol } = req.query;
            const plantillas = await plantillaService.getPlantillas(id_sistema_rol ? Number(id_sistema_rol) : undefined);
            res.json(plantillas);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error inesperado';
            res.status(500).json({ error: message });
        }
    },
    async getPlantillaById(req, res) {
        try {
            const plantilla = await plantillaService.getPlantillaById(Number(req.params.id));
            if (!plantilla) {
                res.status(404).json({ error: 'Plantilla no encontrada' });
                return;
            }
            res.json(plantilla);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error inesperado';
            res.status(500).json({ error: message });
        }
    },
    async createPlantilla(req, res) {
        try {
            const { nombre_plantilla, id_sistema_rol, version } = req.body;
            if (!nombre_plantilla) {
                res.status(400).json({ error: 'Campo requerido: nombre_plantilla' });
                return;
            }
            const plantilla = await plantillaService.createPlantilla(nombre_plantilla, id_sistema_rol, version);
            res.status(201).json(plantilla);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error inesperado';
            res.status(500).json({ error: message });
        }
    },
    async updatePlantilla(req, res) {
        try {
            const { nombre_plantilla, id_sistema_rol, version } = req.body;
            const plantilla = await plantillaService.updatePlantilla(Number(req.params.id), { nombre_plantilla, id_sistema_rol, version });
            res.json(plantilla);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error inesperado';
            res.status(500).json({ error: message });
        }
    },
    async deletePlantilla(req, res) {
        try {
            await plantillaService.deletePlantilla(Number(req.params.id));
            res.json({ message: 'Plantilla eliminada' });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error inesperado';
            res.status(500).json({ error: message });
        }
    },
    // --- CampoPlantilla ---
    async createCampo(req, res) {
        try {
            const { nombre_campo, id_item_tipo } = req.body;
            if (!nombre_campo) {
                res.status(400).json({ error: 'Campo requerido: nombre_campo' });
                return;
            }
            const campo = await plantillaService.createCampo(Number(req.params.plantillaId), nombre_campo, id_item_tipo);
            res.status(201).json(campo);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error inesperado';
            const status = message === 'Plantilla no encontrada' ? 404 : 500;
            res.status(status).json({ error: message });
        }
    },
    async updateCampo(req, res) {
        try {
            const { nombre_campo, id_item_tipo } = req.body;
            const result = await plantillaService.updateCampo(Number(req.params.campoId), Number(req.params.plantillaId), { nombre_campo, id_item_tipo });
            if (result.count === 0) {
                res.status(404).json({ error: 'Campo no encontrado' });
                return;
            }
            res.json({ message: 'Campo actualizado' });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error inesperado';
            res.status(500).json({ error: message });
        }
    },
    async deleteCampo(req, res) {
        try {
            const result = await plantillaService.deleteCampo(Number(req.params.campoId), Number(req.params.plantillaId));
            if (result.count === 0) {
                res.status(404).json({ error: 'Campo no encontrado' });
                return;
            }
            res.json({ message: 'Campo eliminado' });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Error inesperado';
            res.status(500).json({ error: message });
        }
    },
};
//# sourceMappingURL=plantillaController.js.map