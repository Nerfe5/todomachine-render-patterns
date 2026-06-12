import React from 'react';
import { useLocalStorage } from '../useLocalStorage';

const TodoContext = React.createContext();

/**
 * MÓDULO 3 — Colocación del estado:
 * openModal/setOpenModal SALIERON de aquí. Era estado global
 * que solo necesitaba el subárbol de AppUI → ahora vive ahí.
 *
 * searchValue SÍ se queda (por ahora): el filtrado (searchedTodos)
 * se calcula aquí y lo necesita. Se mudarán juntos a useTodos
 * en el Módulo 6.
 */
function TodoProvider({ children }) {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage('TODOS_V1', []);

  const [searchValue, setSearchValue] = React.useState('');

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  const searchedTodos = todos.filter((todo) => {
    const todoText = todo.text.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return todoText.includes(searchText);
  });

  const completeTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text === text);
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text === text);
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  const addTodo = (text) => {
    const newTodos = [...todos, { text, completed: false }];
    saveTodos(newTodos);
  };

  return (
    <TodoContext.Provider value={{
      loading,
      error,
      completedTodos,
      totalTodos,
      searchValue,
      setSearchValue,
      searchedTodos,
      completeTodo,
      deleteTodo,
      addTodo,
    }}>
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
