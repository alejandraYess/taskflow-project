// Referencias al DOM
const formTareas = document.querySelector('#formulario');
const inputNuevaTarea = document.querySelector('#espacio-escribir');
const contenedorTareas = document.querySelector('#agregar-tareas');
const inputBuscador = document.querySelector('#buscador-input');
const botonesFiltro = document.querySelectorAll('.menu li');

/** @type {Array<{texto: string, completada: boolean}>} */
let listaTareas = [];

/* ========== Inicialización ========== */

window.onload = () => {
    cargarTareasGuardadas();
    actualizarEstadisticas();
};

/* ========== Persistencia ========== */

/**
 * Guarda la lista de tareas en localStorage.
 */
function guardarEnLocalStorage() {
    localStorage.setItem('mis_tareas', JSON.stringify(listaTareas));
}

/**
 * Carga las tareas desde localStorage y las renderiza.
 */
function cargarTareasGuardadas() {
    const datosGuardados = localStorage.getItem('mis_tareas');
    if (!datosGuardados) return;

    listaTareas = JSON.parse(datosGuardados);
    listaTareas.forEach((tarea) => {
        renderizarTarea(tarea.texto, tarea.completada);
    });
}

/* ========== Formulario de nueva tarea ========== */

formTareas.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const texto = inputNuevaTarea.value.trim();
    if (!texto) return;

    listaTareas.push({ texto, completada: false });
    renderizarTarea(texto, false);
    guardarEnLocalStorage();
    actualizarEstadisticas();
    inputNuevaTarea.value = '';
});

/* ========== Renderizado de tareas ========== */

/**
 * Crea y agrega una tarjeta de tarea al DOM.
 * @param {string} texto - Contenido de la tarea
 * @param {boolean} completada - Si la tarea está completada
 */
function renderizarTarea(texto, completada) {
    const clasesCompletada = completada ? 'line-through opacity-60 text-gray-400' : '';
    const tarjeta = document.createElement('div');
    tarjeta.className = 'flex justify-between items-center bg-white p-[15px_20px] rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:bg-gray-800 transition-all';

    tarjeta.innerHTML = `
        <div class="tarea flex items-center gap-[15px]">
            <span class="nombre cursor-pointer dark:text-white ${clasesCompletada}">${texto}</span>
        </div>
        <div class="flex gap-2">
            <button type="button" class="boton-editar text-blue-500 font-bold hover:scale-110 transition-transform">✏️</button>
            <button type="button" class="boton-borrar text-red-500 font-bold text-[1.2rem] hover:scale-110 transition-transform">X</button>
        </div>
    `;

    const spanNombre = tarjeta.querySelector('.nombre');
    const tareaEnLista = listaTareas.find((t) => t.texto === texto);

    spanNombre.onclick = () => {
        tareaEnLista.completada = !tareaEnLista.completada;
        spanNombre.classList.toggle('line-through');
        spanNombre.classList.toggle('opacity-60');
        spanNombre.classList.toggle('text-gray-400');
        guardarEnLocalStorage();
        actualizarEstadisticas();
    };

    tarjeta.querySelector('.boton-borrar').onclick = () => {
        tarjeta.remove();
        listaTareas = listaTareas.filter((t) => t.texto !== texto);
        guardarEnLocalStorage();
        actualizarEstadisticas();
    };

    tarjeta.querySelector('.boton-editar').onclick = () => {
        const nuevoTexto = prompt('Edita tu tarea:', texto);
        if (nuevoTexto?.trim()) {
            tareaEnLista.texto = nuevoTexto.trim();
            spanNombre.textContent = nuevoTexto.trim();
            guardarEnLocalStorage();
        }
    };

    contenedorTareas.appendChild(tarjeta);
}

/* ========== Filtros ========== */

/**
 * Aplica visibilidad a las tarjetas según el filtro activo y el texto de búsqueda.
 * @param {string} tipoFiltro - 'todas' | 'pendientes' | 'completadas'
 * @param {string} [textoBusqueda=''] - Texto para filtrar por coincidencia
 */
function aplicarFiltros(tipoFiltro, textoBusqueda = '') {
    const tarjetas = contenedorTareas.querySelectorAll(':scope > div');
    const textoBusquedaLower = textoBusqueda.toLowerCase();

    tarjetas.forEach((tarjeta) => {
        const estaCompletada = tarjeta.querySelector('.nombre')?.classList.contains('line-through');
        const coincideBusqueda = !textoBusquedaLower || tarjeta.innerText.toLowerCase().includes(textoBusquedaLower);

        const visiblePorFiltro =
            tipoFiltro === 'todas' ||
            (tipoFiltro === 'completadas' && estaCompletada) ||
            (tipoFiltro === 'pendientes' && !estaCompletada);

        tarjeta.style.display = visiblePorFiltro && coincideBusqueda ? 'flex' : 'none';
    });
}

botonesFiltro.forEach((boton) => {
    boton.onclick = () => {
        botonesFiltro.forEach((b) => b.classList.remove('activo', 'bg-primary', 'text-white'));
        boton.classList.add('activo', 'bg-primary', 'text-white');

        const tipoFiltro = boton.innerText.toLowerCase();
        aplicarFiltros(tipoFiltro, inputBuscador.value);
    };
});

inputBuscador.addEventListener('input', (evento) => {
    const botonActivo = document.querySelector('.menu li.activo');
    const tipoFiltro = botonActivo ? botonActivo.innerText.toLowerCase() : 'todas';
    aplicarFiltros(tipoFiltro, evento.target.value);
});

/* ========== Estadísticas ========== */

/**
 * Actualiza los números mostrados en el panel de estadísticas.
 */
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

/* ========== Borrar completadas ========== */

document.querySelector('#btn-borrar-completas').onclick = () => {
    listaTareas = listaTareas.filter((t) => !t.completada);
    guardarEnLocalStorage();
    contenedorTareas.innerHTML = '';
    listaTareas.forEach((t) => renderizarTarea(t.texto, t.completada));
    actualizarEstadisticas();

    const botonActivo = document.querySelector('.menu li.activo');
    const tipoFiltro = botonActivo ? botonActivo.innerText.toLowerCase() : 'todas';
    aplicarFiltros(tipoFiltro, inputBuscador.value);
};
