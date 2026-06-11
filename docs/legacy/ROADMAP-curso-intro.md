# 📋 ROADMAP - Curso de Introducción a React.js

Este roadmap está diseñado para el desarrollo progresivo del proyecto TODO Machine, desde los fundamentos de React hasta el deploy final.

> **Retomado el:** 26 de Mayo, 2026 — después de una pausa desde Diciembre 2025.

---

## **Fase 1: Fundamentos de React** ✅ COMPLETADA

### 1. Introducción a React y JSX ✅
- **Objetivos:**
  - Entender la estructura del proyecto (src/, public/)
  - Comprender cómo funciona JSX
  - Conocer los componentes básicos de React
- **Archivos clave:** `App.js`, `index.js`

**Conceptos aprendidos:**

**¿Qué es React?**
React es una librería de JavaScript para construir interfaces de usuario. En lugar de manipular el HTML directamente (como con `document.getElementById`), describes cómo quieres que se vea la pantalla y React se encarga de actualizarla automáticamente cuando los datos cambian.

**¿Qué es JSX?**
JSX es la sintaxis que parece HTML dentro de JavaScript. No es HTML real — es azúcar sintáctica que React transforma en JavaScript:
```jsx
// Esto es JSX (lo que escribes)
<h1 className="TodoCounter">Has completado 2 de 5 TODOS</h1>

// Esto es lo que React hace internamente
React.createElement('h1', { className: 'TodoCounter' }, 'Has completado 2 de 5 TODOS')
```
> Regla clave: en JSX usas `className` en lugar de `class` porque `class` es una palabra reservada de JavaScript.

---

### 2. Componentes y Props ✅
- **Objetivos:**
  - Crear componentes funcionales
  - Entender Props y comunicación entre componentes

**Conceptos aprendidos:**

**Componentes**
Un componente es una función de JavaScript que devuelve JSX. Toda la app está dividida en piezas reutilizables:
```
App.js               ← componente raíz, el "jefe"
├── TodoCounter      ← muestra "X de Y completados"
├── TodoSearch       ← campo de búsqueda
├── TodoList         ← contenedor de la lista
│   └── TodoItem     ← cada tarea individual
└── CreateTodoButton ← botón de "+"
```
Cada componente vive en su propio archivo `.js` con su propio `.css`.

**Props (propiedades)**
Las props son la forma en que los componentes se pasan información entre sí, de padre a hijo. Son como los parámetros de una función:
```jsx
// App.js le pasa props a TodoCounter
<TodoCounter completed={2} total={5} />

// TodoCounter las recibe y las usa
function TodoCounter({ total, completed }) {
  return <h1>Has completado {completed} de {total} TODOS</h1>;
}
```
> Las props fluyen **solo hacia abajo** (de padre a hijo), nunca al revés.

---

## **Fase 2: Proyecto TODO Machine** ✅ COMPLETADA

### 3. Maquetación Inicial ✅
- **Objetivos:**
  - Crear estructura de componentes del TODO
  - Aplicar CSS modular a cada componente
- **Componentes creados:**
  - `TodoCounter` - Contador de tareas completadas
  - `TodoSearch` - Buscador de tareas
  - `TodoList` - Lista contenedora
  - `TodoItem` - Item individual de tarea
  - `CreateTodoButton` - Botón para agregar tareas

---

### 4. Estados y Eventos ✅
- **Objetivos:**
  - Implementar `useState` para manejo de TODOs
  - Agregar eventos `onClick`, `onChange`
  - Funcionalidad de completar/eliminar TODOs

**Conceptos aprendidos:**

**Estado (`useState`)**
El estado es data que puede cambiar y que cuando cambia, hace que React vuelva a dibujar la pantalla automáticamente:
```jsx
const [todos, setTodos] = React.useState(defaultTodos);
//     ^dato   ^función para cambiarlo   ^valor inicial
```
En `App.js` hay dos estados activos:
- `todos` — la lista completa de tareas
- `searchValue` — el texto que el usuario escribe en el buscador

> Regla de oro: nunca modifiques el estado directamente (`todos.push(...)` está prohibido). Siempre usa la función setter (`setTodos(...)`).

**Eventos**
Los eventos son las acciones del usuario (clicks, escribir texto, etc.). En React se pasan como props que comienzan con `on`:
```jsx
// Al hacer click en ✓, llama a la función onComplete
<span onClick={props.onComplete}>✓</span>

// Al escribir en el input, actualiza el estado
<input onChange={(event) => setSearchValue(event.target.value)} />
```

**Elevación de estado (State Lifting)**
Cuando dos componentes necesitan compartir el mismo dato, ese estado sube al componente padre común. El estado vive en `App.js` y se le pasa a los hijos tanto el valor como la función para cambiarlo:
```jsx
// App.js tiene el estado
const [searchValue, setSearchValue] = React.useState('');

// Y se lo pasa a TodoSearch
<TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
```

---

### 5. Búsqueda y Filtrado ✅
- **Objetivos:**
  - Implementar buscador funcional
  - Filtrar TODOs en tiempo real según búsqueda

**Conceptos aprendidos:**

**Renderizado de listas**
Para mostrar una lista de elementos se usa `.map()` y cada elemento necesita una `key` única:
```jsx
{searchedTodos.map(todo => (
  <TodoItem key={todo.text} text={todo.text} completed={todo.completed} />
))}
```

**Renderizado condicional**
Mostrar contenido distinto según el estado de la app:
```jsx
{allCompleted ? '🎉 ¡Felicidades! Completaste todos tus TODOS' : `Has completado ${completed} de ${total}`}
```

---

## **Fase 3: Funcionalidades Avanzadas** ⏳ PENDIENTE

### 6. Local Storage ✅

- **Objetivos:**
  - Persistir TODOs en localStorage del navegador
  - Cargar datos al iniciar la aplicación
  - Guardar cambios automáticamente al completar o eliminar TODOs

**Conceptos aprendidos:**

**¿Qué es localStorage?**
`localStorage` es una pequeña base de datos que el navegador guarda en tu computadora. A diferencia del estado de React (que se borra al recargar la página), localStorage persiste aunque cierres el navegador. Solo puede guardar texto (`strings`), por eso convertimos los objetos con `JSON.stringify` y los recuperamos con `JSON.parse`:
```js
// Guardar (convierte el array a texto)
localStorage.setItem('TODOS_V1', JSON.stringify([ { text: 'Tarea', completed: false } ]));

// Leer (convierte el texto de vuelta a array)
const data = JSON.parse(localStorage.getItem('TODOS_V1'));
```

**Patrón implementado: leer al arrancar, escribir al cambiar**
La estrategia usada fue:
1. Al iniciar la app, leer de localStorage y usarlo como valor inicial del estado.
2. Cada vez que el usuario complete o elimine un TODO, escribir el nuevo array en localStorage.

```js
// 1. Leer al arrancar (se ejecuta una sola vez cuando React carga el componente)
function App() {
  const localStorageTodos = localStorage.getItem('TODOS_V1');
  let parsedTodos;

  if (!localStorageTodos) {
    localStorage.setItem('TODOS_V1', JSON.stringify([])); // primera vez: lista vacía
    parsedTodos = [];
  } else {
    parsedTodos = JSON.parse(localStorageTodos); // ya hay datos: los usamos
  }

  const [todos, setTodos] = React.useState(parsedTodos); // estado inicial = localStorage
  ...
}

// 2. Escribir cada vez que cambia algo
const saveTodos = (newTodos) => {
  localStorage.setItem('TODOS_V1', JSON.stringify(newTodos)); // persiste
  setTodos(newTodos);                                          // actualiza pantalla
};
```

> `saveTodos` reemplaza a `setTodos` directo. Ahora cualquier cambio primero se guarda en disco y luego actualiza la UI.

**Bug encontrado: typo en la clave del localStorage**
Durante la implementación se cometió un error muy común: usar nombres distintos para leer y escribir.
```js
// ❌ ERROR: claves diferentes → nunca persiste
localStorage.getItem('TODOS_V1');       // lee de aquí...
localStorage.setItem('TODO_V1', ...);   // ...pero escribe aquí (falta la S)

// ✅ CORRECTO: misma clave en ambos lados
localStorage.getItem('TODOS_V1');
localStorage.setItem('TODOS_V1', ...);
```
> Lección: cuando los datos no persisten, lo primero que debes revisar es que las claves de lectura y escritura sean idénticas.

**¿Y `useEffect`?**
El curso menciona `useEffect` como la forma "oficial" de React para sincronizar con sistemas externos (como localStorage). La diferencia con el enfoque actual es:

| Enfoque actual | Con `useEffect` |
|---|---|
| Lee en el cuerpo de la función (al montar) | Lee en el estado inicial del `useState` |
| Escribe manualmente en `saveTodos` | Escribe automáticamente cuando `todos` cambia |
| Más explícito, fácil de seguir | Más idiomático, menos código repetido |

Ambos funcionan. `useEffect` se verá más adelante en el curso.

---

### 6.1 Custom Hooks ✅

- **Objetivos:**
  - Extraer lógica reutilizable fuera de los componentes
  - Crear el hook `useLocalStorage` para encapsular toda la lógica de persistencia
  - Entender la convención de nomenclatura de los hooks

**Conceptos aprendidos:**

**¿Qué es un Custom Hook?**
Un custom hook es simplemente una función de JavaScript cuyo nombre empieza con `use` y que puede llamar a otros hooks de React adentro (`useState`, `useEffect`, etc.). Sirven para extraer lógica que se repetiría en varios componentes y ponerla en un solo lugar.

Antes del hook, toda la lógica de localStorage vivía mezclada dentro de `App.js`. Con el custom hook, `App.js` solo necesita una línea:
```js
// Antes: ~15 líneas de lógica en App.js
// Después: una sola línea limpia
const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);
```

**Anatomía de `useLocalStorage`**
```js
function useLocalStorage(itemName, initialValue) {
  // 1. Intentar leer del localStorage
  const localStorageItem = localStorage.getItem(itemName);

  let parsedItem;

  // 2. Si no existe, inicializarlo; si existe, parsearlo
  if (!localStorageItem) {
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItem = initialValue;
  } else {
    parsedItem = JSON.parse(localStorageItem);
  }

  // 3. Crear el estado de React con el valor leído
  const [item, setItem] = React.useState(parsedItem);

  // 4. Función que guarda en localStorage Y actualiza el estado
  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };

  // 5. Devolver igual que useState: [valor, funcionParaCambiarlo]
  return [item, saveItem];
}
```

> El hook devuelve `[item, saveItem]` siguiendo exactamente la misma convención de `useState`. Quien lo use ni siquiera necesita saber que hay localStorage adentro.

**Reglas de los hooks (obligatorias)**
React impone dos reglas que nunca se pueden romper:
1. Solo llama hooks en el nivel superior de una función — nunca dentro de `if`, `for` o funciones anidadas.
2. Solo llama hooks desde componentes de React o desde otros custom hooks — nunca desde funciones normales de JavaScript.

```js
// ❌ PROHIBIDO: hook dentro de un if
if (condicion) {
  const [value, setValue] = React.useState(0);
}

// ✅ CORRECTO: siempre en el nivel superior
const [value, setValue] = React.useState(0);
```

**Convención de nombres**
Todos los hooks empiezan con `use`. Esto no es solo estilo — React usa ese prefijo para aplicar las reglas anteriores automáticamente:
- `useState` — estado local
- `useEffect` — efectos secundarios
- `useLocalStorage` — tu hook personalizado

---

### 6.2 Organización de Carpetas ✅

- **Objetivos:**
  - Mover cada componente a su propia carpeta
  - Seguir la convención `NombreComponente/index.js`
  - Mantener el CSS junto al componente que lo usa
  - Extraer el custom hook a su propia carpeta

**¿Por qué organizar en carpetas?**
Cuando el proyecto crece, tener todos los archivos en la raíz de `src/` se vuelve caótico. Agrupar por componente hace que cada pieza sea fácil de encontrar, modificar y eventualmente borrar:

```
// ❌ Antes: todo mezclado en src/
src/
├── App.js
├── TodoCounter.js
├── TodoCounter.css
├── TodoItem.js
├── TodoItem.css
├── ...

// ✅ Después: cada componente tiene su propio "cuarto"
src/
├── App.js
├── TodoCounter/
│   ├── index.js        ← el componente
│   └── TodoCounter.css ← su estilo
├── TodoItem/
│   ├── index.js
│   └── TodoItem.css
├── useLocalStorage/
│   └── index.js        ← el hook
├── ...
```

**¿Por qué el archivo se llama `index.js`?**
Cuando importas una carpeta, JavaScript automáticamente busca el archivo `index.js` dentro de ella. Esto permite que los imports en `App.js` queden exactamente igual aunque los archivos se hayan movido:

```js
// Este import funciona tanto si existe:
// - src/TodoCounter.js           (archivo directo)
// - src/TodoCounter/index.js     (carpeta con index)
import { TodoCounter } from './TodoCounter';
```

> La carpeta actúa como un "módulo" y `index.js` es su punto de entrada. Es el mismo concepto que el `index.html` de una página web.

**Estructura final del proyecto**
```
src/
├── App.js                          ← orquesta todo, solo lógica de UI
├── App.css
├── index.js                        ← punto de entrada de React
├── index.css                       ← estilos globales
├── useLocalStorage/
│   └── index.js                    ← hook de persistencia
├── CreateTodoButton/
│   ├── index.js
│   └── CreateTodoButton.css
├── TodoCounter/
│   ├── index.js
│   └── TodoCounter.css
├── TodoItem/
│   ├── index.js
│   └── TodoItem.css
├── TodoList/
│   ├── index.js
│   └── TodoList.css
└── TodoSearch/
    ├── index.js
    └── TodoSearch.css
```

> Regla práctica: si un componente tuviera tests, imágenes o subcomponentes propios, también irían dentro de su carpeta. Todo lo que pertenece a un componente vive junto.

---

### 6.3 Stateless vs Stateful ✅

- **Objetivos:**
  - Entender la diferencia entre componentes con lógica y componentes de presentación
  - Separar `App.js` en dos archivos con responsabilidades claras
  - Facilitar la navegación y el mantenimiento del proyecto

**Conceptos aprendidos:**

**¿Qué es un componente Stateful?**
Un componente Stateful (con estado) es el que tiene cerebro: maneja estado, contiene lógica de negocio y toma decisiones. Orquesta qué datos existen y cómo cambian:
```jsx
// App.js — STATEFUL: el "cerebro"
function App() {
  const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);
  const [searchValue, setSearchValue] = React.useState('');

  // lógica: cómo se filtra
  const searchedTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchValue.toLowerCase())
  );

  // lógica: cómo se completa un TODO
  const completeTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text === text);
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  // solo renderiza AppUI, le pasa todo como props
  return <AppUI completeTodo={completeTodo} searchedTodos={searchedTodos} ... />;
}
```

**¿Qué es un componente Stateless?**
Un componente Stateless (sin estado) es la "cara": no toma decisiones, no tiene estado propio. Solo recibe datos por props y los muestra en pantalla. Si le cambias las props, cambia lo que se ve:
```jsx
// AppUI.js — STATELESS: la "cara"
function AppUI({ completedTodos, totalTodos, searchValue, setSearchValue, searchedTodos, completeTodo, deleteTodo }) {
  return (
    <React.Fragment>
      <div className="todo-container">
        <TodoCounter completed={completedTodos} total={totalTodos} />
        <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
        <TodoList>
          {searchedTodos.map(todo => (
            <TodoItem key={todo.text} text={todo.text} completed={todo.completed}
              onComplete={() => completeTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
            />
          ))}
        </TodoList>
      </div>
      <CreateTodoButton />
    </React.Fragment>
  );
}
```
> `AppUI` no sabe de dónde vienen los datos ni cómo se guardan. Solo sabe pintarlos.

**¿Cómo quedaron divididas las responsabilidades?**

| Componente | Tipo | Responsabilidad |
|---|---|---|
| `App.js` | Stateful | Estado, lógica, filtrado, persistencia |
| `AppUI.js` | Stateless | JSX, estructura visual, delegación de eventos |
| `TodoCounter` | Stateless | Mostrar conteo de TODOs |
| `TodoSearch` | Stateless | Input de búsqueda |
| `TodoList` | Stateless | Contenedor de lista |
| `TodoItem` | Stateless | Item individual de tarea |
| `CreateTodoButton` | Stateless | Botón de acción |

**¿Por qué aplicar este patrón?**
La separación tiene tres beneficios concretos:

1. **Navegación clara:** si hay un bug de datos o lógica → `App.js`. Si el problema es visual → `AppUI.js` o el componente específico.
2. **Componentes reutilizables:** `AppUI` podría usarse con distintas fuentes de datos (localStorage, API, etc.) sin tocar el JSX.
3. **Testing más fácil:** los componentes stateless son funciones puras — dado un set de props, siempre devuelven el mismo JSX. Son triviales de testear.

**Estructura final del proyecto con esta separación**
```
src/
├── App.js       ← STATEFUL: estado + lógica de negocio
├── AppUI.js     ← STATELESS: JSX + estructura visual
├── App.css
├── useLocalStorage/
├── TodoCounter/
├── TodoSearch/
├── TodoList/
├── TodoItem/
└── CreateTodoButton/
```

> Regla práctica: si necesitas encontrar por qué algo falla en los datos → `App.js`. Si necesitas ajustar cómo se ve algo en pantalla → `AppUI.js` o el componente de la carpeta correspondiente.

---

### 7. Estados de Carga y Errores ✅

- **Objetivos:**
  - Simular carga asíncrona de datos con `useEffect` + `setTimeout`
  - Manejar estados de carga, error y lista vacía en la UI
  - Implementar skeleton loaders (siguiente paso)

**Conceptos aprendidos:**

**`useEffect` — sincronizar con el mundo exterior**
`useEffect` es el hook que le dice a React: "ejecuta esto *después* de que el componente se pinte". Se usa para efectos secundarios: leer APIs, timers, localStorage. Recibe dos argumentos: la función a ejecutar y el array de dependencias:

```js
// Sin array: corre después de CADA render (peligroso en bucles)
React.useEffect(() => { console.log('después de cada render'); });

// Array vacío []: corre UNA sola vez, al montar el componente
React.useEffect(() => { console.log('solo al montar'); }, []);

// Con dependencias: corre cada vez que cambia `totalTodos`
React.useEffect(() => { console.log('cambió totalTodos'); }, [totalTodos]);
```

> Regla práctica: `[]` es para carga inicial (fetch de datos, leer localStorage). Con dependencias es para reaccionar a cambios específicos.

**Simular carga asíncrona con `setTimeout`**
Para practicar estados de carga sin una API real, se usa `setTimeout` dentro de `useEffect`:

```js
React.useEffect(() => {
  setTimeout(() => {
    try {
      const localStorageItem = localStorage.getItem(itemName);
      // ... leer y parsear datos ...
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }, 2000); // simula 2 segundos de red
}, []);
```

**Los tres estados de una carga de datos**
Cualquier operación asíncrona tiene tres estados que la UI debe cubrir:

| Estado | Variable | Qué mostrar |
|---|---|---|
| Cargando | `loading: true` | Indicador / skeleton |
| Error | `error: true` | Mensaje de error |
| Vacío | `todos.length === 0` | Mensaje "crea tu primer TODO" |
| Con datos | normal | La lista de TODOs |

**Implementación en `useLocalStorage`**
El hook ahora devuelve un objeto en lugar de un array, para poder nombrar las propiedades sin ambigüedad:

```js
// Antes (array — el orden importa)
const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);

// Ahora (objeto — los nombres importan)
const { item: todos, saveItem: saveTodos, loading, error } = useLocalStorage('TODOS_V1', []);
```

> La diferencia entre array y objeto en el return es pura conveniencia: el array exige respetar el orden; el objeto permite renombrar con `: ` y da más contexto.

**Renderizado condicional en `AppUI`**
Los tres estados se manejan con condicionales dentro del `TodoList`:

```jsx
<TodoList>
  {loading && <p>Estamos cargando...</p>}
  {error && <p>Desespérate, hubo un error!!</p>}
  {(!loading && searchedTodos.length === 0) && <p>¡Crea tu primer TODO!</p>}

  {searchedTodos.map(todo => (
    <TodoItem key={todo.text} ... />
  ))}
</TodoList>
```

> El operador `&&` en JSX: si la condición izquierda es `false`, React no renderiza nada. Si es `true`, renderiza lo del lado derecho.

**Componentes de estado creados**

Cada estado tiene su propio componente en su carpeta, siguiendo el mismo patrón que el resto del proyecto:

| Componente | Carpeta | Estado que representa |
|---|---|---|
| `TodosLoading` | `src/TodosLoading/` | Carga en progreso — skeleton animado |
| `TodosError` | `src/TodosError/` | Error al cargar los datos |
| `EmptyTodos` | `src/EmptyTodos/` | Lista vacía — invita a crear el primer TODO |

**Skeleton loader**
El componente `TodosLoading` imita la forma de un `TodoItem` real (círculo izquierdo, barra de texto, círculo derecho) usando `@keyframes` que alterna entre dos tonos de gris. En `AppUI` se renderizan tres instancias para simular una lista parcial:

```jsx
{loading && (
  <>
    <TodosLoading />
    <TodosLoading />
    <TodosLoading />
  </>
)}
```

> Mostrar varios skeletons en lugar de uno da la ilusión de que hay contenido real cargando, lo que reduce la percepción de espera del usuario.

**Estructura final de la sección**
```
src/
├── TodosLoading/
│   ├── index.js          ← esqueleto animado (3 instancias al cargar)
│   └── TodosLoading.css  ← @keyframes skeleton-loading
├── TodosError/
│   ├── index.js          ← mensaje de error
│   └── TodosError.css
└── EmptyTodos/
    ├── index.js          ← invitación a crear el primer TODO
    └── EmptyTodos.css
```

### 8. Context API ✅

- **Objetivos:**
  - Entender el problema de prop drilling y por qué Context lo resuelve
  - Crear un contexto con `React.createContext`
  - Envolver la app en un `Provider` y consumir datos con `useContext`
  - Mover el estado global de `App.js` al contexto

**Conceptos aprendidos:**

**¿Qué es prop drilling?**
Prop drilling es cuando tienes que pasar una prop por varios niveles de componentes intermedios que no la usan, solo para que llegue a quien la necesita:

```
App.js  →  (loading, error, todos...)
  └── AppUI          recibe todo y lo pasa...
        └── TodoList  recibe todo y lo pasa...
              └── TodoItem  ← aquí es donde se usa
```

Cuando la app crece, esto se vuelve difícil de mantener: cualquier cambio obliga a editar todos los componentes del medio.

**Patrón `TodoProvider` — separar el contexto de `App.js`**
En lugar de poner el `Provider` directamente en `App.js`, se crea un componente `TodoProvider` dedicado en su propia carpeta. Así `App.js` queda limpio y el contexto es portátil:

```jsx
// TodoContext/index.js — contexto + provider en un solo módulo
const TodoContext = React.createContext();

function TodoProvider({ children }) {
  const { item: todos, saveItem: saveTodos, loading, error } = useLocalStorage('TODOS_V1', []);
  const [searchValue, setSearchValue] = React.useState('');

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  const searchedTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(searchValue.toLowerCase())
  );

  const completeTodo = (text) => { ... };
  const deleteTodo = (text) => { ... };

  return (
    <TodoContext.Provider value={{ loading, error, completedTodos, totalTodos,
      searchValue, setSearchValue, searchedTodos, completeTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
```

```jsx
// App.js — ahora son solo 5 líneas útiles
function App() {
  return (
    <TodoProvider>
      <AppUI />
    </TodoProvider>
  );
}
```

**`useContext` — consumir datos sin props**
Cualquier componente dentro del `Provider` puede leer el contexto directamente. `TodoCounter` y `TodoSearch` ya no reciben props — las leen ellos mismos:

```jsx
// TodoCounter/index.js
function TodoCounter() {
  const { completedTodos, totalTodos } = React.useContext(TodoContext);
  ...
}

// TodoSearch/index.js
function TodoSearch() {
  const { searchValue, setSearchValue } = React.useContext(TodoContext);
  ...
}

// AppUI.js — solo consume lo que necesita para renderizar la lista
function AppUI() {
  const { loading, error, searchedTodos, completeTodo, deleteTodo } = React.useContext(TodoContext);
  ...
}
```

**¿Qué cambia en la arquitectura?**

| Antes (prop drilling) | Después (Context) |
|---|---|
| `App` pasaba 9 props a `AppUI` | `App` no pasa ninguna prop |
| `AppUI` recibía y reenviaba `completedTodos`, `totalTodos`, `searchValue`, `setSearchValue` | `TodoCounter` y `TodoSearch` los leen directo del contexto |
| Cambiar una prop obligaba a editar múltiples archivos | Un solo `TodoProvider` centraliza todo el estado |

**Fix de ESLint en `useLocalStorage`**
Al agregar `itemName` al array de dependencias de `useEffect`, `initialValue` (que es `[]`) causaba un loop infinito porque se recrea en cada render. La solución fue capturarlo con `useRef`:

```js
const initialValueRef = React.useRef(initialValue);

React.useEffect(() => {
  // usa initialValueRef.current en lugar de initialValue directamente
}, [itemName]); // itemName es seguro; initialValue queda estabilizado por el ref
```

> `useRef` devuelve un objeto cuya propiedad `.current` persiste entre renders sin provocar re-renders. Ideal para capturar el valor inicial sin que React lo detecte como dependencia cambiante.

**Estructura final del proyecto**
```
src/
├── App.js              ← solo monta TodoProvider + AppUI
├── AppUI.js            ← consume contexto, renderiza la UI
├── TodoContext/
│   └── index.js        ← TodoContext + TodoProvider (estado, lógica, estados derivados)
├── TodoCounter/        ← lee completedTodos/totalTodos del contexto
├── TodoSearch/         ← lee searchValue/setSearchValue del contexto
├── TodoList/           ← contenedor sin estado
├── TodoItem/           ← recibe props de AppUI (componente genérico)
├── CreateTodoButton/
├── TodosLoading/
├── TodosError/
├── EmptyTodos/
└── useLocalStorage/
```

---

## **Fase 4: Organización y Deploy** 🔄 EN CURSO

### 9. React Portals ✅

- **Objetivos:**
  - Entender qué es un Portal y cuándo usarlo
  - Teletransportar un componente fuera del árbol del DOM de React
  - Gestionar el estado del modal con Context
  - Crear un overlay con animaciones CSS

**Conceptos aprendidos:**

**¿Qué es un Portal?**
Normalmente todo lo que React renderiza queda dentro del `<div id="root">` del HTML. Un Portal permite montar un componente en cualquier otro nodo del DOM, fuera de ese árbol, sin perder el contexto de React ni el sistema de eventos:

```js
// ReactDOM.createPortal(lo que renderiza, dónde lo monta)
ReactDOM.createPortal(<div>Hola</div>, document.getElementById('modal'));
```

El componente sigue siendo "hijo" lógico de React (hereda contexto, recibe eventos) pero en el DOM real aparece en otro lugar.

**¿Por qué necesitamos un Portal para el modal?**
El problema sin Portal: si el modal está dentro de `.App`, hereda sus estilos de `overflow`, `z-index` y `position`. Esto puede hacer que el overlay no cubra toda la pantalla o que quede tapado por otros elementos. Con un Portal, el modal se monta directamente en el `<body>`, sin restricciones del árbol padre:

```
DOM sin Portal               DOM con Portal
────────────────────         ────────────────────
<body>                       <body>
  <div id="root">              <div id="root">
    <div class="App">            <div class="App">
      ...                          ...
      <div class="Modal">        </div>          ← Modal NO está aquí
      </div>                   </div>
    </div>                     <div id="modal">  ← Modal SÍ está aquí
  </div>                         <div class="Modal"> ...
</body>                       </body>
```

**Paso 1 — Agregar el nodo destino en `public/index.html`**
El Portal necesita un nodo real en el HTML donde montarse. Se agrega junto al `#root`:

```html
<body>
  <div id="root"></div>
  <div id="modal"></div>  <!-- ← nodo destino del Portal -->
</body>
```

**Paso 2 — Crear el componente `Modal`**
```jsx
// Modal/index.js
import ReactDOM from 'react-dom';
import './Modal.css';

function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="ModalBackground">
      <div className="ModalContainer">
        {children}  {/* ← lo que sea que el padre ponga dentro de <Modal> */}
      </div>
    </div>,
    document.getElementById('modal')  // ← nodo destino
  );
}
```

`children` hace que `Modal` sea un componente contenedor genérico — no le importa qué hay adentro, solo provee el overlay y el card.

**Paso 3 — Estado `openModal` en el contexto**
El estado que controla si el modal está abierto o cerrado vive en `TodoContext` para que tanto `CreateTodoButton` como `TodoForm` puedan leerlo y modificarlo sin prop drilling:

```js
// TodoContext/index.js
const [openModal, setOpenModal] = React.useState(false);

// se expone en el Provider junto al resto
value={{ ..., openModal, setOpenModal }}
```

**Paso 4 — `CreateTodoButton` hace el toggle**
El botón lee `setOpenModal` del contexto y alterna el estado. Usar `state => !state` (forma funcional) garantiza que siempre invierte el valor actual, independientemente de cuándo se ejecute:

```jsx
function CreateTodoButton() {
  const { setOpenModal } = React.useContext(TodoContext);

  return (
    <button onClick={() => setOpenModal(state => !state)}>
      <span>+</span>
    </button>
  );
}
```

**Paso 5 — Renderizado condicional en `AppUI`**
El Modal solo se monta cuando `openModal` es `true`. Al desmontarse, React llama a `ReactDOM.createPortal` con `null` internamente y el nodo desaparece del DOM:

```jsx
{openModal && (
  <Modal>
    <TodoForm />
  </Modal>
)}
```

**El z-index y la decisión de diseño**
Durante la implementación se subió el `z-index` del botón a `3000` para que quedara encima del overlay (`2000`). Pero una vez que el formulario tuvo su propio botón "Cancelar", se revirtió a `1000`. La razón: el overlay existe para enfocar la atención en el formulario; dejar el botón visible por encima rompe ese foco sin aportar valor:

| z-index | Elemento | Justificación |
|---|---|---|
| `1000` | `CreateTodoButton` | Encima de la UI normal, tapado por el overlay |
| `2000` | `ModalBackground` | Cubre toda la pantalla, bloquea interacción con el fondo |

**Animaciones CSS del modal**
El overlay y el card tienen animaciones de entrada para suavizar la aparición:

```css
/* El fondo aparece con fade */
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* El card sube con rebote (cubic-bezier con overshoot) */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
```

> `backdrop-filter: blur(6px)` en el overlay da el efecto de cristal esmerilado que hace que el fondo se vea difuminado sin ocultarlo completamente.

**Estructura de archivos creados**
```
src/
├── Modal/
│   ├── index.js      ← ReactDOM.createPortal apuntando a #modal
│   └── Modal.css     ← overlay blur + animaciones fadeIn/slideUp
```

---

### 10. Formulario Controlado (TodoForm) ✅

- **Objetivos:**
  - Crear un formulario controlado con estado local
  - Manejar el evento `onSubmit` y `preventDefault`
  - Agregar nuevos TODOs al estado global desde el formulario
  - Deshabilitar el botón de submit cuando el input está vacío

**Conceptos aprendidos:**

**¿Qué es un formulario controlado?**
En React, un formulario "controlado" es aquel donde el valor del `<input>` siempre está sincronizado con un estado de React. El estado es la fuente de verdad — no el DOM:

```jsx
// El input NO tiene "memoria" propia
// Su valor ES el estado, y solo cambia cuando el estado cambia
const [newTodoValue, setNewTodoValue] = React.useState('');

<input
  value={newTodoValue}                          // ← React controla el valor
  onChange={(e) => setNewTodoValue(e.target.value)}  // ← actualiza el estado al escribir
/>
```

Comparado con un input no controlado (donde usarías `ref` para leer el DOM), el controlado permite validar, formatear o sincronizar el valor en tiempo real.

**`event.preventDefault()` en formularios**
Por defecto, al hacer submit un formulario HTML recarga la página. En React eso destruiría el estado. `preventDefault` cancela ese comportamiento nativo:

```jsx
const onSubmit = (event) => {
  event.preventDefault();   // ← cancela la recarga de página
  addTodo(newTodoValue);    // ← agrega el TODO al estado global
  setOpenModal(false);      // ← cierra el modal
};

<form onSubmit={onSubmit}>
  ...
  <button type="submit">Agregar</button>
</form>
```

> Usar `type="submit"` en el botón y `onSubmit` en el `<form>` (no `onClick` en el botón) es la forma correcta. Así también funciona al presionar `Enter` en el input.

**Deshabilitar el botón cuando el input está vacío**
Se usa el atributo `disabled` de forma dinámica. `.trim()` ignora espacios en blanco — así el usuario no puede agregar un TODO con solo espacios:

```jsx
<button
  type="submit"
  disabled={!newTodoValue.trim()}  // ← true si está vacío o solo tiene espacios
>
  Agregar
</button>
```

**`addTodo` en el contexto**
La función para agregar un TODO vive en `TodoContext` siguiendo el mismo patrón de `completeTodo` y `deleteTodo`. Crea un nuevo array (inmutabilidad) con el TODO nuevo al final:

```js
// TodoContext/index.js
const addTodo = (text) => {
  const newTodos = [...todos, { text, completed: false }];
  saveTodos(newTodos);  // persiste en localStorage y actualiza el estado
};

// se expone en el Provider
value={{ ..., addTodo }}
```

> `[...todos, { text, completed: false }]` es la forma idiomática de agregar al final de un array sin mutarlo. Nunca `todos.push(...)` — eso muta el array original y React no detectaría el cambio.

**Flujo completo de crear un TODO**
```
Usuario escribe en el input
  → onChange actualiza newTodoValue (estado local del form)
    → Usuario hace click en "Agregar" (o presiona Enter)
      → onSubmit llama addTodo(newTodoValue)
        → addTodo crea nuevo array y llama saveTodos
          → saveTodos guarda en localStorage y llama setTodos
            → React re-renderiza la lista con el nuevo TODO
              → setOpenModal(false) cierra el modal
```

**Botón "Cancelar"**
Cierra el modal sin agregar nada. Al llamar `setOpenModal(false)` directamente, el estado `newTodoValue` se descarta automáticamente porque el componente se desmonta:

```jsx
const onCancel = () => {
  setOpenModal(false);  // el form se desmonta → newTodoValue desaparece
};
```

**Estructura de archivos creados**
```
src/
├── TodoForm/
│   ├── index.js      ← formulario controlado, consume addTodo y setOpenModal del contexto
│   └── TodoForm.css  ← estilos: input con focus ring púrpura, botones primario/cancelar
```

**Estado del contexto tras esta sección**
```js
// TodoContext ahora expone:
{
  loading, error,               // estado de carga
  completedTodos, totalTodos,   // contadores
  searchValue, setSearchValue,  // búsqueda
  searchedTodos,                // lista filtrada
  completeTodo, deleteTodo,     // acciones existentes
  addTodo,                      // ← nuevo: agregar TODO
  openModal, setOpenModal,      // ← nuevo: control del modal
}
```

---

### 11. Deploy en GitHub Pages ✅

- **Objetivos:**
  - Preparar la aplicación para producción
  - Publicar en GitHub Pages con `gh-pages`
  - Corregir bug de estados vacíos en la UI

**Conceptos aprendidos:**

**Fix previo al deploy — estados vacíos diferenciados**
Antes del deploy se detectó un bug de lógica: el mensaje "¡Crea tu primer TODO!" aparecía también al buscar algo inexistente. La causa: la condición `searchedTodos.length === 0` se disparaba en dos situaciones distintas que necesitan mensajes distintos:

```jsx
// ❌ Antes: un solo caso para dos situaciones diferentes
{(!loading && searchedTodos.length === 0) && <EmptyTodos />}

// ✅ Después: cada situación tiene su propio componente
{(!loading && totalTodos === 0) && <EmptyTodos />}
{(!loading && totalTodos > 0 && searchedTodos.length === 0) && <TodosNotFound />}
```

| Situación | Componente | Mensaje |
|---|---|---|
| Sin TODOs en absoluto | `EmptyTodos` | "¡Crea tu primer TODO!" |
| Búsqueda sin coincidencias | `TodosNotFound` | "No encontramos resultados para tu búsqueda." |

**¿Qué es GitHub Pages?**
GitHub Pages es un servicio gratuito de GitHub que publica archivos estáticos directamente desde un repositorio. Para una app de React, el flujo es: hacer el build de producción (que genera HTML/CSS/JS estático en la carpeta `build/`) y subir esa carpeta a la rama `gh-pages` del repositorio.

**`gh-pages` — el paquete que automatiza el proceso**
Sin `gh-pages`, tendrías que copiar manualmente la carpeta `build/` y hacer push a la rama `gh-pages`. El paquete lo hace en un solo comando:

```bash
npm install --save-dev gh-pages
```

**Configuración en `package.json`**
Se necesitan dos cambios:

```json
{
  "homepage": "https://nerfe5.github.io/curso-react-intro",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

- `homepage` — le dice a React cuál es la URL base de producción. Sin esto, los assets (JS, CSS, imágenes) no se cargarían correctamente porque React asumiría que la app está en la raíz `/` y no en `/curso-react-intro/`.
- `predeploy` — script que npm ejecuta automáticamente **antes** de `deploy`. Garantiza que siempre se construye la versión más reciente antes de publicar.
- `deploy` — ejecuta `gh-pages -d build`, que sube el contenido de la carpeta `build/` a la rama `gh-pages` del repositorio.

**El comando `npm run deploy` hace todo esto:**
```
npm run deploy
  → npm run predeploy    (automático)
    → npm run build      → genera carpeta build/ optimizada
  → gh-pages -d build   → sube build/ a la rama gh-pages de GitHub
    → GitHub Pages sirve esos archivos en la URL configurada
```

**Resultado del build de producción**
```
File sizes after gzip:
  46.7 kB  build/static/js/main.d7fc11b7.js
  1.99 kB  build/static/css/main.b39bdd5a.css
```

> React en producción aplica minificación, tree-shaking y code-splitting. El resultado es significativamente más pequeño que el código fuente.

**App publicada:** https://nerfe5.github.io/curso-react-intro

**Estructura final del proyecto completo**
```
src/
├── App.js                  ← monta TodoProvider + AppUI
├── AppUI.js                ← consume contexto, renderiza toda la UI
├── App.css
├── index.js
├── index.css
├── TodoContext/            ← estado global, lógica, acciones
├── useLocalStorage/        ← hook de persistencia
├── Modal/                  ← Portal de React, overlay animado
├── TodoForm/               ← formulario controlado para crear TODOs
├── TodoCounter/            ← contador de completados/total
├── TodoSearch/             ← buscador en tiempo real
├── TodoList/               ← contenedor de la lista
├── TodoItem/               ← item individual
├── CreateTodoButton/       ← botón flotante, toggle del modal
├── TodosLoading/           ← skeleton loader (3 instancias)
├── TodosError/             ← mensaje de error de carga
├── EmptyTodos/             ← lista vacía: "¡Crea tu primer TODO!"
└── TodosNotFound/          ← búsqueda sin resultados
```

---

## 📊 Resumen del Proyecto

| Fase | Estado | Temas |
|------|--------|-------|
| Fase 1 - Fundamentos | ✅ Completada | React, JSX, Componentes, Props |
| Fase 2 - TODO Machine | ✅ Completada | Maquetación, useState, Eventos, Filtrado |
| Fase 3 - Avanzado | ✅ Completada | useEffect, localStorage, Skeleton loaders, Context API |
| Fase 4 - Deploy | ✅ Completada | React Portals, Formulario controlado, GitHub Pages |

- **Duración total estimada:** 25-35 horas
- **Nivel:** Principiante a Intermedio
- **Tecnologías:** React 18, CSS3, LocalStorage, GitHub Pages
- **Resultado final:** Aplicación TODO completa y deployada en https://nerfe5.github.io/curso-react-intro

---

## ✅ Estado Actual

**Estado:** Curso completado ✅
**Progreso:** Todas las fases completadas — app publicada en producción.

---

## 📚 Recursos Adicionales

- [Documentación oficial de React](https://react.dev)
- [Curso en Platzi](https://platzi.com/reactjs)
- [Create React App Docs](https://create-react-app.dev)

---

**Última actualización:** 4 de Junio, 2026 — Curso completado ✅. App publicada en https://nerfe5.github.io/curso-react-intro
