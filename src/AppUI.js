import React from 'react';
import { TodoContext } from './TodoContext';
import { TodoHeader } from './TodoHeader';
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

/**
 * MÓDULO 3 — State colocation en acción:
 * openModal ya NO viene del contexto. Es estado LOCAL de AppUI,
 * porque solo este subárbol lo usa (botón, modal, formulario).
 * Estado más cerca de su uso = contexto más liviano = menos
 * re-renders globales por abrir/cerrar un modal.
 */
function AppUI() {
  const {
    loading,
    error,
    completedTodos,
    totalTodos,
    searchValue,
    setSearchValue,
    searchedTodos,
    completeTodo,
    deleteTodo,
  } = React.useContext(TodoContext);

  const [openModal, setOpenModal] = React.useState(false);

  return (
    <div className="App">
      <TodoHeader loading={loading}>
        <TodoCounter
          completed={completedTodos}
          total={totalTodos}
        />
        <TodoSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </TodoHeader>

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
          <TodoForm setOpenModal={setOpenModal} />
        </Modal>
      )}

      <CreateTodoButton setOpenModal={setOpenModal} />
    </div>
  );
}

export { AppUI };
