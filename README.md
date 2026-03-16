##Proyecto Taskflow##
TaskFlow es una aplicación de gestión de tareas.
El objetivo es ofrecer una interfaz funcional y rápida para la organización de pendientes, compatible con entornos de escritorio y dispositivos móviles.

**Funcionalidades implementadas**

- Gestión de tareas: Inserción y eliminación individual
- Estados: Marcado de tareas completadas con cambio visual de estilo (tachado y opacidad).
- Sistema de filtros: Visualización segmentada por "Todas", "Pendientes" o "Completadas".
- Panel de control: Contador dinámico de tareas totales y pendientes en la barra lateral.
- Persistencia de datos: Uso de LocalStorage para mantener la lista tras recargar la página.
- Interfaz adaptativa: Implementación de modo oscuro y diseño responsive.

**Tecnologías utilizadas**

- HTML5: Estructura de la aplicación.
- Tailwind CSS: Estilizado mediante clases utilitarias y manejo de breakpoints para móvil.
- JavaScript (ES6): Manipulación del DOM, gestión de eventos y lógica de filtrado.
- LocalStorage API: Almacenamiento persistente en el navegador.

**Notas de desarrollo**
El principal reto técnico fue la sincronización de las estadísticas, se implementó una función de actualización global que se ejecuta tras cada modificación del array de tareas (añadir, borrar o cambiar estado) para garantizar la integridad de los contadores.
Tambien se configuró la detección de preferencias de color del sistema y su almacenamiento para que el modo oscuro sea persistente entre sesiones.

**Pruebas de funcionamiento**

- Persistencia: Verificación de guardado de datos tras cierre de sesión
- Validación: Control de errores en inputs vacíos
- Responsive Design: Comprobación de flujo de elementos en resoluciones móviles.
- Lógica de filtros: Validación de renderizado condicional según el estado de la tarea.
