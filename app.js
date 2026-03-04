const Formulario = document.querySelector('#formulario');
const cajaTexto = document.querySelector('#espacio-escribir');
const lugarTareas = document.querySelector('#agregar-tareas');

// crear el array
let listaTareas = [];

// se ejecuta la carga
window.onload = function() {
    const memoria = localStorage.getItem('mis_tareas');
    if (memoria) {
        listaTareas = JSON.parse(memoria);
        listaTareas.forEach(function(tarea) {
            agregarTarea(tarea.texto, tarea.completada);
        });
    }
};

// guardar 
function guardarCambios() {
    localStorage.setItem('mis_tareas', JSON.stringify(listaTareas));
}

// añadir y guardar tareas
Formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();
    const textoTarea = cajaTexto.value;

    if (textoTarea !== "") {
        const objetoTarea = { texto: textoTarea, completada: false };
        listaTareas.push(objetoTarea);
        
        agregarTarea(textoTarea, false);

        guardarCambios();
        cajaTexto.value = '';
    }
});

function agregarTarea(texto, estado) {
    const nuevaTarea = document.createElement('div');
    nuevaTarea.className = 'tarjeta';

    nuevaTarea.innerHTML = `
        <div class="tarea">
            <span class="nombre ${estado ? 'completada' : ''}">${texto}</span>
        </div>
        <button class="boton-borrar">X</button>
    `; 
    
    // tachar la tarea
    const nombreTarea = nuevaTarea.querySelector('.nombre');
    nombreTarea.onclick = function() {
        nombreTarea.classList.toggle('completada');
        
        listaTareas.forEach(function(tarea) {
            if (tarea.texto === texto) {
                tarea.completada = !tarea.completada;
            }
        });
        guardarCambios();
    };
    
    // para borrar tareas
    const botonBorrar = nuevaTarea.querySelector('.boton-borrar');    
    botonBorrar.onclick = function() { 
        nuevaTarea.remove(); 
       //borrar del array
        listaTareas = listaTareas.filter(function(tarea) {
            return tarea.texto !== texto;
        });
        guardarCambios();
    };

    lugarTareas.appendChild(nuevaTarea);
}

// filtros 
const botonesFiltro = document.querySelectorAll('.menu li');
botonesFiltro.forEach(function(boton) {
    boton.onclick = function() {
        const anteriorActivo = document.querySelector('.menu li.activo');
        if (anteriorActivo) { anteriorActivo.classList.remove('activo'); }
        boton.classList.add('activo');

        const filtro = boton.innerText.toLowerCase();
        const todasTareas = document.querySelectorAll('.tarjeta');

        todasTareas.forEach(function(tarjeta) {
            const tachada = tarjeta.querySelector('.nombre').classList.contains('completada');
            if (filtro === 'completadas') {
                tarjeta.style.display = tachada ? 'flex' : 'none';
            } else if (filtro === 'pendientes') {
                tarjeta.style.display = !tachada ? 'flex' : 'none';
            } else {
                tarjeta.style.display = 'flex';
            }
        });
    };
});

