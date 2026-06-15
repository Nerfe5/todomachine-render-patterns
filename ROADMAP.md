# 🗺️ ROADMAP · Curso de Patrones de Render y Composición en React

Plan de trabajo del curso. Cada módulo tiene su rama `feature/`, sus objetivos de aprendizaje, los archivos que tocaremos en Todomachine y la justificación de **por qué** el refactor mejora el código.

**Estado:** ⬜ pendiente · 🟨 en progreso · ✅ completado

---

## Módulo 0 — Setup del curso ✅

**Rama:** `feature/00-setup-curso`

- [x] Control de versiones inicializado (`main` como rama principal)
- [x] README.md del nuevo curso
- [x] GITFLOW.md con el flujo de trabajo
- [x] ROADMAP.md (este documento)
- [x] Estructura de `docs/` (notas por módulo + examen final)
- [x] Renombrar el proyecto en `package.json`

---

## Módulo 1 — Filosofía y principios de diseño de React ✅

**Rama:** `feature/01-filosofia-react` · **Tipo:** teórico + auditoría de código

### Objetivos
- Entender los principios de diseño de React: **composición sobre herencia**, **flujo unidireccional de datos**, **la UI como función del estado** (`UI = f(state)`), y **declarativo vs. imperativo**.
- Auditar Todomachine: identificar dónde el código actual ya respeta estos principios y dónde no.

### Entregable
- `docs/notas/01-filosofia-react.md` con la auditoría: lista de "olores de código" que atacaremos en los módulos siguientes (ej: usar `todo.text` como key e identificador, el provider que mezcla persistencia con lógica de negocio, componentes acoplados al Context).

### ¿Por qué importa?
Sin entender la filosofía, los patrones se aplican por moda. Con ella, cada patrón se vuelve una respuesta a un problema concreto.

---

## Módulo 2 — Composición de componentes ✅

**Rama:** `feature/02-composicion`

### Objetivos
- Dominar `children` como mecanismo principal de composición (ya lo usamos en `TodoList` y `Modal` — ahora entenderemos por qué).
- Refactor: extraer un componente `TodoHeader` que reciba `TodoCounter` y `TodoSearch` como children (patrón de *slots*).
- Diferenciar componentes **contenedores** (lógica) de **presentacionales** (UI pura).

### Archivos a tocar
`src/AppUI.js`, nuevo `src/TodoHeader/`

### ¿Por qué importa?
La composición evita la "perforación de props" (*prop drilling*) innecesaria y hace los componentes reutilizables sin herencia.

---

## Módulo 3 — Colocación del estado (state colocation) ✅

**Rama:** `feature/03-colocacion-estado`

### Objetivos
- Principio: **el estado debe vivir lo más cerca posible de donde se usa**.
- Auditar el `TodoContext`: ¿realmente todo necesita ser global? (`searchValue` y `openModal` son candidatos a bajar de nivel).
- Refactor: pasar `loading` como prop a `TodoHeader` para deshabilitar la búsqueda durante la carga, demostrando props vs. context en el mismo árbol.

### Archivos a tocar
`src/TodoContext/index.js`, `src/AppUI.js`, `src/TodoSearch/`, `src/TodoCounter/`

### ¿Por qué importa?
Estado global innecesario = re-renders innecesarios + componentes imposibles de reutilizar fuera del provider.

---

## Módulo 4 — Render Props ✅

**Rama:** `feature/04-render-props`

### Objetivos
- Entender las props que contienen funciones de render.
- Refactor: convertir `TodoList` para que reciba `render`/children-como-función y decida internamente qué mostrar (loading, error, vacío, no encontrado, lista) — el famoso patrón de *render functions* para los estados de la UI.
- Mover la lógica condicional de `AppUI` hacia `TodoList`.

### Archivos a tocar
`src/TodoList/index.js`, `src/AppUI.js`

### ¿Por qué importa?
`AppUI` deja de conocer los detalles de cada estado; `TodoList` se vuelve dueña de su lógica de render y reutilizable con cualquier ítem.

---

## Módulo 5 — Higher-Order Components (HOCs) ✅

**Rama:** `feature/05-hocs`

### Objetivos
- Crear un HOC de ejemplo (`withTodoContext` o `withLogger`) para entender la mecánica: función que recibe un componente y devuelve uno mejorado.
- Comparar la misma solución con Render Props y con hooks.
- Entender sus problemas históricos: *wrapper hell*, colisión de props, indirección.

### Archivos a tocar
nuevo `src/HOCs/`, demostración sobre `TodoItem` o `TodoCounter`

### ¿Por qué importa?
Aunque hoy se prefieren los hooks, los HOCs siguen vivos en librerías y código legacy. Entenderlos explica por qué existen los hooks.

---

## Módulo 6 — React Hooks como patrón definitivo ✅

**Rama:** `feature/06-hooks`

### Objetivos
- Extraer la lógica de `TodoProvider` a un custom hook `useTodos` (separar lógica de negocio de la capa de Context).
- Mejorar `useLocalStorage` con `useReducer` para estados relacionados (`loading`, `error`, `item`).
- Resolver de paso los olores detectados en el Módulo 1 (ids reales para los todos, mutación accidental en `completeTodo`).
- Comparativa final: Render Props vs. HOCs vs. Hooks — mismo problema, tres soluciones.

### Archivos a tocar
`src/TodoContext/`, nuevo `src/useTodos/`, `src/useLocalStorage/`

### ¿Por qué importa?
Los hooks son la respuesta moderna de React al problema de compartir lógica con estado. Cierran el arco completo del curso.

---

## Módulo 7 — Examen final ⬜

**Rama:** `feature/07-examen-final`

- [ ] Completar `docs/EXAMEN.md`: ~20 preguntas de opción múltiple estilo Platzi
- [ ] Cubrir todos los módulos (2–3 preguntas por tema mínimo)
- [ ] Incluir hoja de respuestas con explicación de cada respuesta correcta
- [ ] Las preguntas se van redactando **al cierre de cada módulo** para reflejar lo realmente aprendido

---

## 📐 Convenciones del curso

- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/) — `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`
- **Ramas:** `feature/XX-nombre-descriptivo`
- **Cada módulo termina con:** código mergeado a `main` + nota en `docs/notas/` + preguntas agregadas al examen
