##PUNTO 3, TAREA 2
## Cursor y herramientas de IA

**Autocompletado " Tab"**
Escribí un comentario sobre tareas "urgentes" y me salió un código en gris, pulsé "Tab" y se escribió todo el codigo. No fue necesario escribir nada, la ia directamente entendió la logica y lo hizo por ella misma.
**Uso del Composer para cambios grandes**
Le pedí que me hiciera un pie de página (footer) para el proyecto.
Lo que más me gustó es que el Composer buscó solo las clases de Tailwind. No tuve que buscar colores, él puso el modo oscuro y claro correctamente sin que yo se lo pidiera.


##PUNTO 5, TAREA 2
## Configuración de MCP
MCP es un protocolo que conecta Cursor con herramientas externas, como el sistema de archivos. Sirve para que la IA pueda leer, buscar y revisar archivos del proyecto sin que tengas que copiarlos tú.

**Pasos de instalación**
1. Creé la carpeta .cursor en la raíz del proyecto y dentro de esta el archivo mcp.json
2. Pegué la configuración del servidor filesystem con la ruta de mi proyecto y reinicié cursor para que se cargara el servidor
3. Probé haciendo consultas en el chat
**Consultas**
1. ¿Cuántas líneas tiene app.js?: 214 líneas.
2. Buscar "localStorage":  Aparece en app.js e index.html
3. ¿Qué funciones hay en app.js?: 5 funciones principales
4. Listar archivos en docs: 5 archivos en docs/ai
5. ¿Qué colores hay en diseno.css?: 6 variables de color
**Conclusión**
MCP ayuda cuando el proyecto tiene muchos archivos: la IA puede buscar textos, contar líneas o revisar estructura sin que tengas que abrir cada archivo. También sirve para conectar bases de datos, GitHub u otros servicios. 


