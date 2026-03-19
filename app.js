// Referencias al DOM
const formTareas = document.querySelector('#formulario');
const inputNuevaTarea = document.querySelector('#espacio-escribir');
const selectCategoria = document.querySelector('#select-categoria');
const contenedorTareas = document.querySelector('#agregar-tareas');
const inputBuscador = document.querySelector('#buscador-input');
const botonesFiltro = document.querySelectorAll('.menu li');
const botonesCategoria = document.querySelectorAll('.menu-categorias li');

/** @type {Array<{texto: string, completada: boolean, categoria: string}>} */
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
        const categoria = tarea.categoria || 'Casa';
        renderizarTarea(tarea.texto, tarea.completada, categoria);
    });
}

/* ========== Formulario de nueva tarea ========== */

// Escucha el evento 'submit' del formulario de tareas
formTareas.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const texto = inputNuevaTarea.value.trim();
    if (!texto) {
        alert('Por favor escribe una tarea antes de añadir.');
        return;
    }
    const categoria = selectCategoria.value;
    listaTareas.push({ texto, completada: false, categoria });
    renderizarTarea(texto, false, categoria);
    guardarEnLocalStorage();
    actualizarEstadisticas();
    inputNuevaTarea.value = '';
});

/* ========== Renderizado de tareas ========== */

/**
 * Crea y agrega una tarjeta de tarea al DOM.
 * @param {string} texto - Contenido de la tarea
 * @param {boolean} completada - Si la tarea está completada
 * @param {string} [categoria='Casa'] - Categoría de la tarea (Casa, Trabajo, Ocio)
 */
function renderizarTarea(texto, completada, categoria = 'Casa') {
    const clasesCompletada = completada ? 'line-through opacity-60 text-gray-400' : '';
    const tarjeta = document.createElement('div');
    tarjeta.className = 'flex justify-between items-center bg-white p-[15px_20px] rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:bg-gray-800 transition-all';
    tarjeta.dataset.categoria = categoria;

    tarjeta.innerHTML = `
        <div class="tarea flex items-center gap-[15px] flex-1 min-w-0">
            <span class="nombre cursor-pointer dark:text-white ${clasesCompletada}">${texto}</span>
            <span class="badge-categoria text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary dark:bg-purple-500/30 dark:text-purple-300 shrink-0">${categoria}</span>
        </div>
        <div class="flex gap-2 shrink-0">
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
        const tareaRef = listaTareas.find((t) => t.texto === texto && t.categoria === categoria);
        listaTareas = listaTareas.filter((t) => t !== tareaRef);
        guardarEnLocalStorage();
        actualizarEstadisticas();
    };

    // Al hacer clic en editar: abre un prompt, actualiza el texto en la lista y en pantalla, y guarda los cambios
    tarjeta.querySelector('.boton-editar').onclick = () => {
        const nuevoTexto = prompt('Edita tu tarea:', texto);
        if (nuevoTexto?.trim()) {
            tareaEnLista.texto = nuevoTexto.trim();
            spanNombre.textContent = nuevoTexto.trim();
            guardarEnLocalStorage();
        }
    };

    // Actualizar referencia por si el objeto tareaEnLista no tiene categoria todavía (tareas antiguas)
    if (!tareaEnLista.categoria) tareaEnLista.categoria = categoria;

    contenedorTareas.appendChild(tarjeta);
}

/* ========== Filtros ========== */

/**
 * Aplica visibilidad a las tarjetas según filtros de estado, categoría y búsqueda.
 * @param {string} tipoFiltro - 'todas' | 'pendientes' | 'completadas'
 * @param {string} [categoriaFiltro='todas'] - 'todas' | 'casa' | 'trabajo' | 'ocio'
 * @param {string} [textoBusqueda=''] - Texto para filtrar por coincidencia
 */
function aplicarFiltros(tipoFiltro, categoriaFiltro = 'todas', textoBusqueda = '') {
    const tarjetas = contenedorTareas.querySelectorAll(':scope > div');
    const textoBusquedaLower = textoBusqueda.toLowerCase();

    tarjetas.forEach((tarjeta) => {
        const estaCompletada = tarjeta.querySelector('.nombre')?.classList.contains('line-through');
        const categoria = (tarjeta.dataset.categoria || 'casa').toLowerCase();
        const coincideBusqueda = !textoBusquedaLower || tarjeta.innerText.toLowerCase().includes(textoBusquedaLower);

        const visiblePorEstado =
            tipoFiltro === 'todas' ||
            (tipoFiltro === 'completadas' && estaCompletada) ||
            (tipoFiltro === 'pendientes' && !estaCompletada);

        const visiblePorCategoria = categoriaFiltro === 'todas' || categoria === categoriaFiltro.toLowerCase();

        tarjeta.style.display = visiblePorEstado && visiblePorCategoria && coincideBusqueda ? 'flex' : 'none';
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
    listaTareas.forEach((t) => renderizarTarea(t.texto, t.completada, t.categoria || 'Casa'));
    actualizarEstadisticas();

    const botonFiltroActivo = document.querySelector('.menu li.activo');
    const categoriaActiva = document.querySelector('.menu-categorias li.categoria-activo');
    const tipoFiltro = botonFiltroActivo ? botonFiltroActivo.innerText.toLowerCase() : 'todas';
    const categoriaFiltro = categoriaActiva ? categoriaActiva.innerText.toLowerCase() : 'todas';
    aplicarFiltros(tipoFiltro, categoriaFiltro, inputBuscador.value);
};