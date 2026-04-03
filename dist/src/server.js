// src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import tareaRoutes from './routes/tareaRoutes';
dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 3001;
// Middleware
app.use(cors());
app.use(express.json());
// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend funcionando!' });
});
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tareas', tareaRoutes);
// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Servidor backend en http://0.0.0.0:${PORT}`);
    console.log(`📝 Base de datos: ${process.env.DATABASE_URL}`);
});
//# sourceMappingURL=server.js.map