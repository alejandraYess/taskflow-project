# TaskFlow

Aplicación web de gestión de tareas con interfaz limpia y diseño responsive. Organiza tus pendientes por categorías, filtra por estado y ordena como prefieras.

## Descripción

TaskFlow permite crear, editar y eliminar tareas de forma intuitiva. Las tareas se organizan en categorías (Casa, Trabajo, Ocio), pueden marcarse como completadas y se sincronizan con la API REST del backend (no se guardan en localStorage).

## Funcionalidades

- **Gestión de tareas:** Añadir, editar y eliminar tareas individuales
- **Categorías:** Asignar cada tarea a Casa, Trabajo u Ocio al crearla o cambiarla después
- **Estados:** Marcar tareas como completadas (tachado visual)
- **Filtros:** Ver Todas, solo Pendientes o solo Completadas
- **Filtro por categoría:** Mostrar tareas de una categoría concreta
- **Búsqueda:** Buscar tareas por texto
- **Ordenación:** Más recientes, más antiguas, A-Z o Z-A
- **Confirmación:** Diálogo de confirmación antes de borrar todas las completadas
- **Mensaje vacío:** Indicación cuando no hay tareas
- **Estadísticas:** Contador de total, completadas y pendientes
- **Modo oscuro:** Tema oscuro persistente entre sesiones
- **Responsive:** Adaptado a móvil y escritorio

## Tecnologías

- HTML5
- Tailwind CSS
- JavaScript (ES6)
- API REST (`fetch`) y backend Node/Express

## Estructura del proyecto

```
taskflow-project/
├── index.html    # Estructura principal
├── app.js        # Lógica de la aplicación
├── style.css     # CSS generado por Tailwind
├── diseno.css    # Fuente de estilos (Tailwind)
└── docs/ai/      # Documentación de IA
```

## Cómo ejecutar

1. Clona el repositorio
2. Abre `index.html` en el navegador

**Desarrollo:** Si modificas estilos, ejecuta `npm install` y luego `npm run build` para regenerar `style.css`.

## Ejemplos de uso

- **Añadir una tarea:** Escribe el texto en el campo de entrada, elige una categoría (Casa, Trabajo u Ocio) y pulsa "añadir".
- **Marcar como completada:** Haz clic sobre el texto de la tarea para alternar entre pendiente y completada.
- **Editar una tarea:** Pulsa el botón ✏️ junto a la tarea e introduce el nuevo texto en el diálogo.
- **Cambiar la categoría:** Usa el desplegable que aparece en cada tarjeta para asignar la tarea a otra categoría sin editar el texto.
- **Filtrar por estado:** Usa los botones "Todas", "Pendientes" o "Completadas" en la barra lateral.
- **Filtrar por categoría:** Pulsa "Casa", "Trabajo" u "Ocio" en la sección Categorías para ver solo esas tareas.
- **Buscar:** Escribe en el campo "Buscar tarea..." para filtrar por coincidencia de texto.
- **Ordenar:** Usa el desplegable "Ordenar" para mostrar las tareas por más recientes, más antiguas, A-Z o Z-A.
- **Borrar completadas:** Pulsa "Borrar completadas" y confirma en el diálogo para eliminar todas las tareas marcadas como completadas.
- **Modo oscuro:** Pulsa el botón "Modo oscuro" en la cabecera para alternar entre tema claro y oscuro.
