require('./config/env');

const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(cors());
app.use(express.json());

const loggerAcademico = (req, res, next) => {
  const inicio = performance.now();
  res.on('finish', () => {
    const duracion = performance.now() - inicio;
    console.log(`[${req.method}] ${req.originalUrl} - Estado: ${res.statusCode} (${duracion.toFixed(2)}ms)`);
  });
  next();
};

app.use(loggerAcademico);

app.get('/', (req, res) => {
  res.send('TaskFlow API — Fase A OK');
});

app.use('/api/v1/tasks', taskRoutes);

app.use((err, req, res, next) => {
  if (err.message === 'NOT_FOUND') {
    return res.status(404).json({ error: 'Tarea no encontrada.' });
  }
  console.error(err);
  return res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor en http://localhost:${process.env.PORT}`);
});
