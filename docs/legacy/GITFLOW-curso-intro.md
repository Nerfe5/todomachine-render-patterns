# 🌿 GitFlow - Curso de Introducción a React.js

Este documento describe la estrategia de Git aplicada durante el desarrollo del curso, con el flujo real utilizado y el historial de ramas creadas.

---

## 📌 Estructura de Ramas

### **Ramas Principales**

#### `main`
- **Propósito:** Rama principal e integradora del curso
- **Uso real:** Todas las ramas de feature se mergearon aquí vía Pull Request
- **Protección:** No se hicieron commits directos — solo merges desde PRs

#### `develop`
- **Propósito:** Rama de desarrollo planificada originalmente
- **Uso real:** Existe en el remoto pero no se usó como intermediaria. El flujo evolucionó a feature → PR → `main` directamente

#### `gh-pages`
- **Propósito:** Rama de deploy, gestionada automáticamente por el paquete `gh-pages`
- **Uso:** No se toca manualmente — `npm run deploy` la actualiza sola

---

## 🔄 Flujo de Trabajo Real

El flujo aplicado en cada sección del curso fue:

```
main
 └── feature/XX-nombre     ← se crea desde main
       ↓  (commits de trabajo)
       ↓  git push origin feature/XX-nombre
       ↓  Pull Request en GitHub (creado desde VSCode con la extensión GitHub Pull Requests)
       ↓  merge a main
```

### Paso a paso

**1. Crear la rama desde `main`**
```bash
git checkout main
git checkout -b feature/09-react-portals
```

**2. Trabajar con commits descriptivos**
```bash
git add src/Modal/ public/index.html
git commit -m "feat: implementar React Portals para modal con toggle desde CreateTodoButton"
```

**3. Subir la rama al remoto**
```bash
git push -u origin feature/09-react-portals
```

**4. Crear el Pull Request**
El PR se creó desde la extensión **GitHub Pull Requests** de VSCode directamente hacia `main`. No se usó `develop` como rama intermedia.

**5. Mantener la rama**
Las ramas de feature **no se eliminaron** — quedan como referencia del historial de aprendizaje.

---

## 🎯 Ramas Creadas en el Curso

### Fase 1 — Fundamentos
| Rama | Contenido | Estado |
|---|---|---|
| `feature/01-introduction-jsx` | Introducción a JSX y primer componente | ✅ Mergeada |

### Fase 2 — TODO Machine
| Rama | Contenido | Estado |
|---|---|---|
| `feature/03-maquetacion-inicial` | Estructura de componentes y CSS base | ✅ Mergeada |
| `feature/04-estados-eventos` | useState, eventos, completar/eliminar TODOs | ✅ Mergeada |

### Fase 3 — Funcionalidades Avanzadas
| Rama | Contenido | Estado |
|---|---|---|
| `feature/07-loading-states` | useEffect, loading/error, skeleton loaders | ✅ Mergeada |
| `feature/08-context-api` | Context API, TodoProvider, useContext | ✅ Mergeada |

### Fase 4 — Organización y Deploy
| Rama | Contenido | Estado |
|---|---|---|
| `feature/09-react-portals` | React Portals, Modal, estado openModal | ✅ Mergeada |
| `feature/10-forms` | TodoForm controlado, addTodo, fix z-index | ✅ Mergeada |
| `feature/11-deploy` | GitHub Pages, gh-pages, fix EmptyTodos/TodosNotFound | ✅ Mergeada |

---

## 📝 Convenciones de Commits

Se usó **Conventional Commits** en todos los commits del curso:

| Prefijo | Uso | Ejemplo real del curso |
|---|---|---|
| `feat:` | Nueva funcionalidad | `feat: implementar Context API para eliminar prop drilling` |
| `fix:` | Corrección de bug | `fix: diferenciar lista vacia de busqueda sin resultados` |
| `style:` | Cambios de CSS | `style: agregar estilos base para todo-container` |
| `refactor:` | Refactorización | `refactor: reorganizar componentes en carpetas e implementar localStorage` |
| `docs:` | Documentación | `docs: documentar deploy GitHub Pages y fix estados vacios en ROADMAP` |
| `chore:` | Mantenimiento | `chore: actualizar dependencias` |

> Todos los commits incluyen `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>` al ser realizados con asistencia de Claude Code.

---

## 🎓 Comandos Útiles

### Ver el historial completo del curso
```bash
# Historial visual de todas las ramas
git log --oneline --graph --all --decorate

# Ver solo los merges a main
git log --oneline --merges main
```

### Explorar el código de una fase específica
```bash
# Ver cómo estaba el código al terminar los portales
git checkout feature/09-react-portals

# Volver a main
git checkout main
```

### Comparar entre fases
```bash
# Qué cambió entre la fase de Context API y los Portals
git diff feature/08-context-api feature/09-react-portals

# Solo los archivos que cambiaron
git diff --name-only feature/08-context-api feature/09-react-portals
```

---

## 📊 Estructura Final Real

```
main
 ├── feature/01-introduction-jsx        ✅
 ├── feature/03-maquetacion-inicial      ✅
 ├── feature/04-estados-eventos          ✅
 ├── feature/07-loading-states           ✅
 ├── feature/08-context-api              ✅
 ├── feature/09-react-portals            ✅
 ├── feature/10-forms                    ✅
 ├── feature/11-deploy                   ✅
 │
 └── gh-pages  ← generada por npm run deploy
```

> Los números en los nombres de rama no son consecutivos porque algunas fases del ROADMAP se agruparon en una sola rama (ej: localStorage + custom hooks + organización de carpetas → `feature/04-estados-eventos`).

---

## ✅ Checklist por Rama

Antes de hacer el PR de cada rama:

- [x] Código funcionando sin errores en `npm start`
- [x] Commits con mensajes descriptivos en Conventional Commits
- [x] Rama pusheada al remoto con `git push -u origin`
- [x] ROADMAP.md actualizado con la sección correspondiente
- [x] PR creado desde VSCode hacia `main`

---

## 📚 Recursos

- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Extensión GitHub Pull Requests para VSCode](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)

---

**Última actualización:** 4 de Junio, 2026 — Curso completado ✅. Todas las ramas mergeadas a `main`.
