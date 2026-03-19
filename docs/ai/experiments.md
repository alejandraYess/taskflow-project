## PUNTO 3, TAREA 2
# Experimentos con la IA

## Filtro de urgencia en JS
Quise ver si la IA era capaz de inventar una función que no estaba en mi plan. Puse el comentario y me dio un código con `includes` que funcionó perfecto con mi lista de tareas. Fue un éxito porque no tuve que buscar la lógica en ningún lado, la IA me la dio al instante.

## Diseño de Footer automático
Probé si la IA entendía el estilo de mi página al pedirle un pie de página. Me sorprendió que puso `dark:text-white` ella sola. No le tuve que explicar que mi proyecto tenía modo oscuro.

## PUNTO 7
# 3 Problemas de programacion sin ia/con ia 

## 1.Formatear un precio:  Recibir 10932.8 y devolver "10,932.80" 
* sin ia: Busqué en Google "formatear número con comas javascript" y usé toLocaleString

function formatearPrecio(num) {
    return num.toLocaleString('es', { minimumFractionDigits: 2 });
}
* con ia: Crea una función en JavaScript que formatee 10932.8 como 10,932.80 (con comas y 2 decimales) 
function formatearPrecio(numero) {
    return numero.toLocaleString('es-ES', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    });
}
formatearPrecio(10932.8);  // "10.932,80" o "10,932.80" según configuración



## 2.Quitar espacios extra: " hola mundo " → "hola mundo"
* sin ia: Busqué "quitar espacios vacíos array javascript" y encontré filter y hice:

function quitarEspacios(texto) {
    return texto.trim().split(" ").filter(palabra => palabra !== "").join(" ");
}
Funcionó pero no sabía bien qué hacía filter hasta que lo leí.
* con ia: Función que convierta ' hola mundo ' en 'hola mundo', quitando espacios

function quitarEspaciosExtra(texto) {
    return texto.trim().split(/\s+/).join(' ');
}
quitarEspaciosExtra('  hola   mundo  ');  // "hola mundo"

## 3.Verificar si solo hay números: "12345" → true, "12a34" → false

* sin ia: Busqué "verificar si string tiene solo números js". Probé Number() y isNaN pero fallaba con "12a34". Intenté un for recoriendo cada letra y usando isNaN(parseInt(caracter)) pero me equivocaba con los espacios. Al final algo así:

function soloNumeros(texto) {
    if (texto === "") return false;
    for (let i = 0; i < texto.length; i++) {
        if (isNaN(parseInt(texto[i])) && texto[i] !== " ") return false;
    }
    return true;
}

* con ia: Función que devuelva true si un string tiene solo números y false si tiene letra

function soloNumeros(texto) {
    if (texto === '') return false;
    for (let i = 0; i < texto.length; i++) {
        if (texto[i] < '0' || texto[i] > '9') return false;
    }
    return true;
}

## Concluisión: 
Sin IA tardaba entre 15 y 20 minutos por problema y el código era más largo y difícil de entender. Con IA resolví cada uno en unos 2 minutos y el código era más corto y claro. Lo que más me costó sin IA fue saber qué métodos usar y cómo combinarlos. Con IA obtuve la solución rápido, pero para entenderla bien tuve que leer la explicación. En mi opinion es mejor es usar la IA para avanzar y luego revisar el código para aprender qué hace cada parte.


## 3 Problemas de Proyecto-TaskFlow sin ia / con ia

## 1.Mostrar en estadísticas cuántas tareas hay en Casa, Trabajo y Ocio (ej: Casa: 2, Trabajo: 3, Ocio: 1)
* sin ia: Busqué cómo agrupar un array por propiedad. Probé con filter varias veces (una por categoría) y armé algo así:

const casa = listaTareas.filter(t => t.categoria === 'Casa').length;
const trabajo = listaTareas.filter(t => t.categoria === 'Trabajo').length;
const ocio = listaTareas.filter(t => t.categoria === 'Ocio').length;

* con ia: En mi proyecto TaskFlow en app.js quiero mostrar cuántas tareas hay por categoría (Casa, Trabajo, Ocio) en el panel de estadísticas. Genérame el código

function tareasPorCategoria() {
    const casa = listaTareas.filter(t => t.categoria === 'Casa').length;
    const trabajo = listaTareas.filter(t => t.categoria === 'Trabajo').length;
    const ocio = listaTareas.filter(t => t.categoria === 'Ocio').length;
    return { casa, trabajo, ocio };
}

## 2.Al hacer clic en "Borrar completadas", que salga un mensaje "¿Estás seguro?" y solo borre si el usuario confirma

* sin ia: confirm() devuelve true o false. Busqué ejemplos y probé envolver el código del botón en un if (confirm('¿Seguro?')). Me costó ver dónde ponerlo 

* con ia: En el botón borrar completadas de TaskFlow, añade un confirm que pregunte ¿Estás seguro? antes de borrar. Solo borrar si el usuario acepta

  document.querySelector('#btn-borrar-completas').onclick = () => {
    if (!confirm('¿Estás seguro de borrar las tareas completadas?')) return;
    listaTareas = listaTareas.filter((t) => !t.completada);
    guardarEnLocalStorage();
    // ... resto del código
};  

## 3.Si la lista está vacía, mostrar "No hay tareas, añade una arriba"

* sin ia: Pensé en un if (listaTareas.length === 0) y crear un div con el mensaje. No sabía bien si ponerlo en actualizarEstadisticas o en otro sitio. Probé y a veces se duplicaba el mensaje al añadir y borrar

* con ia: En TaskFlow, cuando no hay tareas, muestra un mensaje 'No hay tareas, añade una arriba' en el contenedor de tareas

if (listaTareas.length === 0) {
    contenedorTareas.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center py-8">No hay tareas, añade una arriba</p>';
} else {
    contenedorTareas.innerHTML = '';
    listaTareas.forEach((t) => renderizarTarea(t.texto, t.completada, t.categoria || 'Casa'));
}

## Conclución
Sin IA tardaba entre 20 y 30 min por tarea y dudaba dónde poner el código. Con IA cada tarea me llevó entre 3 y 5 min y me explicó en qué función o evento colocarlo. Para tareas de mi propio proyecto, la IA entendió la estructura (listaTareas, contenedorTareas, etc.) y me dio código que encajaba con lo que ya tenía.


