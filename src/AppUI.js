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
import { TodoFormConnected } from './TodoForm';
import { TodosNotFound } from './TodosNotFound';

/**
 * MÓDULO 6 — AppUI actualizado para ids reales:
 * onComplete y onDelete ahora pasan todo.id en lugar de todo.text.
 * key={todo.id} — Olor #1 cerrado definitivamente. 🎉
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

      <TodoList
        error={error}
        loading={loading}
        totalTodos={totalTodos}
        searchedTodos={searchedTodos}
        onError={() => <TodosError />}
        onLoading={() => (
          <>
            <TodosLoading />
            <TodosLoading />
            <TodosLoading />
          </>
        )}
        onEmptyTodos={() => <EmptyTodos />}
        onEmptySearchResults={() => (
          <TodosNotFound searchText={searchValue} />
        )}
      >
        {todo => (
          <TodoItem
            key={todo.id}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        )}
      </TodoList>

      {openModal && (
        <Modal>
          <TodoFormConnected setOpenModal={setOpenModal} />
        </Modal>
      )}

      <CreateTodoButton setOpenModal={setOpenModal} />
    </div>
  );
}

export { AppUI };
