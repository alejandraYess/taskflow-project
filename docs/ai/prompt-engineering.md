### PUNTO 4, TAREA 2
**Limpieza y mejora del código (Refactorización)**
Usé la IA de cursor para darle una limpieza general a mi archivo app.js, para que el código se vea más ordenado y profesional.
**Cambios que hice**
* Validación con Alert: al agregar una tarea vacía sale el aviso de "alert".
* Comentarios JSDoc: Le pedí a la IA que pusiera esos bloques de comentarios arriba de las funciones para explicar qué hace cada una.
* Explicación línea a línea: Hice que la IA me explicara el formulario paso a paso. Así entendí mejor para qué sirve el "preventDefault" y cómo se guardan las cosas en el LocalStorage.
**Conclusión** 
Refactorizar con la IA me ayudó a organizar todo por secciones. Aprendí que es igual de importante que el código funcione y que esté bien explicado. 

---

### PUNTO 6, TAREA 2
**Prompts con rol**
" Le pedí a la IA que actuara como desarrollador senior y me explicara la función guardarEnLocalStorage. La respuesta fue más técnica y con sugerencias de mejora que no suele dar por defecto.

* Prompts con ejemplos (few-shot)
Probé pidiendo nombres de variables en español y le di ejemplos: listaUsuarios en vez de userList, esValido en vez de isValid. También probé con comentarios. Al dar ejemplos, la IA respetó mejor el estilo que quería.

* Razonamiento paso a paso
Le pregunté que explicara paso a paso cómo funciona querySelector en app.js. En lugar de una explicación corta, fue desglosando cada parte, lo que ayudó a entender mejor.

* Restricciones claras
Le pedí que listara las funciones de app.js, solo los nombres, uno por línea, sin explicaciones. La respuesta fue exactamente eso.

* Aplicar prompts al proyecto 
Usé prompts para generar JSDoc, refactorizar funciones y generar código nuevo. La IA aplicó los cambios según las instrucciones.

---

# 10 prompts útiles
## 1. Rol definido
**Prompt:** "Actúa como un desarrollador senior. Explícame qué hace la función guardarEnLocalStorage y si se puede mejorar."
**Por qué funciona:** La IA adopta un tono más técnico y da sugerencias de mejora que no daría sin el rol.

## 2. Rol de profesor
**Prompt:** "Actúa como un profesor de JavaScript. Explícame closures con un ejemplo simple."
**Por qué funciona:** Adapta el nivel de explicación para que sea didáctico y fácil de seguir.

## 3. Rol de reviewer
**Prompt:** "Actúa como un reviewer de código. Revisa la función renderizarTarea y dime si hay problemas."
**Por qué funciona:** Enfoca la respuesta en errores, buenas prácticas y posibles mejoras.

## 4. Few-shot: comentarios
**Prompt:** "Quiero comentarios así: Ejemplo 1: // Suma dos números. Ejemplo 2: // Verifica si está logueado. Pon un comentario así encima de actualizarEstadisticas."
**Por qué funciona:** Los ejemplos muestran el formato exacto que quieres, la IA lo imita.

## 5. Few-shot: nombres en español
**Prompt:** "Quiero nombres en español. Ejemplo: listaUsuarios en vez de userList. Ejemplo: esValido en vez de isValid. Sugiere un nombre para una variable que guarda si una tarea está completada."
**Por qué funciona:** Los ejemplos fijan el estilo y evitan respuestas en inglés.

## 6. Razonamiento paso a paso
**Prompt:** "Explícame paso a paso cómo funciona querySelector en app.js. Primero cada parte, luego el resultado."
**Por qué funciona:** Obliga a la IA a desglosar el proceso y facilita entender.

## 7. Razonamiento para errores
**Prompt:** "Tengo un error en mi código. Explícame paso a paso qué está mal y por qué, y al final la corrección."
**Por qué funciona:** Ayuda a aprender en lugar de solo copiar la solución.

## 8. Restricción: respuesta corta
**Prompt:** "Explícame qué hace localStorage en mi proyecto. Máximo 3 oraciones, en español."
**Por qué funciona:** Evita respuestas largas y mantiene lo esencial.

## 9. Restricción: solo lista
**Prompt:** "Lista las funciones de app.js. Solo los nombres, uno por línea, sin explicaciones."
**Por qué funciona:** Cuando sabes exactamente qué formato quieres, la IA respeta mejor.

## 10. Para documentar
**Prompt:** "Añade JSDoc a la función aplicarFiltros. Usa el mismo formato que guardarEnLocalStorage."
**Por qué funciona:** Combinas restricción (formato) con referencia (una función existente).

## 11. Para refactorizar
**Prompt:** "Refactoriza actualizarEstadisticas para que sea más legible. Mantén la misma lógica."
**Por qué funciona:** El rol implícito + la restricción "misma lógica" evita cambios no deseados.

## 12. Para generar código
**Prompt:** "Genera una función que cuente cuántas tareas hay por categoría. Solo el código, sin explicación."
**Por qué funciona:** La restricción "solo código" reduce texto innecesario y acelera.
