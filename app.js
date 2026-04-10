import {
  fetchTareas,
  crearTareaApi,
  eliminarTareaApi,
  actualizarTareaApi,
} from './src/api/client.js';

const formTareas = document.querySelector('#formulario');
const inputNuevaTarea = document.querySelector('#espacio-escribir');
const selectCategoria = document.querySelector('#select-categoria');
const contenedorTareas = document.querySelector('#agregar-tareas');
const selectOrden = document.querySelector('#orden-tareas');
const inputBuscador = document.querySelector('#buscador-input');
const botonesFiltro = document.querySelectorAll('.menu li');
const botonesCategoria = document.querySelectorAll('.menu-categorias li');
const bannerError = document.querySelector('#banner-error-api');
const indicadorCarga = document.querySelector('#indicador-carga');
const botonAnadir = document.querySelector('#boton-añadir');
const botonBorrarCompletas = document.querySelector('#btn-borrar-completas');

let listaTareas = [];

function setCarga(activo) {
  if (!indicadorCarga) return;
  indicadorCarga.classList.toggle('hidden', !activo);
  if (formTareas) formTareas.classList.toggle('opacity-60', activo);
  if (botonAnadir) botonAnadir.disabled = activo;
  if (botonBorrarCompletas) botonBorrarCompletas.disabled = activo;
}

function limpiarError() {
  if (!bannerError) return;
  bannerError.textContent = '';
  bannerError.classList.add('hidden');
}

function textoErrorRed(err) {
  const status = err && typeof err.status === 'number' ? err.status : null;
  if (status === 400 || status === 404) {
    return err.message || 'La solicitud no es válida.';
  }
  if (status !== null && status >= 500) {
    return 'Error interno del servidor. Inténtalo más tarde.';
  }
  return err && err.message
    ? err.message
    : 'No se pudo conectar con el servidor. ¿Está arrancado el backend?';
}

function mostrarErrorRed(err) {
  if (!bannerError) return;
  bannerError.textContent = textoErrorRed(err);
  bannerError.classList.remove('hidden');
}

async function recargarTareasDesdeApi() {
  limpiarError();
  setCarga(true);
  try {
    listaTareas = await fetchTareas();
    if (!Array.isArray(listaTareas)) {
      listaTareas = [];
    }
    renderizarTodasLasTareas();
    actualizarEstadisticas();
  } catch (err) {
    mostrarErrorRed(err);
    listaTareas = [];
    contenedorTareas.innerHTML = '';
    actualizarMensajeVacío();
    actualizarEstadisticas();
  } finally {
    setCarga(false);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  recargarTareasDesdeApi();
});

formTareas.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const texto = inputNuevaTarea.value.trim();
  if (!texto) {
    alert('Por favor escribe una tarea antes de añadir.');
    return;
  }
  const categoria = selectCategoria.value;
  limpiarError();
  setCarga(true);
  try {
    const creada = await crearTareaApi({
      texto,
      categoria,
      completada: false,
      fechaCreacion: new Date().toISOString(),
    });
    listaTareas.push(creada);
    inputNuevaTarea.value = '';
    renderizarTodasLasTareas();
    actualizarEstadisticas();
  } catch (err) {
    mostrarErrorRed(err);
  } finally {
    setCarga(false);
  }
});

function actualizarMensajeVacío() {
  const existente = document.getElementById('mensaje-sin-tareas');
  if (listaTareas.length === 0) {
    if (!existente) {
      const msg = document.createElement('p');
      msg.id = 'mensaje-sin-tareas';
      msg.className = 'text-gray-500 dark:text-gray-400 italic py-8 text-center';
      msg.textContent = 'No hay tareas. Añade una.';
      contenedorTareas.appendChild(msg);
    }
  } else {
    existente?.remove();
  }
}

function obtenerTareasOrdenadas() {
  const criterio = selectOrden?.value || 'recientes';
  const copia = [...listaTareas];
  switch (criterio) {
    case 'recientes':
      copia.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
      break;
    case 'antiguas':
      copia.sort((a, b) => new Date(a.fechaCreacion) - new Date(b.fechaCreacion));
      break;
    case 'az':
      copia.sort((a, b) => a.texto.localeCompare(b.texto));
      break;
    case 'za':
      copia.sort((a, b) => b.texto.localeCompare(a.texto));
      break;
    default:
      break;
  }
  return copia;
}

function renderizarTodasLasTareas() {
  contenedorTareas.innerHTML = '';
  const ordenadas = obtenerTareasOrdenadas();
  ordenadas.forEach((t) => renderizarTarea(t));
  actualizarMensajeVacío();

  const botonFiltroActivo = document.querySelector('.menu li.activo');
  const categoriaActiva = document.querySelector('.menu-categorias li.categoria-activo');
  const tipoFiltro = botonFiltroActivo ? botonFiltroActivo.innerText.toLowerCase() : 'todas';
  const categoriaFiltro = categoriaActiva ? categoriaActiva.innerText.toLowerCase() : 'todas';
  aplicarFiltros(tipoFiltro, categoriaFiltro, inputBuscador.value);
}

if (selectOrden) {
  selectOrden.addEventListener('change', () => {
    renderizarTodasLasTareas();
  });
}

function renderizarTarea(tarea) {
  const { id, texto, completada, categoria = 'Casa' } = tarea;
  const clasesCompletada = completada ? 'line-through opacity-60 text-gray-400' : '';
  const tarjeta = document.createElement('div');
  tarjeta.className =
    'flex justify-between items-center bg-white p-[15px_20px] rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:bg-gray-800 transition-all';
  tarjeta.dataset.categoria = categoria;

  tarjeta.innerHTML = `
        <div class="tarea flex items-center gap-[15px] flex-1 min-w-0">
            <span class="nombre cursor-pointer dark:text-white ${clasesCompletada}">${texto}</span>
            <select class="select-categoria-tarea text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary dark:bg-purple-500/30 dark:text-purple-300 shrink-0 border-0 cursor-pointer font-medium focus:ring-1 focus:ring-primary">
                <option value="Casa" ${categoria === 'Casa' ? 'selected' : ''}>Casa</option>
                <option value="Trabajo" ${categoria === 'Trabajo' ? 'selected' : ''}>Trabajo</option>
                <option value="Ocio" ${categoria === 'Ocio' ? 'selected' : ''}>Ocio</option>
            </select>
        </div>
        <div class="flex gap-2 shrink-0">
            <button type="button" class="boton-editar text-blue-500 font-bold hover:scale-110 transition-transform">✏️</button>
            <button type="button" class="boton-borrar text-red-500 font-bold text-[1.2rem] hover:scale-110 transition-transform">X</button>
        </div>
    `;

  const spanNombre = tarjeta.querySelector('.nombre');
  const selectCategoriaTarea = tarjeta.querySelector('.select-categoria-tarea');
  const tareaEnLista = listaTareas.find((t) => t.id === id);

  spanNombre.onclick = async () => {
    if (!tareaEnLista) return;
    limpiarError();
    setCarga(true);
    try {
      const actualizada = await actualizarTareaApi(id, {
        completada: !tareaEnLista.completada,
      });
      Object.assign(tareaEnLista, actualizada);
      renderizarTodasLasTareas();
      actualizarEstadisticas();
    } catch (err) {
      mostrarErrorRed(err);
    } finally {
      setCarga(false);
    }
  };

  tarjeta.querySelector('.boton-borrar').onclick = async () => {
    limpiarError();
    setCarga(true);
    try {
      await eliminarTareaApi(id);
      listaTareas = listaTareas.filter((t) => t.id !== id);
      renderizarTodasLasTareas();
      actualizarEstadisticas();
    } catch (err) {
      mostrarErrorRed(err);
    } finally {
      setCarga(false);
    }
  };

  tarjeta.querySelector('.boton-editar').onclick = async () => {
    const nuevoTexto = prompt('Edita tu tarea:', texto);
    if (!nuevoTexto?.trim() || !tareaEnLista) return;
    limpiarError();
    setCarga(true);
    try {
      const actualizada = await actualizarTareaApi(id, { texto: nuevoTexto.trim() });
      Object.assign(tareaEnLista, actualizada);
      renderizarTodasLasTareas();
    } catch (err) {
      mostrarErrorRed(err);
    } finally {
      setCarga(false);
    }
  };

  selectCategoriaTarea.addEventListener('change', async () => {
    const nuevaCategoria = selectCategoriaTarea.value;
    if (!tareaEnLista) return;
    limpiarError();
    setCarga(true);
    try {
      const actualizada = await actualizarTareaApi(id, { categoria: nuevaCategoria });
      Object.assign(tareaEnLista, actualizada);
      tarjeta.dataset.categoria = nuevaCategoria;
      renderizarTodasLasTareas();
    } catch (err) {
      mostrarErrorRed(err);
    } finally {
      setCarga(false);
    }
  });

  contenedorTareas.appendChild(tarjeta);
}

function aplicarFiltros(tipoFiltro, categoriaFiltro = 'todas', textoBusqueda = '') {
  const tarjetas = contenedorTareas.querySelectorAll(':scope > div');
  const textoBusquedaLower = textoBusqueda.toLowerCase();

  tarjetas.forEach((tarjeta) => {
    const estaCompletada = tarjeta.querySelector('.nombre')?.classList.contains('line-through');
    const categoria = (tarjeta.dataset.categoria || 'casa').toLowerCase();
    const coincideBusqueda =
      !textoBusquedaLower || tarjeta.innerText.toLowerCase().includes(textoBusquedaLower);

    const visiblePorEstado =
      tipoFiltro === 'todas' ||
      (tipoFiltro === 'completadas' && estaCompletada) ||
      (tipoFiltro === 'pendientes' && !estaCompletada);

    const visiblePorCategoria =
      categoriaFiltro === 'todas' || categoria === categoriaFiltro.toLowerCase();

    tarjeta.style.display =
      visiblePorEstado && visiblePorCategoria && coincideBusqueda ? 'flex' : 'none';
  });
}

botonesFiltro.forEach((boton) => {
  boton.onclick = () => {
    botonesFiltro.forEach((b) => b.classList.remove('activo', 'bg-primary', 'text-white'));
    boton.classList.add('activo', 'bg-primary', 'text-white');

    const tipoFiltro = boton.innerText.toLowerCase();
    const categoriaActiva = document.querySelector('.menu-categorias li.categoria-activo');
    const categoriaFiltro = categoriaActiva ? categoriaActiva.innerText.toLowerCase() : 'todas';
    aplicarFiltros(tipoFiltro, categoriaFiltro, inputBuscador.value);
  };
});

botonesCategoria.forEach((boton) => {
  boton.onclick = () => {
    botonesCategoria.forEach((b) => b.classList.remove('categoria-activo', 'bg-primary', 'text-white'));
    boton.classList.add('categoria-activo', 'bg-primary', 'text-white');

    const categoriaFiltro = boton.innerText.toLowerCase();
    const botonFiltroActivo = document.querySelector('.menu li.activo');
    const tipoFiltro = botonFiltroActivo ? botonFiltroActivo.innerText.toLowerCase() : 'todas';
    aplicarFiltros(tipoFiltro, categoriaFiltro, inputBuscador.value);
  };
});

inputBuscador.addEventListener('input', (evento) => {
  const botonFiltroActivo = document.querySelector('.menu li.activo');
  const categoriaActiva = document.querySelector('.menu-categorias li.categoria-activo');
  const tipoFiltro = botonFiltroActivo ? botonFiltroActivo.innerText.toLowerCase() : 'todas';
  const categoriaFiltro = categoriaActiva ? categoriaActiva.innerText.toLowerCase() : 'todas';
  aplicarFiltros(tipoFiltro, categoriaFiltro, evento.target.value);
});

function actualizarEstadisticas() {
  const total = listaTareas.length;
  const completadas = listaTareas.filter((t) => t.completada).length;
  const pendientes = total - completadas;

  const spans = document.querySelectorAll('.capsula p span');
  if (spans.length >= 3) {
    [spans[0], spans[1], spans[2]].forEach((span, i) => {
      span.textContent = [total, completadas, pendientes][i];
    });
  }
}

botonBorrarCompletas.onclick = async () => {
  const completadas = listaTareas.filter((t) => t.completada).length;
  if (completadas === 0) return;
  if (!confirm('¿Seguro que quieres borrar las completadas?')) return;

  const ids = listaTareas.filter((t) => t.completada).map((t) => t.id);
  limpiarError();
  setCarga(true);
  try {
    for (const taskId of ids) {
      await eliminarTareaApi(taskId);
    }
    listaTareas = listaTareas.filter((t) => !t.completada);
    renderizarTodasLasTareas();
    actualizarEstadisticas();
  } catch (err) {
    mostrarErrorRed(err);
    try {
      listaTareas = await fetchTareas();
      if (!Array.isArray(listaTareas)) {
        listaTareas = [];
      }
      renderizarTodasLasTareas();
      actualizarEstadisticas();
    } catch (_) {}
  } finally {
    setCarga(false);
  }
};
