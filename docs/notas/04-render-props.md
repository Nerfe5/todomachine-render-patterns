# Módulo 4 · Render Props

> **Rama:** `feature/04-render-props` · **Tipo:** refactor de código

---

## 1. El concepto

Una **render prop** es una prop cuyo valor es **una función que devuelve elementos React**. En lugar de pasarle a un componente *contenido ya renderizado* (children clásico), le pasas *instrucciones de cómo renderizar*, y el componente decide **cuándo y con qué datos** ejecutarlas.

```jsx
// children clásico: contenido fijo, el padre decide todo
<TodoList>
  <TodoItem ... />
</TodoList>

// render prop: el padre da la receta, TodoList decide cuándo cocinarla
<TodoList>
  {todo => <TodoItem key={todo.text} text={todo.text} ... />}
</TodoList>
```

La inversión es sutil pero poderosa: **se invierte el control del render**. El componente con la render prop es dueño de la lógica (cuándo, cuántas veces, con qué argumentos); quien lo usa es dueño de la apariencia (qué se pinta).

Hay dos variantes sintácticas del mismo patrón:

| Variante | Sintaxis | Nuestro uso |
|----------|----------|-------------|
| *Children as a function* | `<X>{(data) => <UI />}</X>` | El render de cada todo |
| Render props con nombre | `<X onError={() => <UI />} />` | Una por cada estado de la lista |

---

## 2. El problema que atacamos: el Olor #6

**Antes**, `AppUI` micro-gestionaba a la lista — conocía TODAS sus condiciones:

```jsx
<TodoList>
  {loading && <><TodosLoading /><TodosLoading /><TodosLoading /></>}
  {error && <TodosError />}
  {(!loading && totalTodos === 0) && <EmptyTodos />}
  {(!loading && totalTodos > 0 && searchedTodos.length === 0) && <TodosNotFound />}
  {searchedTodos.map(todo => <TodoItem ... />)}
</TodoList>
```

Esa lógica condicional pertenece conceptualmente a la **lista**: es ella quien tiene estados de "cargando", "vacía", "sin resultados". `AppUI` solo debería declarar qué se ve en cada caso.

## 3. El refactor

### `TodoList`: de `<ul>` inocente a dueña de sus estados

```jsx
function TodoList({
  error, loading, totalTodos, searchedTodos,
  onError, onLoading, onEmptyTodos, onEmptySearchResults,
  children, render,
}) {
  const renderFunc = children || render;

  return (
    <ul className="TodoList">
      {error && onError()}
      {loading && onLoading()}
      {(!loading && !error && totalTodos === 0) && onEmptyTodos()}
      {(!loading && !error && totalTodos > 0 && searchedTodos.length === 0) &&
        onEmptySearchResults()}
      {(!loading && !error) && searchedTodos.map(renderFunc)}
    </ul>
  );
}
```

Detalles de diseño que valen la pena:

- **`const renderFunc = children || render`** — soportamos ambas variantes. Si pasas la función entre etiquetas, es `children`; si prefieres `<TodoList render={...} />`, también funciona. Así se ve en librerías reales.
- **TodoList sigue sin conocer a nadie.** No importa `TodosError`, ni `TodoItem`, ni ninguno. Recibió funciones; las ejecuta. Es 100% reutilizable: mañana puede listar productos, usuarios o pokémon con otros renders.
- **Mejoramos la lógica de paso:** ahora `error` también bloquea el render de la lista y de los estados vacíos (`!loading && !error`), cosa que la versión anterior no contemplaba bien.

### `AppUI`: de micro-gestor a declarante

```jsx
<TodoList
  error={error}
  loading={loading}
  totalTodos={totalTodos}
  searchedTodos={searchedTodos}
  onError={() => <TodosError />}
  onLoading={() => <><TodosLoading /><TodosLoading /><TodosLoading /></>}
  onEmptyTodos={() => <EmptyTodos />}
  onEmptySearchResults={() => <TodosNotFound searchText={searchValue} />}
>
  {todo => (
    <TodoItem
      key={todo.text}
      text={todo.text}
      completed={todo.completed}
      onComplete={() => completeTodo(todo.text)}
      onDelete={() => deleteTodo(todo.text)}
    />
  )}
</TodoList>
```

Léelo: ya no hay `&&` encadenados — es un **menú declarativo**: "en error muestra esto, en loading esto otro, cada todo se pinta así". `UI = f(state)` en su máxima expresión.

### Bonus — `TodosNotFound` ahora dice QUÉ no encontró

Como `AppUI` declara ese render, fue trivial pasarle el término buscado:

```jsx
onEmptySearchResults={() => <TodosNotFound searchText={searchValue} />}
```

→ *"No encontramos resultados para «xyz»"*. Micro-mejora de UX cortesía del patrón: cada render prop es un punto de extensión natural.

---

## 4. ¿Por qué el código queda mejor?

1. **Responsabilidades en su lugar:** la lista es dueña del *cuándo*; AppUI del *qué*. El Olor #6 quedó oficialmente cerrado.
2. **TodoList es genuinamente reutilizable:** lógica de estados de listado lista para cualquier dominio, con cualquier UI.
3. **Puntos de extensión gratis:** ¿skeleton distinto? ¿error con botón de retry? Cambias una función en AppUI, sin tocar TodoList.
4. **AppUI más legible:** de 5 condicionales encadenados a un menú declarativo.

**Trade-offs honestos:**

- Más props que pasar (6 datos + 5 funciones). El patrón cobra su flexibilidad en verbosidad.
- Las funciones se recrean en cada render de AppUI. Para esta app es irrelevante; con `React.memo` en juego habría que estabilizarlas (`useCallback`).
- Anidar varios componentes con children-función produce "pirámides" (`{a => {b => {c => ...}}}`) — el famoso *render props hell*. Es LA razón por la que los hooks (Módulo 6) tomaron su lugar para compartir **lógica**. Para delegar **UI** (nuestro caso), render props sigue siendo el patrón correcto y vigente.

---

## 5. Cuándo NO usarlo

- **Para compartir lógica con estado** (suscripciones, fetching, formularios): hoy eso se hace con custom hooks. Render props ahí es legacy.
- **Cuando children clásico basta:** si el wrapper no necesita decidir cuándo/cómo renderizar (como nuestro `Modal` o `TodoHeader`), una función es complejidad gratuita.
- **Si la jerarquía se vuelve pirámide:** dos o más niveles de children-función anidados es señal de migrar a hooks o composición.

---

## ✅ Checklist del módulo

- [x] `TodoList` dueña de sus estados de render (error, loading, vacío, sin resultados, lista)
- [x] Ambas variantes soportadas: children-función y prop `render`
- [x] `AppUI` declarativo: menú de render props, cero condicionales encadenados
- [x] `TodosNotFound` muestra el término buscado (bonus de UX)
- [x] Lógica de estados mejorada (`error` bloquea lista y vacíos)
- [x] La app se comporta igual
- [x] Preguntas 10–12 agregadas al examen
