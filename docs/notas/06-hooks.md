# Módulo 6 · React Hooks — El patrón definitivo

> **Rama:** `feature/06-hooks` · **Tipo:** refactor final + cierre de olores

---

## 1. El concepto

Los **custom hooks** son funciones cuyo nombre empieza con `use` y que pueden llamar a otros hooks de React. Son el mecanismo que React diseñó para **encapsular y reutilizar lógica con estado** — el problema que render props y HOCs resolvían con costos estructurales (pirámides, wrapper hell, colisiones de props).

¿Por qué ganan?

```jsx
// HOC (Módulo 5) — la conexión es invisible en el JSX
const TodoFormConnected = withTodoContext(TodoForm);

// Render prop — visible pero anidada
<TodoContext.Consumer>
  {({ addTodo }) => <TodoForm addTodo={addTodo} />}
</TodoContext.Consumer>

// Custom hook (Módulo 6) — explícito, plano, en una línea
const { addTodo, completeTodo, deleteTodo } = useTodos();
```

No hay indirección. El flujo de datos es visible. Y se componen sin anidar:

```jsx
const { todos } = useTodos();
const { theme } = useTheme();
const { user } = useAuth();
// tres líneas, plano, sin wrappers
```

---

## 2. El refactor: `useTodos`

Extrajimos TODA la lógica de `TodoProvider` a `src/useTodos/index.js`. El Provider quedó con una sola responsabilidad: distribuir el resultado del hook en el árbol vía Context.

### Antes — TodoProvider mezclaba todo (Olor #3)
- Persistencia (useLocalStorage)
- Lógica de negocio (add/complete/delete)
- Datos derivados (completedTodos, searchedTodos)
- Estado de búsqueda

### Después — separación limpia

```
useTodos         → lógica de negocio + estado + datos derivados
TodoProvider     → distribución en el árbol (Context)
useLocalStorage  → persistencia
```

Cada pieza tiene una sola responsabilidad. Principio 6 de la filosofía de React: cerrado. ✅

---

## 3. Los dos olores rojos: cerrados definitivamente 🔴→✅

### Olor #1 — `todo.text` como key e identificador

**Diagnóstico (Módulo 1):** dos todos con el mismo texto rompían la app. `findIndex` encontraba siempre el primero; las keys duplicadas confundían la reconciliación.

**Cura:**

```jsx
// addTodo: cada todo nace con id único
const addTodo = (text) => {
  const newTodos = [
    ...todos,
    { id: Date.now(), text, completed: false }
  ];
  saveTodos(newTodos);
};

// AppUI: key estable, operaciones por id
{todo => (
  <TodoItem
    key={todo.id}           // ← estable, único, no editable
    text={todo.text}        // ← solo para mostrar
    onComplete={() => completeTodo(todo.id)}
    onDelete={() => deleteTodo(todo.id)}
  />
)}
```

`Date.now()` es suficiente para esta app. En producción se usaría `crypto.randomUUID()` o una librería como `uuid` para garantizar unicidad incluso en inserciones simultáneas.

### Olor #2 — Mutación accidental en `completeTodo`

**Diagnóstico (Módulo 1):**

```jsx
// ☠️ Antes: copia superficial + mutación del objeto original
const newTodos = [...todos];
const todoIndex = newTodos.findIndex((todo) => todo.text === text);
newTodos[todoIndex].completed = true;  // muta todos[todoIndex] también
```

**Cura:**

```jsx
// ✅ Ahora: map crea nuevo array + spread crea nuevo objeto
const completeTodo = (id) => {
  const newTodos = todos.map((todo) =>
    todo.id === id
      ? { ...todo, completed: !todo.completed }  // nuevo objeto
      : todo
  );
  saveTodos(newTodos);
};
```

Dos niveles de inmutabilidad:
- `todos.map()` → nuevo array
- `{ ...todo, completed: !todo.completed }` → nuevo objeto

React ahora puede comparar referencias correctamente. `React.memo`, `useMemo`, `shouldComponentUpdate` — todos funcionan como se espera.

### Bonus — de "completar" a **toggle** 🔄

El `!todo.completed` en lugar de `true` habilita des-completar: al hacer click en un todo completado, vuelve a pendiente. Era imposible antes (siempre `= true`). El refactor de inmutabilidad lo habilitó gratis.

---

## 4. ¿Por qué mantener el Provider si useTodos hace todo?

Pregunta legítima. La respuesta está en entender qué resuelve cada capa:

| Capa | Problema que resuelve |
|------|-----------------------|
| `useTodos` | **Lógica**: cómo se calcula y actualiza el estado |
| `TodoProvider` | **Alcance**: cómo llega el estado a componentes profundos sin prop drilling |
| `useLocalStorage` | **Persistencia**: dónde se guarda el estado |

Podrías usar `useTodos()` directamente en `AppUI` y pasar todo por props — funcionaría para un árbol pequeño. Pero en cuanto `TodoForm` (que está 4 niveles adentro) necesita `addTodo`, el prop drilling vuelve. Context resuelve la distribución; el hook resuelve la lógica. Son herramientas distintas para problemas distintos.

---

## 5. La comparativa final del curso

| Patrón | Módulo | Resuelve | Costo |
|--------|--------|----------|-------|
| Composición + children | 2 | Reutilización de estructura UI | Indirección mínima |
| State colocation | 3 | Estado global innecesario | Más props locales |
| Render props | 4 | Delegación de UI | Verbosidad, anidamiento posible |
| HOCs | 5 | Comportamiento transversal | Wrapper hell, colisiones silenciosas |
| **Custom hooks** | **6** | **Lógica reutilizable con estado** | **Reglas de hooks** |

Los patrones no se reemplazan entre sí — se complementan. Todomachine hoy usa los cinco.

---

## 6. Cuándo NO usar custom hooks

- No extraigas un hook de lógica que solo se usa en un lugar — la abstracción prematura tiene costo de legibilidad.
- Si el hook no llama a ningún hook de React internamente, es solo una función auxiliar: no necesita el prefijo `use` ni las reglas de hooks.
- Los hooks no funcionan en componentes de clase — en proyectos legacy con clases, los HOCs siguen siendo necesarios.

---

## ✅ Checklist del módulo

- [x] `src/useTodos/` — lógica de negocio extraída del Provider
- [x] `TodoProvider` — delega a `useTodos`, responsabilidad única
- [x] **Olor #1 cerrado** — ids reales (`Date.now()`), `key={todo.id}`, operaciones por id
- [x] **Olor #2 cerrado** — `completeTodo` con `.map()` + spread (inmutabilidad real)
- [x] **Bonus** — toggle de completado (des-completar)
- [x] La app se comporta igual + mejoras reales (toggle, sin bugs de texto duplicado)
- [x] Preguntas 16–18 agregadas al examen
- [x] **Todos los olores de la auditoría del Módulo 1: cerrados** 🎉
