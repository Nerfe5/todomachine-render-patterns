# Todomachine · Curso de Patrones de Render y Composición en React

Proyecto del **Curso de Patrones de Render y Composición** de Platzi. Partimos del Todomachine construido en el [Curso de Introducción a React.js](https://platzi.com/reactjs) y lo vamos **refactorizando clase a clase**, aplicando los patrones de render que hacen que una aplicación React sea fácil de entender, mantener y escalar.

> 🎯 El objetivo no es agregar features nuevas, sino **pulir y refinar el código subyacente** entendiendo *por qué* cada patrón existe y *cuándo* conviene usarlo.

---

## 🧠 ¿Qué aprenderemos?

| # | Tema | Patrón / Concepto |
|---|------|-------------------|
| 1 | Filosofía de React | Principios de diseño: composición sobre herencia, flujo unidireccional de datos, UI como función del estado |
| 2 | Composición de componentes | `children`, slots, componentes contenedores vs. presentacionales |
| 3 | Colocación del estado | *State colocation*, *lifting state up*, ¿Context o props? |
| 4 | Render Props | Props que son funciones de render para compartir lógica |
| 5 | Higher-Order Components (HOCs) | Funciones que reciben un componente y devuelven uno mejorado |
| 6 | React Hooks | Custom hooks como la evolución moderna de Render Props y HOCs |
| 7 | Examen final | Simulación del examen de Platzi con los temas del curso |

El plan detallado de cada módulo está en [`ROADMAP.md`](./ROADMAP.md).

---

## 🚀 Cómo ejecutar el proyecto

```bash
git clone <url-del-repo>
cd todomachine-render-patterns
npm install
npm start
```

La aplicación corre en [http://localhost:3000](http://localhost:3000).

### Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm start` | Modo desarrollo con hot-reload |
| `npm run build` | Build de producción en `/build` |
| `npm run deploy` | Publica el build en GitHub Pages |

---

## 🗂️ Estructura del proyecto

```
src/
├── App.js               # Composición raíz: Provider + UI
├── AppUI.js             # Capa de presentación principal
├── TodoContext/         # Estado global con Context API
├── useLocalStorage/     # Custom hook de persistencia
├── TodoCounter/         # Contador de TODOs completados
├── TodoSearch/          # Buscador
├── TodoList/            # Lista (composición vía children)
├── TodoItem/            # Ítem individual
├── TodoForm/            # Formulario de creación
├── Modal/               # Modal (React Portals)
├── CreateTodoButton/    # Botón flotante
├── TodosLoading/        # Estado de carga (skeletons)
├── TodosError/          # Estado de error
├── TodosNotFound/       # Búsqueda sin resultados
└── EmptyTodos/          # Lista vacía
```

---

## 🌿 Flujo de trabajo con Git

Cada módulo del curso se desarrolla en una rama `feature/XX-nombre`, se sube al remoto y se integra a `main` mediante Pull Request. El flujo completo está documentado en [`GITFLOW.md`](./GITFLOW.md).

---

## 📚 Documentación del curso

- [`ROADMAP.md`](./ROADMAP.md) — Plan de módulos, ramas y objetivos de aprendizaje
- [`docs/notas/`](./docs/notas) — Apuntes de cada módulo: el *qué*, el *cómo* y el *porqué* de cada refactor
- [`docs/EXAMEN.md`](./docs/EXAMEN.md) — Examen final estilo Platzi (se construye al cierre de cada módulo)
- [`docs/legacy/`](./docs/legacy) — Documentación del curso anterior (Introducción a React.js)
- [docs/TOUR.md](./docs/TOUR.md) — Tour guiado por el código)

#NuncaParesDeAprender 💚
