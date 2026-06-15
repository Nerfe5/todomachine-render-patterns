import React from 'react';
import { useTodos } from '../useTodos';

const TodoContext = React.createContext();

/**
 * MÓDULO 6 — TodoProvider a dieta 🥗
 *
 * Antes: mezcla de persistencia + lógica de negocio + derivados
 *        + estado de búsqueda. Olor #3 (provider sobrecargado).
 * Ahora: delegó TODO a useTodos. Su único trabajo es
 *        exponer la interfaz del hook vía Context API.
 *
 * ¿Por qué mantener el Provider si useTodos hace todo?
 * Porque Context resuelve la distribución del estado en el árbol:
 * evita prop drilling hacia componentes profundos (TodoForm,
 * TodoItem, etc.). El hook resuelve la LÓGICA; el Provider
 * resuelve el ALCANCE. Son responsabilidades distintas. ✅
 */
function TodoProvider({ children }) {
  const {
    loading,
    error,
    completedTodos,
    totalTodos,
    searchValue,
    setSearchValue,
    searchedTodos,
    addTodo,
    completeTodo,
    deleteTodo,
  } = useTodos();

  return (
    <TodoContext.Provider value={{
      loading,
      error,
      completedTodos,
      totalTodos,
      searchValue,
      setSearchValue,
      searchedTodos,
      addTodo,
      completeTodo,
      deleteTodo,
    }}>
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
