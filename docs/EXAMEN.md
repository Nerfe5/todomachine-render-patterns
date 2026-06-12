# 📝 Examen Final · Curso de Patrones de Render y Composición en React

Simulación del examen de Platzi al cierre del curso. **Este documento se construye progresivamente**: al terminar cada módulo agregamos 2–3 preguntas de opción múltiple sobre lo aprendido, con su explicación en la hoja de respuestas.

**Formato Platzi:** opción múltiple, una sola respuesta correcta, ~20 preguntas, sin límite de tiempo, se aprueba con la mayoría de aciertos.

---

## Estado de construcción

| Módulo | Preguntas | Estado |
|--------|-----------|--------|
| 1. Filosofía de React | 1–3 | ✅ listas |
| 2. Composición de componentes | 4–6 | ✅ listas |
| 3. Colocación del estado | — | ⬜ pendiente |
| 4. Render Props | — | ⬜ pendiente |
| 5. Higher-Order Components | — | ⬜ pendiente |
| 6. React Hooks | — | ⬜ pendiente |

---

## Preguntas

### Módulo 1 · Filosofía de React

### 1. En React, la expresión `UI = f(state)` significa que:

- A) La UI se actualiza manipulando directamente el DOM cuando cambia el estado
- B) La interfaz es el resultado de evaluar los componentes con el estado actual; para cambiar la UI, cambiamos el estado
- C) Cada componente debe tener una función llamada `f` que reciba el estado
- D) El estado solo puede modificarse desde funciones puras

### 2. ¿Por qué `newTodos[todoIndex].completed = true` después de `const newTodos = [...todos]` viola la inmutabilidad?

- A) Porque el spread operator no copia arrays, solo objetos
- B) Porque `findIndex` devuelve una copia del elemento, no el original
- C) Porque el spread hace una copia superficial: el array es nuevo, pero los objetos internos siguen siendo los mismos, y estamos mutando el original
- D) No la viola: al crear `newTodos` con spread, todo lo que contiene ya es una copia segura

### 3. ¿Cuál es la postura de React respecto a la herencia entre componentes?

- A) Se recomienda para compartir estilos entre componentes similares
- B) Es obligatoria al usar componentes de clase
- C) Se usa solo para los Higher-Order Components
- D) No se recomienda: la reutilización se logra con composición (children y props), que ofrece la misma flexibilidad con menos acoplamiento

### Módulo 2 · Composición de componentes

### 4. ¿Qué es la prop `children` en React?

- A) Un array con los componentes hijos declarados dentro del archivo del componente
- B) Una prop especial que contiene lo que se escribe entre las etiquetas de apertura y cierre del componente
- C) Un hook que permite acceder a los componentes hijos desde el padre
- D) Una propiedad del estado que guarda los subcomponentes renderizados

### 5. Según la división contenedor/presentacional, ¿cuál es la principal ventaja de un componente presentacional?

- A) Renderiza más rápido porque no usa estado
- B) Puede consumir varios contextos a la vez sin conflicto
- C) Al depender solo de sus props, es reutilizable en cualquier app y testeable sin montar providers
- D) React lo memoriza automáticamente para evitar re-renders

### 6. En el refactor del módulo, ¿por qué movimos el `useContext` de `TodoCounter` hacia `AppUI` en lugar de eliminarlo?

- A) Porque useContext solo puede llamarse una vez por aplicación
- B) Porque el acoplamiento al contexto no se elimina, se reubica: el contenedor es quien debe saber de datos, liberando a los presentacionales
- C) Porque AppUI re-renderiza menos que TodoCounter
- D) Porque los componentes con CSS propio no pueden usar useContext

> Las preguntas de los siguientes módulos se agregan aquí a su cierre.

<!--
Plantilla de pregunta:

### N. ¿Pregunta?

- A) Opción
- B) Opción
- C) Opción
- D) Opción
-->

---

## 🔑 Hoja de respuestas

> ⚠️ No hagas scroll hasta aquí antes de responder.

**1. Respuesta: B** — En React la UI es declarativa: describes cómo debe verse para cada estado y React se encarga del DOM. A es el enfoque imperativo (jQuery). C confunde la notación matemática con código literal. D habla de otra cosa (pureza), no del significado de la expresión.

**2. Respuesta: C** — `[...todos]` copia el array (las "cajas"), pero cada posición sigue apuntando al mismo objeto en memoria. Modificar `newTodos[todoIndex]` modifica también `todos[todoIndex]`. La solución inmutable es `todos.map(t => t.text === text ? { ...t, completed: true } : t)`. A es falso (spread funciona con arrays), B inventa un comportamiento de `findIndex` (devuelve un índice), D es exactamente el error conceptual que causa el bug.

**3. Respuesta: D** — El equipo de React es explícito: no han encontrado casos de uso donde recomienden jerarquías de herencia entre componentes. La composición (children, props) resuelve los mismos problemas con menos acoplamiento. Los HOCs (opción C) tampoco usan herencia: son funciones que envuelven componentes, pura composición.
**4. Respuesta: B** — `children` es la prop que React llena automáticamente con el contenido escrito entre `<Componente>` y `</Componente>`. Es la base del patrón de slots/containment: el componente define la estructura y proyecta lo que el padre le pase. A y D inventan mecanismos que no existen; C confunde con una API de hooks inexistente.

**5. Respuesta: C** — Un presentacional es una "función pura de sus props": mismas props, misma UI. Eso lo hace portable (cópialo a otra app y funciona) y trivial de probar. A es falso: usar o no estado no determina la velocidad de render. D confunde con `React.memo`, que es explícito, no automático.

**6. Respuesta: B** — La lección clave del módulo: alguien tiene que conocer los datos. La meta no es "cero useContext", sino ponerlo en la capa correcta (el contenedor), dejando a los presentacionales libres de dependencias. A es falso (useContext se usa donde haga falta), C es al revés (AppUI consume más contexto, re-renderiza igual o más), D es inventada.

<!--
Plantilla de respuesta:

**N. Respuesta: X** — Explicación de por qué es correcta y por qué las demás no.
-->
