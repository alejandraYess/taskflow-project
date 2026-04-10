const taskService = require('../services/task.service');

const obtenerTodas = (req, res, next) => {
  try {
    res.json(taskService.obtenerTodas());
  } catch (err) {
    next(err);
  }
};

const crearTarea = (req, res, next) => {
  const { texto, categoria, completada, fechaCreacion } = req.body;

  if (texto === undefined || texto === null) {
    return res.status(400).json({ error: 'El texto es obligatorio.' });
  }
  if (typeof texto !== 'string' || texto.trim().length < 1) {
    return res.status(400).json({ error: 'El texto debe ser un texto no vacío.' });
  }

  if (categoria !== undefined && categoria !== null) {
    if (typeof categoria !== 'string' || categoria.trim().length < 1) {
      return res.status(400).json({ error: 'La categoría debe ser un texto válido.' });
    }
  }

  if (completada !== undefined && typeof completada !== 'boolean') {
    return res.status(400).json({ error: 'completada debe ser booleano.' });
  }

  if (fechaCreacion !== undefined && fechaCreacion !== null) {
    if (typeof fechaCreacion !== 'string' || fechaCreacion.trim().length < 1) {
      return res.status(400).json({ error: 'fechaCreacion debe ser una cadena no vacía.' });
    }
  }

  const payload = {
    texto: texto.trim(),
  };
  if (categoria !== undefined && categoria !== null) {
    payload.categoria = categoria.trim();
  }
  if (completada !== undefined) {
    payload.completada = completada;
  }
  if (fechaCreacion !== undefined && fechaCreacion !== null) {
    payload.fechaCreacion = fechaCreacion.trim();
  }

  try {
    const nueva = taskService.crearTarea(payload);
    res.status(201).json(nueva);
  } catch (err) {
    next(err);
  }
};

const eliminarTarea = (req, res, next) => {
  try {
    const idNum = Number(req.params.id);
    if (!Number.isInteger(idNum) || idNum < 1) {
      return res.status(400).json({ error: 'El id debe ser un entero positivo.' });
    }
    taskService.eliminarTarea(idNum);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

const actualizarTarea = (req, res, next) => {
  const idNum = Number(req.params.id);
  if (!Number.isInteger(idNum) || idNum < 1) {
    return res.status(400).json({ error: 'El id debe ser un entero positivo.' });
  }

  const { texto, categoria, completada } = req.body;

  if (
    texto === undefined &&
    categoria === undefined &&
    completada === undefined
  ) {
    return res.status(400).json({ error: 'Debes enviar al menos un campo a modificar.' });
  }

  if (texto !== undefined) {
    if (typeof texto !== 'string' || texto.trim().length < 1) {
      return res.status(400).json({ error: 'El texto debe ser un texto no vacío.' });
    }
  }

  if (categoria !== undefined && categoria !== null) {
    if (typeof categoria !== 'string' || categoria.trim().length < 1) {
      return res.status(400).json({ error: 'La categoría debe ser un texto válido.' });
    }
  }

  if (completada !== undefined && typeof completada !== 'boolean') {
    return res.status(400).json({ error: 'completada debe ser booleano.' });
  }

  const payload = {};
  if (texto !== undefined) {
    payload.texto = texto.trim();
  }
  if (categoria !== undefined && categoria !== null) {
    payload.categoria = categoria.trim();
  }
  if (completada !== undefined) {
    payload.completada = completada;
  }

  try {
    const actualizada = taskService.actualizarTarea(idNum, payload);
    res.json(actualizada);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  obtenerTodas,
  crearTarea,
  eliminarTarea,
  actualizarTarea,
};
