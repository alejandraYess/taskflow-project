## PUNTO 3, TAREA 2
# Experimentos con la IA

## Filtro de urgencia en JS
Quise ver si la IA era capaz de inventar una función que no estaba en mi plan. Puse el comentario y me dio un código con `includes` que funcionó perfecto con mi lista de tareas. Fue un éxito porque no tuve que buscar la lógica en ningún lado, la IA me la dio al instante.

## Diseño de Footer automático
Probé si la IA entendía el estilo de mi página al pedirle un pie de página. Me sorprendió que puso `dark:text-white` ella sola. No le tuve que explicar que mi proyecto tenía modo oscuro.

## PUNTO 7
# 3 Problemas de programacion sin ia 

## 1.Formatear un precio:  Recibir 10932.8 y devolver "10,932.80" 
Busqué en Google "formatear número con comas javascript" y usé toLocaleString
## javascript
function formatearPrecio(num) {
    return num.toLocaleString('es', { minimumFractionDigits: 2 });
}

## 2. Quitar espacios extra: " hola mundo " → "hola mundo"
Busqué "quitar espacios vacíos array javascript" y encontré filter y hice:
## 
function quitarEspacios(texto) {
    return texto.trim().split(" ").filter(palabra => palabra !== "").join(" ");
}
Funcionó pero no sabía bien qué hacía filter hasta que lo leí.
## 








