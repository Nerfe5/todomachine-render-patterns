# 🗺️ Tour guiado por Todomachine

> Recorrido de lectura del código, en orden pedagógico. Cada parada demuestra en la práctica un principio de la filosofía de React (ver `notas/01-filosofia-react.md`). Ideal hacerlo con la app corriendo (`npm start`) para conectar lo que ves en pantalla con el código que lo causa.

---

## Parada 1 — `src/index.js` y `src/App.js` (30 segundos)

El punto de entrada. `App.js` son 8 líneas y ya muestra **composición pura**: `TodoProvider` envuelve a `AppUI`. El que provee estado y el que pinta UI son piezas separadas que se ensamblan.

**Principio en acción:** composición sobre herencia.

---

## Parada 2 — `src/TodoContext/index.js` ⭐ (el corazón)

Aquí vive casi todo. Léelo buscando tres cosas:

- **El Olor #3:** cuenta cuántas responsabilidades distintas tiene (persistencia, búsqueda, modal, lógica de todos, datos derivados). Son demasiadas para un solo archivo.
- **El Olor #2:** localiza `completeTodo` y mira la línea `newTodos[todoIndex].completed = true`. Ahí está la mutación traicionera (el spread `[...todos]` es copia superficial).
- **El flujo unidireccional:** todas las funciones (`addTodo`, `deleteTodo`...) viven aquí arriba y bajan por el `value` del Provider.

**Principios en acción:** flujo unidireccional · inmutabilidad (violada 😈) · responsabilidad única (violada).

---

## Parada 3 — `src/AppUI.js`

El ejemplo perfecto de **UI declarativa**: léelo de arriba a abajo y verás que es literalmente una especificación — "si loading → skeletons, si error → error, si vacío → EmptyTodos...".

También localiza:
- **El Olor #6:** toda esa lógica condicional que en el Módulo 4 moveremos a `TodoList`.
- **El Olor #1:** `key={todo.text}`.

**Principios en acción:** declarativo > imperativo · `UI = f(state)`.

---

## Parada 4 — `src/TodoList/index.js` y `src/Modal/index.js`

Los dos campeones de la **composición con `children`**. `TodoList` son ~7 líneas: un `<ul>` que proyecta lo que le pongan adentro. `Modal` ni siquiera sabe que renderiza un formulario — y de regalo, usa `ReactDOM.createPortal` (¿notas que en `public/index.html` hay un `<div id="modal">`? Ahí aterriza).

**Principio en acción:** composición vía children (patrón de slots).

---

## Parada 4.5 — `src/TodoHeader/index.js` 🆕 (desde el Módulo 2)

La pieza que agregamos nosotros: un `<header>` semántico que proyecta children. Compáralo con `TodoList` y `Modal` — los tres son el mismo patrón: estructura sin contenido, contenido sin estructura.

**Principio en acción:** slots, conscientes y con nombre.

---

## Parada 5 — `src/TodoItem/index.js`

El componente **presentacional** modelo: no usa contexto, recibe TODO por props (`text`, `completed`, `onComplete`, `onDelete`). Reutilizable en cualquier app. Compáralo con la parada 6...

**Principio en acción:** componente como función pura de sus props.

---

## Parada 6 — `src/TodoCounter`, `src/TodoSearch`, `src/TodoForm`

> ⚠️ Esta parada cambia según el módulo en que estés:

- **Antes del Módulo 2:** los tres hacen `useContext(TodoContext)` directo — el Olor #5. Pregúntate: ¿podría usar `TodoSearch` en otro proyecto? No, está casado con este contexto.
- **Después del Módulo 2:** `TodoCounter` y `TodoSearch` ya son presentacionales (reciben props desde `AppUI`, su nuevo contenedor). `TodoForm` sigue acoplado — quedó pendiente a propósito; lo revisitaremos más adelante.

**Principio en acción:** contenedores vs. presentacionales.

---

## Parada 7 — `src/useLocalStorage/index.js`

Tu primer **custom hook** (adelanto del Módulo 6): encapsula localStorage + loading + error y lo expone con una interfaz limpia. Ahí está también el famoso `setTimeout` de 2 segundos simulando latencia (intencional, para poder ver los skeletons).

**Principio en acción:** encapsular lógica con estado en una función reutilizable.

---

## 💡 Tips para el tour en VS Code

| Atajo | Para qué |
|-------|----------|
| `Ctrl+P` | Saltar a un archivo por nombre |
| `Ctrl+Shift+F` | Buscar `useContext(TodoContext)` en todo el proyecto → ver de golpe los componentes acoplados (Olor #5) |
| `Ctrl+ñ` / `` Ctrl+` `` | Terminal integrada |
| `F12` sobre un import | Ir a la definición del componente |
| `Ctrl+K Z` | Modo zen para leer sin distracciones |

Y en paralelo:
- `npm start` y juega con la app mientras lees: agrega un TODO, complétalo, búscalo.
- `git log --oneline --graph` para ver el historial con los merges de los PRs (sales con `q` 😏).

---

## 🧪 Experimento del tour (sin commitear)

Agrega **dos TODOs con exactamente el mismo texto** y luego intenta completar el segundo:

1. Abre la consola del navegador (`F12` → Console).
2. Verás el **warning de keys duplicadas** de React.
3. Intenta completar el **segundo** → se completa el **primero** (¡el Olor #1 en acción! `findIndex` siempre encuentra la primera coincidencia).

Para deshacer el experimento: borra los TODOs duplicados desde la app, o limpia el storage desde la consola del navegador:

```js
localStorage.removeItem('TODOS_V1')
```

y recarga la página.

---

## El mapa de olores (referencia rápida)

| Parada | Olor | Se corrige en |
|--------|------|---------------|
| 2 | #2 Mutación en `completeTodo` · #3 Provider sobrecargado | Módulos 6 · 3 y 6 |
| 3 | #1 `text` como key · #6 AppUI sabe demasiado | Módulos 6 · 4 |
| 6 | #5 Acoplamiento al contexto | Módulo 2 ✅ (parcial: falta `TodoForm`) |

Detalle completo de cada olor: `notas/01-filosofia-react.md`.
