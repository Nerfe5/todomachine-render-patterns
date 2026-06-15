# 📝 Examen Final · Curso de Patrones de Render y Composición en React

Simulación del examen de Platzi al cierre del curso. **Este documento se construye progresivamente**: al terminar cada módulo agregamos 2–3 preguntas de opción múltiple sobre lo aprendido, con su explicación en la hoja de respuestas.

**Formato Platzi:** opción múltiple, una sola respuesta correcta, ~20 preguntas, sin límite de tiempo, se aprueba con la mayoría de aciertos.

---

## Estado de construcción

| Módulo | Preguntas | Estado |
|--------|-----------|--------|
| 1. Filosofía de React | 1–3 | ✅ listas |
| 2. Composición de componentes | 4–6 | ✅ listas |
| 3. Colocación del estado | 7–9 | ✅ listas |
| 4. Render Props | 10–12 | ✅ listas |
| 5. Higher-Order Components | 13–15 | ✅ listas |
| 6. React Hooks | 16–18 | ✅ listas |

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

### Módulo 3 · Colocación del estado

### 7. Según el principio de *state colocation*, ¿cuál es la pregunta clave para decidir dónde debe vivir una pieza de estado?

- A) ¿Qué tan grande es el objeto que se guarda en el estado?
- B) ¿Quiénes leen y quiénes escriben ese estado, y dónde están en el árbol?
- C) ¿El estado se actualiza con eventos síncronos o asíncronos?
- D) ¿El estado necesita persistirse en localStorage?

### 8. En el refactor, `openModal` salió del contexto global hacia `AppUI`. ¿Cuál fue la razón principal?

- A) useState no funciona dentro de un Provider
- B) Los modales en React siempre deben manejarse con estado local
- C) Todos sus consumidores (botón, modal, formulario) viven en el subárbol de AppUI, su ancestro común más cercano; además, cada toggle re-renderizaba a todos los consumidores del contexto
- D) El contexto tiene un límite de propiedades en su value

### 9. ¿Qué hace `React.cloneElement(child, { loading })` en nuestro `TodoHeader`?

- A) Duplica el componente hijo en el DOM, renderizándolo dos veces
- B) Crea una copia del elemento hijo agregándole la prop `loading`, permitiendo que el wrapper inyecte props sin conocer a sus children
- C) Clona el estado interno del hijo para compartirlo con sus hermanos
- D) Convierte al hijo en un componente controlado por el contexto

### Módulo 4 · Render Props

### 10. ¿Qué es una render prop?

- A) Una prop que solo acepta componentes de clase como valor
- B) Una prop cuyo valor es una función que devuelve elementos React, permitiendo que el componente decida cuándo y con qué datos ejecutarla
- C) Una prop especial de React que renderiza HTML directamente sin JSX
- D) Cualquier prop que se pase a un componente que hace render

### 11. En el refactor, ¿qué ganó TodoList al recibir `onError`, `onLoading`, `onEmptyTodos` y `onEmptySearchResults` como funciones?

- A) Renderiza más rápido porque las funciones se evalúan de forma diferida
- B) Se volvió dueña de CUÁNDO mostrar cada estado sin conocer QUÉ se muestra: la lógica condicional salió de AppUI y TodoList sigue sin importar ningún componente concreto
- C) Puede modificar el contexto global desde dentro de la lista
- D) Evita por completo los re-renders del componente padre

### 12. ¿Cuál es hoy el principal caso donde los render props siguen siendo el patrón correcto frente a los hooks?

- A) Compartir lógica con estado entre componentes, como suscripciones o fetching
- B) Reemplazar a useEffect en componentes funcionales
- C) Delegar la decisión de QUÉ UI pintar mientras el componente controla CUÁNDO y con qué datos (inversión del control del render)
- D) Ya no existe ningún caso: los hooks reemplazaron a los render props por completo

### Módulo 5 · Higher-Order Components

### 13. ¿Qué es un Higher-Order Component?

- A) Un componente de clase que hereda de otro componente para extenderlo
- B) Una función que recibe un componente y devuelve un componente nuevo con capacidades adicionales
- C) Un componente que se renderiza por encima de los demás en el z-index
- D) Un hook que envuelve componentes para conectarlos al contexto

### 14. En `withTodoContext`, el componente envuelto se renderiza como `<Component {...todoContext} {...props} />`. ¿Por qué importa el orden de los spreads?

- A) No importa: React fusiona las props alfabéticamente
- B) El primero siempre gana, por eso el contexto va primero
- C) En JSX, ante props repetidas gana la última: poner {...props} después permite que las props del padre sobrescriban a las inyectadas por el HOC
- D) Poner {...props} al final evita que el componente re-renderice

### 15. ¿Por qué NUNCA debe aplicarse un HOC dentro del cuerpo de render de otro componente?

- A) Porque los HOCs solo funcionan con componentes de clase
- B) Porque React lanza un error de hooks condicionales
- C) Porque se crearía un tipo de componente distinto en cada render, forzando a React a desmontar y remontar el subárbol completo (perdiendo estado y DOM)
- D) Porque los HOCs no pueden acceder a props definidas en tiempo de render

### Módulo 6 · React Hooks

### 16. ¿Cuál es la ventaja principal de los custom hooks sobre los HOCs y render props para compartir lógica con estado?

- A) Los hooks renderizan más rápido porque evitan crear componentes adicionales
- B) Los hooks no necesitan importarse: React los detecta automáticamente por el prefijo `use`
- C) La lógica compartida es plana y explícita: sin wrappers en el árbol de componentes, sin anidamiento de funciones y sin colisiones silenciosas de props
- D) Los hooks permiten usar estado en componentes de clase sin refactorizarlos

### 17. En el refactor de `completeTodo`, ¿por qué `todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)` es correcto y `newTodos[index].completed = true` no?

- A) Porque `.map()` es más rápido que el acceso por índice
- B) Porque el spread crea un nuevo objeto para el todo modificado y `.map()` crea un nuevo array, garantizando nuevas referencias en ambos niveles. La mutación directa deja la misma referencia de objeto: React.memo y comparaciones de estado previo quedan ciegos al cambio
- C) Porque `true` es un valor primitivo que no puede asignarse a propiedades de objetos en arrays
- D) Porque `findIndex` devuelve -1 cuando no encuentra el elemento, lo que causaría un error

### 18. `TodoProvider` delega toda su lógica a `useTodos` pero sigue existiendo. ¿Por qué no eliminarlo y llamar `useTodos()` directamente en AppUI pasando todo por props?

- A) Porque los custom hooks solo pueden llamarse desde un Provider
- B) Porque `useTodos` usa `useLocalStorage`, que requiere estar dentro de un Context
- C) Funcionaría para un árbol pequeño, pero en cuanto componentes profundos como `TodoForm` necesiten `addTodo`, el prop drilling vuelve. El Provider resuelve el ALCANCE (distribución sin prop drilling); el hook resuelve la LÓGICA. Son problemas distintos con herramientas distintas
- D) Porque React no permite que AppUI consuma directamente un hook que usa useLocalStorage

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

**7. Respuesta: B** — La colocación se decide por el mapa de lectores/escritores: un solo componente → estado local; varios cercanos → ancestro común; ramas lejanas → contexto. El tamaño (A), la sincronía (C) o la persistencia (D) influyen en otras decisiones, no en DÓNDE vive el estado.

**8. Respuesta: C** — Es el caso de libro de colocation: parecía global porque "lo usaban 3 componentes", pero los 3 comparten subárbol. Moverlo a AppUI alivió al contexto (cada apertura/cierre del modal generaba un value nuevo y re-renderizaba a todos los consumidores). A y D son falsedades técnicas; B convierte una decisión contextual en regla absoluta, que es justo lo que el módulo enseña a NO hacer.

**9. Respuesta: B** — cloneElement crea una copia del elemento con props extra mezcladas; junto con React.Children.toArray permite que un wrapper coordine hijos que no conoce. No duplica nada en el DOM (A), no existe "clonar estado" entre hermanos (C) y no involucra contexto (D). Bonus: la documentación moderna lo marca como legacy — sus alternativas son render props (Módulo 4) o Context.

**10. Respuesta: B** — La esencia del patrón es la inversión de control: quien usa el componente entrega una receta (función → elementos) y el componente decide cuándo cocinarla y con qué ingredientes (argumentos). Puede llegar como children (children as a function) o como prop con nombre. A, C y D no describen el patrón.

**11. Respuesta: B** — Es exactamente el cierre del Olor #6: la lista conoce sus situaciones (cargando, vacía, sin resultados...) y el padre declara la UI de cada una. TodoList no importa TodosError ni TodoItem: ejecuta funciones que le pasaron. A confunde con lazy evaluation (las funciones se ejecutan en el mismo render), C y D son falsos.

**12. Respuesta: C** — Para compartir LÓGICA con estado (A) los hooks son el reemplazo moderno. Pero cuando lo que se delega es UI —"tú decides cuándo, yo decido qué se pinta"— los render props siguen vigentes y se usan en librerías actuales (TanStack Table, Downshift, Headless UI). D es demasiado absoluto, y B no tiene sentido: los render props no sustituyen efectos.

**13. Respuesta: B** — Un HOC no es un componente ni una API de React: es una FUNCIÓN (patrón de higher-order functions) que envuelve componentes para agregarles props o comportamiento. A describe herencia (justo lo que React evita), C confunde con CSS, D mezcla conceptos: los hooks no envuelven componentes.

**14. Respuesta: C** — En JSX las props repetidas se resuelven como en los objetos: la última gana. `{...todoContext} {...props}` es una decisión de diseño: si el padre pasa explícitamente una prop que el HOC también inyecta, manda el padre. Invertir el orden haría que el HOC pisara silenciosamente las props del padre — fuente clásica de bugs.



**16. Respuesta: C** — Los hooks componen de forma lineal (3 `const` en 3 líneas, sin anidar). HOCs producen wrapper hell en DevTools; render props producen pirámides de funciones; ambos pueden colisionar props silenciosamente. A es falso (no hay garantía de performance); B es inventado (los hooks se importan como cualquier función); D es lo opuesto: los hooks NO funcionan en clases.

**17. Respuesta: B** — La mutación directa deja la misma referencia de objeto en memoria. Como React compara por referencia para decidir re-renders, `React.memo` y optimizaciones similares no detectan el cambio. El patrón correcto crea nuevas referencias en ambos niveles: array nuevo (map) y objeto nuevo (spread). A es irrelevante para la corrección; C es falso (la asignación de primitivos a propiedades es válida); D describe otro escenario distinto.

**18. Respuesta: C** — Es la distinción clave del módulo: los hooks resuelven LÓGICA (cómo se calcula el estado), el Context resuelve ALCANCE (cómo llega a componentes profundos sin pasar por intermediarios). Eliminar el Provider funcionaría si la app fuera completamente plana, pero en cuanto hay profundidad el prop drilling regresa. A y B son falsedades técnicas; D no existe como restricción de React.

**15. Respuesta: C** — `withX(Component)` devuelve una función nueva CADA vez que se llama. Si eso ocurre en un render, React ve un "tipo" diferente en cada pasada, descarta el subárbol anterior y lo monta de cero: se pierde estado local (lo escrito en inputs), foco y DOM. Por eso los HOCs se aplican una sola vez, a nivel de módulo. B menciona una regla real de hooks pero no es lo que pasa aquí; A y D son falsas.

<!--
Plantilla de respuesta:

**N. Respuesta: X** — Explicación de por qué es correcta y por qué las demás no.
-->
