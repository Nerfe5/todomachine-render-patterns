# 🌿 GitFlow · Curso de Patrones de Render y Composición en React

Estrategia de Git para este curso. Mantenemos el flujo que ya funcionó en el Curso de Introducción (documentado en [`docs/legacy/GITFLOW-curso-intro.md`](./docs/legacy/GITFLOW-curso-intro.md)), simplificado: **feature → Pull Request → main**.

---

## 📌 Ramas

### `main`
- Rama principal e integradora. Siempre debe estar en estado funcional (`npm start` sin errores).
- **No se hacen commits directos** — solo merges desde Pull Requests.
- Su primer commit es el Todomachine base, resultado del curso anterior.

### `feature/XX-nombre`
- Una rama por módulo del curso, numerada según el [ROADMAP](./ROADMAP.md):

| Rama | Módulo |
|------|--------|
| `feature/00-setup-curso` | Setup: README, GitFlow, ROADMAP, docs |
| `feature/01-filosofia-react` | Filosofía y auditoría del código |
| `feature/02-composicion` | Composición de componentes |
| `feature/03-colocacion-estado` | State colocation |
| `feature/04-render-props` | Render Props |
| `feature/05-hocs` | Higher-Order Components |
| `feature/06-hooks` | Custom hooks y refactor final |
| `feature/07-examen-final` | Examen final del curso |

### `gh-pages`
- Rama de deploy gestionada por el paquete `gh-pages`. No se toca manualmente: `npm run deploy` la actualiza.

---

## 🔄 Flujo de trabajo por módulo

```
main
 └── feature/XX-nombre        ← se crea desde main actualizado
       ↓  commits de trabajo (Conventional Commits)
       ↓  git push -u origin feature/XX-nombre
       ↓  Pull Request en GitHub
       ↓  revisión + merge a main
       ↓  borrar la rama feature
```

### Paso a paso

```bash
# 1. Partir siempre de main actualizado
git checkout main
git pull origin main

# 2. Crear la rama del módulo
git checkout -b feature/02-composicion

# 3. Trabajar con commits pequeños y descriptivos
git add src/TodoHeader/
git commit -m "feat(composicion): crear TodoHeader con patrón de slots"

# 4. Subir la rama y abrir el PR
git push -u origin feature/02-composicion
# → Abrir Pull Request en GitHub (o con la extensión de VSCode)

# 5. Tras el merge, limpiar
git checkout main
git pull origin main
git branch -d feature/02-composicion
```

---

## ✍️ Convención de commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/):

| Prefijo | Uso | Ejemplo |
|---------|-----|---------|
| `feat:` | Nueva funcionalidad o patrón aplicado | `feat(render-props): TodoList decide sus estados de UI` |
| `refactor:` | Cambio de estructura sin cambiar comportamiento | `refactor(estado): bajar searchValue a TodoSearch` |
| `fix:` | Corrección de bug | `fix(todos): evitar mutación en completeTodo` |
| `docs:` | Documentación | `docs(modulo-3): notas de state colocation` |
| `chore:` | Mantenimiento, configuración | `chore: renombrar proyecto en package.json` |

El *scope* entre paréntesis es opcional pero recomendado: indica el módulo o área afectada.

---

## ✅ Definition of Done de cada módulo

Un módulo se considera terminado cuando:

1. El refactor está aplicado y la app funciona (`npm start` sin errores ni warnings nuevos).
2. Existe la nota del módulo en `docs/notas/XX-tema.md` explicando el *porqué* del cambio.
3. Se agregaron las preguntas del módulo a `docs/EXAMEN.md`.
4. La rama fue mergeada a `main` vía PR y eliminada.
5. El módulo quedó marcado como ✅ en `ROADMAP.md`.
