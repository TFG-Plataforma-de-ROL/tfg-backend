// src/server.ts
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import personajeRoutes from './routes/personajeRoutes.js';
import sistemaRolRoutes from './routes/sistemaRolRoutes.js';
import fichaRoutes from './routes/fichaRoutes.js';

dotenv.config();

const app: Express = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Backend funcionando!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/personajes', personajeRoutes);
app.use('/api/sistemas-rol', sistemaRolRoutes);
app.use('/api/personajes/:personajeId/fichas', fichaRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor backend en http://0.0.0.0:${PORT}`);
});
