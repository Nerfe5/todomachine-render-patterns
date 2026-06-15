import React from 'react';
import { useLocalStorage } from '../useLocalStorage';

/**
 * MÓDULO 6 — CUSTOM HOOK: useTodos
 *
 * Extrae TODA la lógica de negocio del TodoProvider a un hook
 * reutilizable y testeable de forma aislada.
 *
 * Resuelve de paso los dos Olores Rojos 🔴 de la auditoría:
 *
 * Olor #1 — ids reales: cada todo nace con un id único (Date.now())
 *   en lugar de usar todo.text como identidad. Keys estables,
 *   findById en lugar de findByText, toggle en lugar de solo completar.
 *
 * Olor #2 — sin mutación: completeTodo usa .map() + spread del objeto
 *   para crear nuevas referencias en cada nivel. Inmutabilidad real.
 *
 * La interfaz que expone es idéntica a lo que el Provider ponía en
 * el value: el contexto y AppUI no necesitan cambiar su contrato.
 */
function useTodos() {
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

  // ✅ Olor #1 resuelto: id único basado en timestamp
  const addTodo = (text) => {
    const newTodos = [
      ...todos,
      {
        id: Date.now(),
        text,
        completed: false,
      },
    ];
    saveTodos(newTodos);
  };

  // ✅ Olor #1 + #2 resueltos: busca por id, muta NADA
  // Bonus: ahora es un TOGGLE (completa Y des-completa)
  const completeTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    );
    saveTodos(newTodos);
  };

  // ✅ Olor #1 resuelto: busca por id
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    saveTodos(newTodos);
  };

  return {
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
  };
}

export { useTodos };
