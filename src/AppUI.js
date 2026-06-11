import React from 'react';
import { TodoContext } from './TodoContext';
import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { TodosLoading } from './TodosLoading';
import { TodosError } from './TodosError';
import { EmptyTodos } from './EmptyTodos';
import { CreateTodoButton } from './CreateTodoButton';
import { Modal } from './Modal';
import { TodoForm } from './TodoForm';
import { TodosNotFound } from './TodosNotFound';

function AppUI() {
  const {
    loading,
    error,
    totalTodos,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
  } = React.useContext(TodoContext);

  return (
    <div className="App">
      <TodoCounter />
      <TodoSearch />
      <TodoList>
        {loading && (
          <>
            <TodosLoading />
            <TodosLoading />
            <TodosLoading />
          </>
        )}
        {error && <TodosError />}
        {(!loading && totalTodos === 0) && <EmptyTodos />}
        {(!loading && totalTodos > 0 && searchedTodos.length === 0) && <TodosNotFound />}
        {searchedTodos.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>

      {openModal && (
        <Modal>
          <TodoForm />
        </Modal>
      )}

      <CreateTodoButton />
    </div>
  );
}

export { AppUI };
