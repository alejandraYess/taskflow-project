let tasks = [];
let nextId = 1;

function obtenerTodas() {
  return tasks;
}

function crearTarea(data) {
  const categoria = data.categoria && String(data.categoria).trim()
    ? String(data.categoria).trim()
    : 'Casa';

  const nuevaTarea = {
    id: nextId,
    texto: data.texto,
    completada: data.completada === true,
    categoria,
    fechaCreacion:
      typeof data.fechaCreacion === 'string' && data.fechaCreacion.trim()
        ? data.fechaCreacion.trim()
        : new Date().toISOString(),
  };

  nextId += 1;
  tasks.push(nuevaTarea);
  return nuevaTarea;
}

function eliminarTarea(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new Error('NOT_FOUND');
  }
  tasks.splice(index, 1);
}

function actualizarTarea(id, parches) {
  const t = tasks.find((x) => x.id === id);
  if (!t) {
    throw new Error('NOT_FOUND');
  }
  if (parches.texto !== undefined) {
    t.texto = parches.texto;
  }
  if (parches.categoria !== undefined) {
    t.categoria = parches.categoria;
  }
  if (parches.completada !== undefined) {
    t.completada = parches.completada === true;
  }
  return { ...t };
}

module.exports = {
  obtenerTodas,
  crearTarea,
  eliminarTarea,
  actualizarTarea,
};