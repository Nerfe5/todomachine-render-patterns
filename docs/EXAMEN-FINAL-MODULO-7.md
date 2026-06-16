# 📝 Examen Final · Curso de React.js: Patrones de Render

> **Formato real Platzi:** 14 preguntas · 28 minutos · 5 vidas
> Cada respuesta incorrecta quita una vida. Puedes saltar preguntas.
> Practica aquí antes de enfrentarte al examen real. 💪

---

## 📊 Tu marcador

Lleva la cuenta mientras avanzas:

| Sección | Preguntas | Correctas | Vidas usadas |
|---------|-----------|-----------|--------------|
| Opción múltiple | 1–14 | __ / 14 | __ / 5 |

---

## 🔵 Sección 1 — Opción múltiple

### 1. En React, la expresión `UI = f(state)` significa que:

- A) La UI se actualiza manipulando directamente el DOM cuando cambia el estado
- B) La interfaz es el resultado de evaluar los componentes con el estado actual; para cambiar la UI, cambiamos el estado
- C) Cada componente debe tener una función llamada `f` que reciba el estado
- D) El estado solo puede modificarse desde funciones puras

---

### 2. ¿Por qué `newTodos[todoIndex].completed = true` después de `const newTodos = [...todos]` viola la inmutabilidad?

- A) Porque el spread operator no copia arrays, solo objetos
- B) Porque `findIndex` devuelve una copia del elemento, no el original
- C) Porque el spread hace una copia superficial: el array es nuevo, pero los objetos internos siguen siendo los mismos, y estamos mutando el original
- D) No la viola: al crear `newTodos` con spread, todo lo que contiene ya es una copia segura

---

### 3. ¿Qué es una render prop?

- A) Una prop que solo acepta componentes de clase como valor
- B) Una prop cuyo valor es una función que devuelve elementos React, permitiendo que el componente decida cuándo y con qué datos ejecutarla
- C) Una prop especial de React que renderiza HTML directamente sin JSX
- D) Cualquier prop que se pase a un componente que hace render

---

### 4. ¿Qué es un Higher-Order Component?

- A) Un componente de clase que hereda de otro componente para extenderlo
- B) Una función que recibe un componente y devuelve un componente nuevo con capacidades adicionales
- C) Un componente que se renderiza por encima de los demás en el z-index
- D) Un hook que envuelve componentes para conectarlos al contexto

---

### 5. ¿Cuál es la ventaja principal de los custom hooks sobre los HOCs y render props para compartir lógica con estado?

- A) Los hooks renderizan más rápido porque evitan crear componentes adicionales
- B) Los hooks no necesitan importarse: React los detecta automáticamente por el prefijo `use`
- C) La lógica compartida es plana y explícita: sin wrappers en el árbol, sin anidamiento de funciones y sin colisiones silenciosas de props
- D) Los hooks permiten usar estado en componentes de clase sin refactorizarlos

---

### 6. Según el principio de *state colocation*, ¿cuál es la pregunta clave para decidir dónde debe vivir una pieza de estado?

- A) ¿Qué tan grande es el objeto que se guarda en el estado?
- B) ¿Quiénes leen y quiénes escriben ese estado, y dónde están en el árbol?
- C) ¿El estado se actualiza con eventos síncronos o asíncronos?
- D) ¿El estado necesita persistirse en localStorage?

---

### 7. ¿Qué hace `React.cloneElement(child, { loading })` en `TodoHeader`?

- A) Duplica el componente hijo en el DOM, renderizándolo dos veces
- B) Crea una copia del elemento hijo agregándole la prop `loading`, permitiendo que el wrapper inyecte props sin conocer a sus children
- C) Clona el estado interno del hijo para compartirlo con sus hermanos
- D) Convierte al hijo en un componente controlado por el contexto

---

### 8. En `withTodoContext`, el componente se renderiza como `<Component {...todoContext} {...props} />`. ¿Por qué importa el orden de los spreads?

- A) No importa: React fusiona las props alfabéticamente
- B) El primero siempre gana, por eso el contexto va primero
- C) En JSX, ante props repetidas gana la última: poner `{...props}` después permite que las props del padre sobrescriban a las inyectadas por el HOC
- D) Poner `{...props}` al final evita que el componente re-renderice

---

### 9. ¿Por qué NUNCA debe aplicarse un HOC dentro del cuerpo de render de otro componente?

- A) Porque los HOCs solo funcionan con componentes de clase
- B) Porque React lanza un error de hooks condicionales
- C) Porque se crearía un tipo de componente distinto en cada render, forzando a React a desmontar y remontar el subárbol completo, perdiendo estado y DOM
- D) Porque los HOCs no pueden acceder a props definidas en tiempo de render

---

### 10. ¿Por qué `todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)` es correcto y `newTodos[index].completed = true` no?

- A) Porque `.map()` es más rápido que el acceso por índice
- B) Porque el spread crea un nuevo objeto y `.map()` crea un nuevo array, garantizando nuevas referencias en ambos niveles. La mutación directa deja la misma referencia: `React.memo` y comparaciones de estado previo quedan ciegos al cambio
- C) Porque `true` es un valor primitivo que no puede asignarse a propiedades de objetos en arrays
- D) Porque `findIndex` devuelve -1 cuando no encuentra el elemento

---

### 11. `TodoProvider` delega toda su lógica a `useTodos` pero sigue existiendo. ¿Por qué no eliminarlo y llamar `useTodos()` directamente en `AppUI`?

- A) Porque los custom hooks solo pueden llamarse desde un Provider
- B) Porque `useTodos` usa `useLocalStorage`, que requiere estar dentro de un Context
- C) Funcionaría para un árbol pequeño, pero en cuanto componentes profundos como `TodoForm` necesiten `addTodo`, el prop drilling regresa. El Provider resuelve el ALCANCE; el hook resuelve la LÓGICA
- D) Porque React no permite que `AppUI` consuma directamente un hook que usa `useLocalStorage`

---

### 12. ¿Cuál es hoy el principal caso donde los render props siguen siendo el patrón correcto frente a los hooks?

- A) Compartir lógica con estado entre componentes, como suscripciones o fetching
- B) Reemplazar a `useEffect` en componentes funcionales
- C) Delegar la decisión de QUÉ UI pintar mientras el componente controla CUÁNDO y con qué datos (inversión del control del render)
- D) Ya no existe ningún caso: los hooks reemplazaron a los render props por completo

---

### 13. ¿Cuál es la postura de React respecto a la herencia entre componentes?

- A) Se recomienda para compartir estilos entre componentes similares
- B) Es obligatoria al usar componentes de clase
- C) Se usa solo para los Higher-Order Components
- D) No se recomienda: la reutilización se logra con composición (children y props), que ofrece la misma flexibilidad con menos acoplamiento

---

### 14. En el refactor, ¿por qué `openModal` salió del contexto global hacia `AppUI`?

- A) Porque `useState` no funciona dentro de un Provider
- B) Porque los modales en React siempre deben manejarse con estado local
- C) Porque todos sus consumidores viven en el subárbol de `AppUI`, su ancestro común más cercano; además, cada toggle re-renderizaba a todos los consumidores del contexto
- D) Porque el contexto tiene un límite de propiedades en su `value`

---

## 🟣 Sección 2 — Emparejamiento

### E1. Empareja cada patrón con su descripción

| Patrón | Descripción |
|--------|-------------|
| A. Render Prop | __ Función enviada dentro de la prop children |
| B. Render Function | __ Propiedad donde se pasa la función en render function |
| C. Children | __ Delegar qué renderizar al componente padre |
| D. Composición | __ Función enviada en una propiedad específica del componente |

---

### E2. Empareja cada concepto con su definición

| Concepto | Definición |
|----------|------------|
| A. props.children | __ Clona un elemento y le añade nuevas props |
| B. React.Children | __ Convierte children en array sin importar cantidad |
| C. React.cloneElement | __ Accede a los hijos de un componente contenedor |
| D. ToArray | __ Utilidad para iterar children de forma segura |

---

### E3. Empareja cada concepto de HOCs con su definición

| Concepto | Definición |
|----------|------------|
| A. HOC | __ Propiedades añadidas desde el HOC al componente |
| B. React.Fragment | __ Componente recibido como parámetro del HOC |
| C. Props inyectadas | __ Función que envuelve y retorna otro componente |
| D. Wrapped Component | __ Envuelve múltiples elementos sin nodo extra en DOM |

---

## 🟡 Sección 3 — Ordenamiento

### O1. Ordena los pasos para implementar render props en un componente lista

```
__ Validar error y llamar props.onError()
__ Agregar props error, loading y searchTodos
__ Iterar searchTodos y llamar props.render
__ Definir render props: onError, onLoading, onEmpty
__ Validar loading y llamar props.onLoading()
```

---

### O2. Ordena los pasos del ciclo de vida de un HOC

```
__ Retornar el nuevo componente
__ Definir la función HOC que recibe un componente
__ Crear el componente interno que renderiza al original con props extra
__ Agregar displayName para React DevTools
__ Aplicar el HOC al exportar: const X = withAlgo(Componente)
```

---

## 🔑 Hoja de respuestas

> ⚠️ No hagas scroll hasta aquí antes de responder. ¡Sin trampa!

---

### Opción múltiple

**1. B** — En React la UI es declarativa: describes cómo debe verse para cada estado y React se encarga del DOM. A es el enfoque imperativo (jQuery), C confunde la notación matemática con código, D habla de pureza, no del significado de la expresión.

**2. C** — `[...todos]` copia el array pero cada posición sigue apuntando al mismo objeto en memoria. La solución correcta: `todos.map(t => t.text === text ? { ...t, completed: true } : t)`. A es falso, B inventa un comportamiento de `findIndex`, D es el error conceptual que causa el bug.

**3. B** — La esencia del patrón es la inversión de control: quien usa el componente entrega una receta (función → elementos) y el componente decide cuándo ejecutarla y con qué argumentos. Puede llegar como `children` o como prop con nombre.

**4. B** — Un HOC es una FUNCIÓN (patrón de higher-order functions) que envuelve componentes para agregarles props o comportamiento. A describe herencia (lo que React evita), C confunde con CSS, D mezcla conceptos.

**5. C** — Los hooks componen de forma lineal (3 `const` en 3 líneas, sin anidar). HOCs producen wrapper hell; render props producen pirámides; ambos pueden colisionar props silenciosamente. A es falso, B es inventado, D es lo opuesto: los hooks NO funcionan en clases.

**6. B** — La colocación se decide por el mapa de lectores/escritores: un componente → estado local; varios cercanos → ancestro común; ramas lejanas → context. El tamaño (A), sincronía (C) o persistencia (D) influyen en otras decisiones.

**7. B** — `cloneElement` crea una copia del elemento con props extra mezcladas. No duplica nada en el DOM (A), no existe "clonar estado" (C) y no involucra contexto (D).

**8. C** — En JSX las props repetidas se resuelven como en objetos: la última gana. Es una decisión de diseño: el padre manda sobre la inyección del HOC. Invertir el orden haría que el HOC pisara silenciosamente las props del padre.

**9. C** — `withX(Component)` devuelve una función NUEVA cada vez. React ve un tipo diferente en cada render, descarta el subárbol anterior y lo monta de cero: se pierde estado local, foco y DOM. Los HOCs se aplican una vez, a nivel de módulo.

**10. B** — La mutación directa deja la misma referencia de objeto. React compara por referencia: `React.memo` y optimizaciones no detectan el cambio. El patrón correcto crea nuevas referencias en ambos niveles: array nuevo (map) y objeto nuevo (spread).

**11. C** — Los hooks resuelven LÓGICA (cómo se calcula el estado); el Context resuelve ALCANCE (cómo llega a componentes profundos sin prop drilling). Son problemas distintos con herramientas distintas. A y B son falsedades técnicas.

**12. C** — Para compartir LÓGICA con estado (A), los hooks son el reemplazo moderno. Pero cuando se delega UI — "tú decides cuándo, yo decido qué se pinta" — los render props siguen vigentes (TanStack Table, Downshift, Headless UI). D es demasiado absoluto.

**13. D** — El equipo de React es explícito: no han encontrado casos donde recomienden herencia entre componentes. La composición (children, props) resuelve los mismos problemas con menos acoplamiento. Los HOCs tampoco usan herencia: son funciones, pura composición.

**14. C** — Caso de libro de colocation: sus 3 consumidores (botón, modal, formulario) comparten subárbol. Moverlo a `AppUI` alivió al contexto (cada toggle generaba un `value` nuevo y re-renderizaba a todos los consumidores). A y D son falsedades técnicas; B convierte una decisión contextual en regla absoluta.

---

### Emparejamiento

**E1:**
- A. Render Prop → Función enviada en una propiedad específica del componente
- B. Render Function → Función enviada dentro de la prop children
- C. Children → Propiedad donde se pasa la función en render function
- D. Composición → Delegar qué renderizar al componente padre

**E2:**
- A. props.children → Accede a los hijos de un componente contenedor
- B. React.Children → Utilidad para iterar children de forma segura
- C. React.cloneElement → Clona un elemento y le añade nuevas props
- D. ToArray → Convierte children en array sin importar cantidad

**E3:**
- A. HOC → Función que envuelve y retorna otro componente
- B. React.Fragment → Envuelve múltiples elementos sin nodo extra en DOM
- C. Props inyectadas → Propiedades añadidas desde el HOC al componente
- D. Wrapped Component → Componente recibido como parámetro del HOC

---

### Ordenamiento

**O1:** 1→Agregar props · 2→Definir render props · 3→Validar error · 4→Validar loading · 5→Iterar searchTodos

**O2:** 1→Definir la función HOC · 2→Crear el componente interno · 3→Agregar displayName · 4→Retornar el nuevo componente · 5→Aplicar el HOC al exportar

---

## 🎯 Tabla de puntuación

| Aciertos | Resultado |
|----------|-----------|
| 14 / 14 + todos los extras | 🏆 Maestro de los patrones |
| 11–13 correctas | 🥇 Listo para el certificado |
| 8–10 correctas | 🥈 Repasa las notas y vuelve a intentarlo |
| < 8 correctas | 📖 Revisa los módulos correspondientes |

> 💡 En el examen real de Platzi son 14 preguntas con 5 vidas. Con este simulacro de 19 ítems ya superaste el nivel de dificultad. ¡A por el certificado! 💚
