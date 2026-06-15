# Módulo 5 · Higher-Order Components (HOCs)

> **Rama:** `feature/05-hocs` · **Tipo:** refactor de código + arqueología de React 🏺

---

## 1. El concepto

Un **Higher-Order Component** es una **función** que recibe un componente y devuelve un componente nuevo, mejorado:

```jsx
const ComponenteMejorado = withAlgo(Componente);
```

El nombre viene de las *higher-order functions* (funciones que reciben/devuelven funciones). No es una API de React — es un **patrón**: pura composición de funciones aplicada a componentes.

La anatomía canónica:

```jsx
function withTodoContext(Component) {              // recibe un componente
  function ComponentWithTodoContext(props) {       // crea uno nuevo...
    const todoContext = React.useContext(TodoContext);
    return <Component {...todoContext} {...props} />;  // ...que renderiza el original con props extra
  }
  ComponentWithTodoContext.displayName =
    `withTodoContext(${Component.displayName || Component.name || 'Component'})`;
  return ComponentWithTodoContext;                 // y lo devuelve
}
```

**La idea central es la misma que en render props — separar la lógica de la UI — pero invertida:**

| | Render Props | HOC |
|---|---|---|
| ¿Quién envuelve a quién? | La lógica se usa **dentro** del JSX | La lógica envuelve **desde fuera** |
| ¿Cuándo se aplica? | En cada render | Una vez, al definir el componente |
| Se ve en... | El árbol JSX | La exportación / DevTools |

---

## 2. El refactor

### `withTodoContext` — el clásico patrón "connect"

Inyecta el contexto **como props** al componente envuelto. Es exactamente el truco que hizo famoso `react-redux` con `connect()`: el componente queda presentacional y la conexión vive en una capa aparte.

Con esto, **`TodoForm` por fin es 100% presentacional** — `addTodo` ya no sale de `useContext`, llega por props. El Olor #5 de la auditoría queda oficialmente cerrado para todos los componentes. 🎉

```jsx
// TodoForm/index.js exporta DOS versiones:
export { TodoForm, TodoFormConnected };
//        ↑ pura (tests, Storybook)   ↑ conectada (producción)
```

### `withLogger` — comportamiento transversal

Registra montaje/desmontaje/renders en consola sin tocar el componente original. Demuestra el caso de uso estrella de los HOCs: **funcionalidad transversal** (logging, métricas, autenticación, feature flags) aplicable a cualquier componente.

### La composición (y su precio)

```jsx
const TodoFormConnected = withLogger(withTodoContext(TodoForm));
```

Los HOCs **se componen como funciones**. Pruébalo: corre la app, abre la consola (F12), abre el modal → verás los logs 🪵. Y abre React DevTools → busca el formulario:

```
<withLogger(withTodoContext(TodoForm))>
  <withTodoContext(TodoForm)>
    <TodoForm>
```

Ese árbol de muñecas rusas con **un solo componente real adentro** es el famoso **wrapper hell** 👻. Con 2 HOCs es tolerable; las apps de 2017 llegaban a 5+ por componente (`withRouter(connect(withStyles(withTranslation(...))))`) y debuggear era espeleología.

### Detalles del oficio (los que preguntan en entrevistas)

1. **Orden del spread:** `{...todoContext} {...props}` — las props propias van después y **ganan las colisiones**. Decisión consciente: el padre manda sobre la inyección.
2. **`displayName`:** sin él, DevTools muestra `<Anonymous>`. Los HOCs serios siempre lo setean.
3. **Nunca apliques un HOC dentro del render:**
   ```jsx
   function AppUI() {
     const Connected = withTodoContext(TodoForm);  // ☠️ NUNCA
   ```
   Crearía un **tipo de componente nuevo en cada render** → React desmonta y remonta todo el subárbol (perdiendo estado, como lo que escribes en el input). Los HOCs se aplican **una vez, en la definición del módulo**.
4. **Colisión silenciosa de props:** si dos HOCs inyectan una prop con el mismo nombre, uno pisa al otro **sin warning**. Es el defecto estructural del patrón: el flujo de datos es implícito.

---

## 3. La comparativa: tres soluciones al mismo problema

"Quiero que `TodoForm` reciba `addTodo` sin acoplarse al contexto":

```jsx
// 1. HOC (Módulo 5) — se aplica al exportar, invisible en el JSX
const TodoFormConnected = withTodoContext(TodoForm);
<TodoFormConnected setOpenModal={setOpenModal} />

// 2. Render prop (estilo Módulo 4) — visible en el JSX, anida
<TodoContext.Consumer>
  {({ addTodo }) => <TodoForm addTodo={addTodo} setOpenModal={setOpenModal} />}
</TodoContext.Consumer>

// 3. Hook (spoiler del Módulo 6) — directo, plano, explícito
const { addTodo } = useTodos();
```

| Criterio | HOC | Render Prop | Hook |
|----------|-----|-------------|------|
| ¿Dónde se ve la conexión? | En el export | En el JSX | En el cuerpo del componente |
| Anidamiento al combinar 3+ | Wrapper hell 👻 | Pirámide de funciones | Plano: 3 líneas |
| Colisión de nombres | Silenciosa ☠️ | Controlada (tú destructuras) | Controlada (renombras al destructurar) |
| ¿De dónde vino esta prop? | Hay que rastrear los HOCs | Se ve en el JSX | Se ve en la línea de arriba |
| Estado del patrón | Legacy para lógica; vivo en librerías | Vigente para delegar UI | El estándar actual |

Esta tabla es la respuesta a "¿por qué existen los hooks?": no porque HOCs y render props estuvieran *mal*, sino porque ambos pagaban **costos estructurales** (indirección, anidamiento, colisiones) para algo que debería ser plano: *reutilizar lógica con estado*.

---

## 4. Cuándo SÍ usar HOCs hoy

- **Trabajando con librerías que los exponen:** código legacy con `connect()` de react-redux, `withRouter`, `withStyles`... hay millones de líneas en producción que los usan. Saber leerlos no es opcional.
- **Funcionalidad transversal sobre muchos componentes:** un `withErrorBoundary`, `withAuth` o `withAnalytics` aplicado mecánicamente a decenas de pantallas sigue siendo ergonómico — más que repetir un hook + condicional en cada una.
- **Cuando necesitas envolver componentes que no puedes modificar** (de terceros): el HOC no requiere tocar el código del componente; un hook sí.

## 5. Cuándo NO

- Para lógica con estado en código nuevo: custom hooks, siempre (Módulo 6).
- Si te encuentras componiendo 3+ HOCs: detente y reconsidera.
- Si el HOC solo inyecta datos que un hook daría en una línea, es indirección gratuita.

---

## ✅ Checklist del módulo

- [x] `src/HOCs/withTodoContext.js` — patrón connect: contexto → props
- [x] `src/HOCs/withLogger.js` — comportamiento transversal
- [x] Composición demostrada: `withLogger(withTodoContext(TodoForm))` (verla en DevTools 👀)
- [x] `TodoForm` 100% presentacional → **Olor #5 cerrado para todos los componentes**
- [x] Doble export: versión pura + versión conectada
- [x] displayName, orden de spread y "nunca en render" documentados
- [x] Comparativa HOC vs. Render Props vs. Hooks
- [x] La app se comporta igual (+ logs educativos en consola)
- [x] Preguntas 13–15 agregadas al examen
