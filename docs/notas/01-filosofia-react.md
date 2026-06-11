# Módulo 1 · Filosofía y principios de diseño de React

> **Rama:** `feature/01-filosofia-react` · **Tipo:** teórico + auditoría de código

---

## 1. El concepto

React no es solo una librería: es una **manera de pensar la UI**. Sus patrones (composición, render props, HOCs, hooks) no son recetas arbitrarias — son consecuencias de unos pocos principios de diseño. Si entiendes los principios, los patrones dejan de memorizarse y empiezan a deducirse.

### Principio 1 — La UI es una función del estado: `UI = f(state)`

En React **no manipulamos el DOM** para cambiar la pantalla; cambiamos el **estado** y React recalcula cómo debe verse la UI. La interfaz es el *resultado* de evaluar nuestros componentes con el estado actual.

```jsx
// Todomachine ya lo hace: nadie "muestra" u "oculta" el modal a mano.
// El modal existe si openModal es true. Punto.
{openModal && (
  <Modal>
    <TodoForm />
  </Modal>
)}
```

**Consecuencia práctica:** si la UI se ve mal, el bug casi siempre está en el estado o en cómo lo derivamos — no en "la pintada".

### Principio 2 — Declarativo > imperativo

- **Imperativo** (jQuery, vanilla): *"busca el elemento, agrégale la clase, insértalo aquí"* — describes los **pasos**.
- **Declarativo** (React): *"cuando `loading` sea true, la lista muestra skeletons"* — describes el **resultado**.

Nuestro `AppUI.js` es un ejemplo de UI declarativa: lee como una especificación de qué se ve en cada estado (loading, error, vacío, sin resultados, lista).

### Principio 3 — Composición sobre herencia

React **no usa herencia** para reutilizar UI (`class TodoListConBúsqueda extends TodoList` ❌). Reutilizamos **componiendo**: componentes pequeños que se ensamblan, principalmente vía `children` y props.

```jsx
// Modal no sabe QUÉ va a renderizar adentro. Recibe children y los proyecta.
<Modal>
  <TodoForm />
</Modal>
```

El equipo de React es explícito: no han encontrado casos de uso donde recomienden herencia entre componentes. Toda la flexibilidad que da la herencia, la da la composición con menos acoplamiento.

### Principio 4 — Flujo unidireccional de datos

Los datos **bajan** (props), los eventos **suben** (callbacks). `TodoItem` no decide completar un todo: notifica hacia arriba con `onComplete` y el dueño del estado (el provider) decide.

```jsx
<TodoItem
  onComplete={() => completeTodo(todo.text)}
  onDelete={() => deleteTodo(todo.text)}
/>
```

**Consecuencia práctica:** siempre sabes dónde buscar el origen de un dato — arriba. El debugging se vuelve lineal.

### Principio 5 — Inmutabilidad del estado

React decide si re-renderizar **comparando referencias**. Si mutas un objeto/array existente, la referencia no cambia y React puede no enterarse del cambio. Por eso el estado se **reemplaza**, nunca se muta:

```jsx
// ✅ nueva referencia
const newTodos = [...todos, nuevoTodo];
saveTodos(newTodos);
```

### Principio 6 — Una responsabilidad por pieza

Idealmente, cada componente/hook hace **una cosa**: o coordina lógica, o pinta UI, o encapsula un efecto. Cuando una pieza acumula responsabilidades, los cambios en una afectan a las demás. Este principio es el que más vamos a ejercitar en los módulos 3–6.

---

## 2. La auditoría de Todomachine 🔍

Con los principios como lupa, esto es lo que encontramos en el código actual. **No vamos a corregirlo todo hoy** — cada hallazgo tiene asignado el módulo donde lo atacaremos.

### 🔴 Olor #1 — `todo.text` como identificador y como `key`

**Dónde:** `AppUI.js`, `TodoContext/index.js`

```jsx
<TodoItem key={todo.text} ... />          // AppUI.js
const todoIndex = newTodos.findIndex(
  (todo) => todo.text === text             // completeTodo / deleteTodo
);
```

**Problema:** dos TODOs con el mismo texto rompen la app: keys duplicadas (warning de React + bugs de reconciliación) y `findIndex` siempre encuentra el primero, así que completas/borras el todo equivocado. Además, si algún día editamos el texto, el "id" cambia.

**Principio violado:** las keys deben ser estables y únicas; la identidad de una entidad no debe depender de datos editables.

**Se corrige en:** Módulo 6 (introducimos `id` real al refactorizar la lógica a `useTodos`).

### 🔴 Olor #2 — Mutación accidental en `completeTodo`

**Dónde:** `TodoContext/index.js`

```jsx
const completeTodo = (text) => {
  const newTodos = [...todos];                    // copia superficial
  const todoIndex = newTodos.findIndex(...);
  newTodos[todoIndex].completed = true;           // ⚠️ MUTA el objeto original
  saveTodos(newTodos);
};
```

**Problema:** el spread `[...todos]` copia el **array**, pero los objetos adentro siguen siendo **los mismos** (copia superficial). `newTodos[todoIndex]` y `todos[todoIndex]` apuntan al mismo objeto, así que lo estamos mutando. Hoy "funciona" porque `saveTodos` fuerza el render con un array nuevo, pero es una bomba de tiempo: rompe `React.memo`, comparaciones de estado previo y cualquier optimización futura.

**Principio violado:** inmutabilidad.

**La forma correcta:**

```jsx
const newTodos = todos.map((todo) =>
  todo.text === text ? { ...todo, completed: true } : todo
);
```

**Se corrige en:** Módulo 6 (junto con el toggle: hoy solo se puede completar, nunca des-completar).

### 🟠 Olor #3 — `TodoProvider` hace demasiado

**Dónde:** `TodoContext/index.js`

El provider concentra: persistencia (vía `useLocalStorage`), lógica de negocio (add/complete/delete), estado de búsqueda, estado del modal y los cálculos derivados. Son al menos **tres responsabilidades** distintas en un solo lugar.

**Problema:** cualquier cambio de estado —hasta teclear una letra en el buscador— genera un value nuevo y **re-renderiza a todos los consumidores** del contexto, lo necesiten o no. Y la lógica de negocio no se puede probar ni reutilizar sin montar el provider entero.

**Principio violado:** una responsabilidad por pieza.

**Se corrige en:** Módulo 3 (¿qué merece ser global?) y Módulo 6 (extraer `useTodos`).

### 🟠 Olor #4 — Estado global que podría ser local

**Dónde:** `TodoContext/index.js`

`searchValue` y `openModal` viven en el contexto global, pero ¿cuántos componentes los necesitan de verdad? `searchValue` lo escriben en `TodoSearch` y lo consume el filtrado; `openModal` lo usan `CreateTodoButton`, `AppUI` y `TodoForm`.

**Principio relacionado:** *state colocation* — el estado debe vivir lo más cerca posible de donde se usa.

**Se analiza y corrige en:** Módulo 3 (es EL tema del módulo).

### 🟡 Olor #5 — Componentes acoplados al contexto

**Dónde:** `TodoCounter`, `TodoSearch`, `TodoForm`

Estos componentes hacen `useContext(TodoContext)` directamente. Eso significa que **no existen fuera del provider**: no puedes reutilizar `TodoSearch` en otra app, ni probarlo aislado, ni mostrarlo en un Storybook sin envolver todo.

**Principio violado:** composición (un componente presentacional debería recibir lo que necesita vía props).

**Se corrige en:** Módulo 2 (contenedores vs. presentacionales) y se refuerza en Módulo 3.

### 🟡 Olor #6 — `AppUI` conoce todos los estados de la lista

**Dónde:** `AppUI.js`

`AppUI` decide cuándo mostrar loading, error, lista vacía y "no encontrado". Esa lógica pertenece conceptualmente a la **lista**, no al orquestador general.

**Se corrige en:** Módulo 4 (Render Props: `TodoList` se vuelve dueña de sus estados de render).

### 🔵 Nota — El `setTimeout` de 2 segundos en `useLocalStorage`

No es un olor: es una **simulación intencional de latencia** (heredada del curso de Intro) para poder ver los estados de loading. La conservamos durante el curso y lo documentamos para que nadie lo confunda con código de producción.

---

## 3. El mapa: de los olores a los módulos

| Olor | Severidad | Módulo donde se ataca |
|------|-----------|----------------------|
| #5 Componentes acoplados al contexto | 🟡 | 2 — Composición |
| #4 Estado global innecesario | 🟠 | 3 — State colocation |
| #6 AppUI sabe demasiado de la lista | 🟡 | 4 — Render Props |
| #3 Provider con múltiples responsabilidades | 🟠 | 3 y 6 — Hooks |
| #1 `text` como id/key | 🔴 | 6 — Hooks |
| #2 Mutación en `completeTodo` | 🔴 | 6 — Hooks |

> 💡 Fíjate en algo importante: **la app funciona**. Ningún olor es un bug visible hoy. Por eso este curso es de *refactor*: mejorar la estructura interna **sin cambiar el comportamiento observable**. Esa es exactamente la definición de refactorizar.

---

## 4. Cuándo NO obsesionarse con esto

- En un prototipo o MVP que vas a tirar, la pureza arquitectónica es desperdicio.
- `useContext` directo en un componente está bien si ese componente **es** específico de tu app y nunca se reutilizará.
- La inmutabilidad estricta importa cuando hay optimizaciones (`memo`, `useMemo`) o estado compartido; en un script de 50 líneas, no.

La filosofía de React no es dogma: es un conjunto de apuestas que pagan **a medida que la app crece**. Todomachine es pequeña, pero la tratamos como si fuera a crecer — porque el objetivo es aprender los patrones, no terminar rápido.
