# Backend API — Herramientas del ecosistema

## Axios

Es una librería de JavaScript para hacer peticiones HTTP, igual que `fetch` pero con algunas ventajas.

**Por qué se usa:**
- Convierte automáticamente la respuesta a JSON, sin tener que llamar a `.json()` manualmente
- Si el servidor devuelve un error (400, 500...), Axios lo lanza directamente como error, sin tener que comprobarlo tú con `if (!response.ok)`
- Funciona tanto en el navegador como en Node.js, con la misma sintaxis

En este proyecto usé `fetch` nativo porque no necesitaba instalar nada extra, pero en proyectos más grandes Axios ahorra bastante código repetitivo.


## Postman

Es una aplicación de escritorio para probar APIs REST sin necesidad de escribir código.

**Por qué se usa:**
- Puedes enviar peticiones GET, POST, PATCH, DELETE con un formulario visual
- Guarda las peticiones en colecciones para repetirlas cuando quieras
- Muestra la respuesta del servidor con colores y formato, fácil de leer
- Permite simular errores cambiando los datos del cuerpo

En este proyecto usé Thunder Client, que es lo mismo pero dentro de Cursor. El procedimiento es idéntico.


## Sentry

Es una plataforma online que captura errores en producción en tiempo real y avisa al equipo.

**Por qué se usa:**
- Cuando un usuario real encuentra un error en la aplicación, Sentry lo registra automáticamente con toda la información: qué pasó, en qué línea, en qué navegador
- Sin Sentry, los errores en producción son invisibles a menos que el usuario los reporte
- Envía notificaciones por correo o Slack cuando algo falla

En desarrollo local no hace falta porque ves los errores directamente en la consola. Pero en una aplicación real con usuarios reales, es imprescindible.


## Swagger

Es una herramienta para documentar APIs REST de forma interactiva.

**Por qué se usa:**
- Genera una página web donde se pueden ver todos los endpoints de la API: qué URL tienen, qué datos esperan y qué devuelven
- Desde esa misma página se pueden hacer peticiones de prueba, como si fuera Postman pero integrado en la propia API
- Sirve para que otros desarrolladores entiendan cómo usar tu API sin tener que leer el código

En este proyecto la API es pequeña y la documenté en el README y en `fase-c-pruebas-red.md`. En una API con muchos endpoints, Swagger evita tener que mantener la documentación a mano.


## Conclusión

Las cuatro herramientas resuelven problemas distintos: Axios facilita las peticiones, Postman ayuda a probarlas, Sentry detecta errores en producción y Swagger las documenta. En proyectos reales se suelen usar todas juntas.
