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

---

## Arquitectura de carpetas

```
taskflow-project/
├── index.html              # Estructura principal de la UI
├── app.js                  # Lógica del frontend
├── style.css               # CSS generado por Tailwind
├── diseno.css              # Fuente de estilos Tailwind
├── src/
│   └── api/
│       └── client.js       # Capa de red: todas las llamadas fetch al backend
├── server/
│   ├── package.json
│   └── src/
│       ├── index.js                    # Punto de entrada del servidor
│       ├── config/
│       │   └── env.js                  # Carga .env y valida que PORT exista
│       ├── routes/
│       │   └── task.routes.js          # Mapeo de URLs y verbos HTTP
│       ├── controllers/
│       │   └── task.controller.js      # Validación y respuestas HTTP
│       └── services/
│           └── task.service.js         # Lógica pura de tareas (sin HTTP)
└── docs/
    ├── fase-c-pruebas-red.md
    ├── backend-api.md
    └── ai/
```

---

## Cómo arrancar el backend

**1.** Entra en la carpeta del servidor:
```bash
cd server
```

**2.** Crea un archivo `.env` dentro de `server/` con este contenido:
```
PORT=3000
```

**3.** Instala las dependencias y arranca:
```bash
npm install
npm run dev
```

Deberías ver en la terminal:
```
Servidor en http://localhost:3000
```

Con el servidor corriendo, abre `index.html` en el navegador y las tareas se cargarán automáticamente desde la API.

---

## Middlewares

El servidor usa tres middlewares globales que se ejecutan en orden para cada petición:

**`cors()`** — Permite que el frontend (que corre en un puerto distinto) pueda comunicarse con el backend sin que el navegador lo bloquee.

**`express.json()`** — Transforma el cuerpo crudo de las peticiones HTTP en objetos JavaScript utilizables dentro de `req.body`. Sin este middleware, los datos que envía el frontend llegarían como texto ilegible.

**Middleware de errores (4 parámetros)** — Vive al final de `index.js`. Express lo reconoce como manejador de errores por tener exactamente 4 parámetros `(err, req, res, next)`. Si el error es `NOT_FOUND` devuelve un 404; para cualquier otro fallo devuelve un 500 con un mensaje genérico, sin filtrar detalles técnicos al cliente.

---

## API REST — Ejemplos de uso

URL base: `http://localhost:3000/api/v1/tasks`

**Obtener todas las tareas**
```
GET /api/v1/tasks
Respuesta: 200 — array de tareas
```

**Crear una tarea**
```
POST /api/v1/tasks
Content-Type: application/json

{ "texto": "Comprar pan", "categoria": "Casa" }

Respuesta: 201 — tarea creada con su id
```

**Editar una tarea**
```
PATCH /api/v1/tasks/1
Content-Type: application/json

{ "completada": true }

Respuesta: 200 — tarea actualizada
```

**Eliminar una tarea**
```
DELETE /api/v1/tasks/1
Respuesta: 204 — sin cuerpo
```

**Errores posibles**
- `400` — datos inválidos (texto vacío, id no numérico...)
- `404` — tarea no encontrada
- `500` — error interno del servidor
