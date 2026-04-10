# Práctica 3 — Fase C, pruebas de red (Thunder Client)

Documento las peticiones que ejecuté contra la API con Thunder Client en el editor. Postman u otra herramienta similar sirve igual; el procedimiento es el mismo.

Incluí casos correctos y casos con datos inválidos para comprobar los códigos HTTP (200, 201, 204, 400, 404).

**Requisito:** backend en ejecución (`cd server`, `npm run dev`), URL base según `.env` (p. ej. `http://localhost:3000`).

---

## Peticiones

Las agrupé en una carpeta en Thunder para repetirlas al cambiar código.

**1. GET** `/api/v1/tasks` — Sin cuerpo. Esperado: **200**, array JSON (puede estar vacío).

**2. POST** `/api/v1/tasks` — `Content-Type: application/json`. Cuerpo:
```json
{ "texto": "Comprar pan", "categoria": "Casa" }
```
Esperado: **201**, tarea con `id` (útil para el DELETE siguiente).

**3. POST** mismo endpoint — Cuerpo `{}` o `{ "categoria": "Casa" }` (sin `texto`). Esperado: **400**, JSON con error de validación.

**4. POST** — `{ "texto": "   " }`. Esperado: **400**.

**5. POST** — `{ "texto": "Algo", "categoria": "" }`. Esperado: **400**.

**6. DELETE** `/api/v1/tasks/{id}` — `id` existente. Esperado: **204**, sin cuerpo.

**7. DELETE** `/api/v1/tasks/99999` (id inexistente). Esperado: **404** (servicio `NOT_FOUND`, middleware global → 404).

**8. DELETE** `/api/v1/tasks/abc` o `/api/v1/tasks/0`. Esperado: **400** (id entero positivo).

---

## Conclusión

Con esto verifiqué respuestas correctas y respuestas de error. La colección se puede exportar desde Thunder o documentar con capturas si lo pide el enunciado.

Las pruebas de códigos HTTP deben hacerse con el servidor activo; si no hay proceso escuchando, el fallo es de conexión, no de la lógica de la API.
