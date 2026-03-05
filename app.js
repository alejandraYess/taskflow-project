const Formulario = document.querySelector('#formulario');
const cajaTexto = document.querySelector('#espacio-escribir');
const lugarTareas = document.querySelector('#agregar-tareas');

let listaTareas = [];

window.onload = function() {
    const memoria = localStorage.getItem('mis_tareas');
    if (memoria) {
        listaTareas = JSON.parse(memoria);
         listaTareas.forEach(function(tarea) {
            agregarTarea(tarea.texto, tarea.completada);
        });
    }
};

function guardarCambios() {
    localStorage.setItem('mis_tareas', JSON.stringify(listaTareas));
}

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
    nuevaTarea.className = 'flex justify-between items-center bg-white p-[15px_20px] rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:bg-gray-800 transition-all';

    nuevaTarea.innerHTML = `
        <div class="tarea flex items-center gap-[15px]">
            <span class="nombre cursor-pointer dark:text-white ${estado ? 'line-through opacity-60 text-gray-400' : ''}">${texto}</span>
        </div>
         <button class="boton-borrar text-red-500 font-bold text-[1.2rem] ml-[10px] hover:scale-110 transition-transform">X</button>
    `; 
    
    const nombreTarea = nuevaTarea.querySelector('.nombre');
    nombreTarea.onclick = function() {
        nombreTarea.classList.toggle('line-through');
        nombreTarea.classList.toggle('opacity-60');
        nombreTarea.classList.toggle('text-gray-400');
        
        listaTareas.forEach(function(tarea) {
             if (tarea.texto === texto) {
                tarea.completada = !tarea.completada;
            }
        });
        guardarCambios();
    };
    
    const botonBorrar = nuevaTarea.querySelector('.boton-borrar');     
    botonBorrar.onclick = function() { 
        nuevaTarea.remove(); 
        listaTareas = listaTareas.filter(function(tarea) {
            return tarea.texto !== texto;
        });
        guardarCambios();
    };

    lugarTareas.appendChild(nuevaTarea);
}

    const botonesFiltro = document.querySelectorAll('.menu li');
    botonesFiltro.forEach(function(boton) {
      boton.onclick = function() {

        botonesFiltro.forEach(function(b) {
            b.classList.remove('activo', 'bg-primary', 'text-white');
        });

        boton.classList.add('activo', 'bg-primary', 'text-white');

        const filtro = boton.innerText.toLowerCase();
        const todasTareas = lugarTareas.children;

        Array.from(todasTareas).forEach(function(tarjeta) {
            const tachada = tarjeta.querySelector('.nombre').classList.contains('line-through');
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

