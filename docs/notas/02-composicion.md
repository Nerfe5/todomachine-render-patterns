# Módulo 2 · Composición de componentes

> **Rama:** `feature/02-composicion` · **Tipo:** refactor de código

---

## 1. El concepto

**Composición** = construir componentes complejos **ensamblando** componentes simples, en lugar de heredar o de hacer componentes gigantes. En React tiene dos herramientas principales:

### a) Props — configurar un componente

```jsx
<TodoCounter completed={3} total={10} />
```

### b) `children` — el "slot": proyectar contenido

```jsx
<TodoHeader>
  <TodoCounter ... />   {/* TodoHeader no sabe qué es esto */}
  <TodoSearch ... />    {/* y no le importa: solo lo proyecta */}
</TodoHeader>
```

`children` es una prop especial que recibe **lo que pongas entre las etiquetas**. El componente que la recibe define la *estructura* (el marco); el padre decide el *contenido*. A esto se le llama patrón de **slots** o *containment*.

Todomachine ya usaba este patrón sin nombrarlo: `TodoList` (un `<ul>` que proyecta ítems) y `Modal` (un portal que proyecta lo que sea). Hoy lo hicimos consciente y agregamos una pieza más.

### c) Contenedores vs. Presentacionales

| | Contenedor | Presentacional |
|---|---|---|
| Responsabilidad | **Cómo funcionan** las cosas (datos, estado, contexto) | **Cómo se ven** las cosas (markup, estilos) |
| Fuente de datos | Context, hooks, APIs | Solo props |
| Reutilizable fuera de la app | Difícil | Sí ✅ |
| Testeable aislado | Requiere montar providers | Trivial: props in → UI out |
| En Todomachine | `AppUI`, `TodoProvider` | `TodoItem`, `TodoCounter`*, `TodoSearch`* |

*A partir de este módulo 😉

> Nota histórica: esta división la popularizó Dan Abramov en 2015. Él mismo aclaró después que no debe tomarse como dogma — con hooks la línea se difumina. Pero el **principio** sigue vigente: separar "saber de datos" de "saber de píxeles" hace ambos lados más simples.

---

## 2. El refactor

### Cambio 1 — Nuevo: `src/TodoHeader/`

Un componente de **estructura pura** que agrupa semánticamente la cabecera en un `<header>` y proyecta children. 12 líneas de código, cero lógica.

### Cambio 2 — `TodoCounter` y `TodoSearch`: de acoplados a presentacionales

**Antes** (Olor #5 de la auditoría):

```jsx
function TodoCounter() {
  const { completedTodos, totalTodos } = React.useContext(TodoContext);
  // ☠️ casado con TodoContext: no existe fuera del provider
```

**Después:**

```jsx
function TodoCounter({ completed, total }) {
  // ✅ función pura de sus props: reutilizable y testeable
```

Lo mismo para `TodoSearch` con `searchValue` / `setSearchValue`.

### Cambio 3 — `AppUI` asume el rol de contenedor de la cabecera

`AppUI` ya consumía el contexto; ahora también extrae `completedTodos`, `totalTodos`, `searchValue` y `setSearchValue` y los **baja por props**:

```jsx
<TodoHeader>
  <TodoCounter completed={completedTodos} total={totalTodos} />
  <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
</TodoHeader>
```

### Bonus — CSS muerto resucitado 🧟

`TodoCounter.css` tenía estilos para `.TodoCounter span` (números grandes con gradiente)... pero el JSX anterior usaba un template string sin spans, así que **ese CSS nunca se aplicaba**. La versión nueva renderiza `<span>{completed}</span>` y los estilos cobran vida. Moraleja: el refactor también descubre código muerto.

---

## 3. ¿Por qué el código queda mejor?

1. **Reutilización real:** `TodoSearch` y `TodoCounter` hoy funcionan en cualquier app — copias la carpeta y listo. Antes arrastraban el `TodoContext` completo.
2. **Testeabilidad:** probar `<TodoCounter completed={2} total={5} />` no requiere providers ni mocks de contexto.
3. **Semántica y estructura:** la cabecera ahora es un `<header>` real (accesibilidad + HTML semántico) con un dueño claro.
4. **Preparación para el Módulo 3:** con la cabecera agrupada en un solo componente, tenemos el lugar perfecto para discutir *dónde debe vivir el estado* y experimentar pasando props vs. contexto. Spoiler: `TodoHeader` esconde un truco más (`React.cloneElement`) que veremos pronto.
5. **El contrato quedó explícito:** mirando `<TodoCounter completed total />` *sabes* qué necesita. Con `useContext` adentro, sus dependencias eran invisibles desde afuera.

**Trade-off honesto:** `AppUI` ahora extrae más cosas del contexto y tiene más líneas. Movimos el acoplamiento, no lo eliminamos — pero lo movimos al lugar correcto: el contenedor, cuyo trabajo *es* ese. Y dejamos dos componentes 100% libres.

---

## 4. Cuándo NO usarlo

- **No conviertas todo a presentacional por deporte.** Si un componente es profundamente específico de tu app y jamás se reutilizará, el `useContext` directo es pragmático y válido.
- **No anides slots infinitamente.** Si `TodoHeader` recibiera children que reciben children que reciben children, la indirección cuesta más de lo que aporta.
- **No temas tener pocos contenedores "gordos".** Es preferible un `AppUI` que orquesta mucho y veinte presentacionales simples, que veinte componentes que cada uno sabe un poquito de todo.

---

## ✅ Checklist del módulo

- [x] `src/TodoHeader/` creado (composición vía children)
- [x] `TodoCounter` y `TodoSearch` convertidos a presentacionales
- [x] `AppUI` como contenedor que alimenta la cabecera
- [x] CSS muerto de `TodoCounter` reactivado
- [x] La app se comporta igual (refactor, no feature)
- [x] Preguntas 4–6 agregadas al examen
