// src/server.ts
import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import authRoutes from './routes/authRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import personajeRoutes from './routes/personajeRoutes.js';
import sistemaRolRoutes from './routes/sistemaRolRoutes.js';
import fichaRoutes from './routes/fichaRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import plantillaRoutes from './routes/plantillaRoutes.js';

const app: Express = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Backend funcionando!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/personajes', personajeRoutes);
app.use('/api/sistemas-rol', sistemaRolRoutes);
app.use('/api/personajes/:personajeId/fichas', fichaRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/plantillas', plantillaRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor backend en http://0.0.0.0:${PORT}`);
});
