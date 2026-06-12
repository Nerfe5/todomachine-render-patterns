# Módulo 3 · Colocación del estado (state colocation)

> **Rama:** `feature/03-colocacion-estado` · **Tipo:** refactor de código

---

## 1. El concepto

**State colocation:** el estado debe vivir **lo más cerca posible de donde se usa**. Ni más arriba (estado global innecesario) ni más abajo (estado duplicado o inaccesible).

La pregunta clave ante cada pieza de estado es siempre la misma:

> **¿Quiénes te leen y quiénes te escriben?**

Y la regla de decisión:

| Respuesta | Dónde debe vivir |
|-----------|------------------|
| Un solo componente | Estado **local** (`useState` ahí mismo) |
| Un padre y 2–3 hijos cercanos | En el **ancestro común más cercano** (*lifting state up*) |
| Componentes lejanos en ramas distintas del árbol | **Context** (u otro estado global) |

El error más común en apps React no es elegir mal la herramienta — es **defaultear todo a global** "por si acaso". Cada pieza de estado global tiene costo: re-renders de todos los consumidores, componentes acoplados, y un provider que crece sin control (nuestro Olor #3).

---

## 2. La auditoría: interrogando al TodoContext

Aplicamos la pregunta clave a cada pieza del contexto:

| Estado | ¿Quién lo usa? | Veredicto |
|--------|---------------|-----------|
| `todos` + lógica (add/complete/delete) | Counter, List, Form... toda la app | ✅ Global legítimo |
| `loading` / `error` | Header (counter, search) y lista | ✅ Global legítimo |
| `searchValue` | Lo escribe TodoSearch, lo consume el filtrado (que vive en el provider) | 🟡 Se queda **por ahora**: está pegado a `searchedTodos`. Se mudan juntos a `useTodos` en el Módulo 6 |
| `openModal` | CreateTodoButton, AppUI y TodoForm — **todos dentro del subárbol de AppUI** | ❌ **Global injustificado** → se muda a AppUI |

La del modal es el caso de libro: parecía global porque lo usaban "3 componentes", pero los tres viven bajo el mismo techo. Su ancestro común más cercano es `AppUI` → ahí pertenece.

---

## 3. El refactor

### Cambio 1 — `openModal` baja del contexto a `AppUI`

```jsx
// TodoContext: ❌ const [openModal, setOpenModal] = React.useState(false);
// AppUI:       ✅ const [openModal, setOpenModal] = React.useState(false);
```

Y fluye por props a quienes lo necesitan:

```jsx
<TodoForm setOpenModal={setOpenModal} />
<CreateTodoButton setOpenModal={setOpenModal} />
```

**Ganancias concretas:**
- `CreateTodoButton` pasó de acoplado a **100% presentacional** (ya no importa el contexto).
- `TodoForm` quedó semi-desacoplado (solo le queda `addTodo`, que es global legítimo — el resto llega en el Módulo 6).
- Abrir/cerrar el modal **ya no re-renderiza a los consumidores del contexto**: antes, cada toggle generaba un `value` nuevo para toda la app.

### Cambio 2 — `TodoHeader` aprende a inyectar props: `React.cloneElement`

El truco prometido 👀. `AppUI` le pasa `loading` al header **una sola vez**:

```jsx
<TodoHeader loading={loading}>
  <TodoCounter completed={...} total={...} />
  <TodoSearch searchValue={...} setSearchValue={...} />
</TodoHeader>
```

Y `TodoHeader` se la **inyecta a todos sus children**, sin saber quiénes son:

```jsx
function TodoHeader({ children, loading }) {
  return (
    <header className="TodoHeader">
      {React.Children.toArray(children).map((child) =>
        React.cloneElement(child, { loading })
      )}
    </header>
  );
}
```

- `React.Children.toArray(children)` — normaliza children a un array plano (funciona con 1, varios o ninguno).
- `React.cloneElement(child, extraProps)` — crea una copia del elemento con props adicionales mezcladas.

**El efecto visible:** durante los 2 segundos de carga, el contador se atenúa (`TodoCounter--loading`) y el buscador se deshabilita (`disabled={loading}`) — sin que `AppUI` haya escrito `loading` en ninguno de los dos.

### ⚠️ cloneElement: úsese con moderación

Este patrón crea un **contrato invisible**: `TodoCounter` recibe una prop que nadie le escribió en el JSX. Quien lea `AppUI` no sabrá de dónde sale `loading` hasta abrir `TodoHeader`. Es un trade-off real:

- ✅ Útil cuando el wrapper coordina a sus hijos (tabs, form fields, headers como el nuestro). Librerías de UI lo usan muchísimo.
- ❌ Abusarlo vuelve el flujo de datos indetectable. Si necesitas inyectar a niveles profundos (no solo hijos directos), la herramienta correcta es Context.
- 📝 De hecho, la documentación moderna de React lo marca como *legacy* y sugiere alternativas (render props — ¡Módulo 4! — o Context). Lo aprendemos porque está en muchísimo código real y porque entender sus límites es entender por qué existen los otros patrones.

---

## 4. ¿Por qué el código queda mejor?

1. **Contexto más liviano:** 2 piezas menos en el `value`. Menos razones para re-renderizar a todos.
2. **El modal es asunto de quien lo renderiza:** AppUI es dueño del estado Y del `<Modal>`. Cohesión.
3. **Otro componente liberado:** `CreateTodoButton` ya es portable a cualquier proyecto.
4. **UX mejorada de regalo:** buscador deshabilitado + contador atenuado durante la carga. Pequeño, pero honesto: el refactor habilitó la mejora (antes `TodoSearch` no recibía `loading` por ningún lado).

**Trade-off honesto:** `AppUI` acumula otra responsabilidad (el modal). Está bien — es el contenedor orquestador y todavía es legible. Si creciera más, el siguiente paso sería extraer un componente intermedio, no devolver el estado al contexto.

---

## 5. Cuándo NO aplicar colocation agresiva

- Si una pieza de estado **está a punto de necesitarse en otra rama** del árbol (lo sabes por el roadmap del producto), subirla de una vez puede ahorrar un refactor doble.
- Si bajar el estado obliga a pasar props por 4+ niveles intermedios que no los usan (*prop drilling* severo), el remedio sale peor que la enfermedad: ahí Context es la herramienta correcta.
- El objetivo no es "mínimo estado global" como dogma — es que **cada pieza viva donde minimiza acoplamiento y re-renders**. A veces eso ES el contexto.

---

## ✅ Checklist del módulo

- [x] Auditoría de cada pieza de estado del contexto (tabla de veredictos)
- [x] `openModal` movido de Context → estado local de `AppUI`
- [x] `CreateTodoButton` convertido a presentacional
- [x] `TodoForm` recibe `setOpenModal` por props (desacople parcial, a propósito)
- [x] `TodoHeader` inyecta `loading` vía `React.cloneElement`
- [x] UX: buscador deshabilitado y contador atenuado durante la carga
- [x] La app se comporta igual (+ mejora de UX en loading)
- [x] Preguntas 7–9 agregadas al examen
