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
 * MÓDULO 4 — AppUI ya no decide CUÁNDO mostrar cada estado de la
 * lista (eso es asunto de TodoList). Solo declara QUÉ se ve en
 * cada caso, vía render props. Adiós Olor #6.
 *
 * MÓDULO 5 — TodoFormConnected: la versión de TodoForm envuelta
 * por HOCs (withLogger ∘ withTodoContext). AppUI le pasa solo
 * setOpenModal; addTodo se lo inyecta el HOC desde el contexto.
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
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
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
