import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

const app = express();
const PORT = Number(process.env.PORT) || 3001;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'proyecto_tfg',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres123',
});

app.use(cors());
app.use(express.json());

app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'OK', message: 'Backend funcionando!', database: 'Conectado', time: result.rows[0].now });
  } catch (error) {
    res.json({ status: 'OK', message: 'Backend funcionando!', database: 'Desconectado' });
  }
});

app.get('/api/tareas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tareas ORDER BY id');
    res.json(result.rows);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error inesperado';
    res.status(500).json({ error: message });
  }
});

app.get('/api/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nombre, email FROM usuarios ORDER BY id');
    res.json(result.rows);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error inesperado';
    res.status(500).json({ error: message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor backend en http://0.0.0.0:${PORT}`);
});
