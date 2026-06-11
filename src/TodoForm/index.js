import React from 'react';
import { TodoContext } from '../TodoContext';
import './TodoForm.css';

function TodoForm() {
  const { addTodo, setOpenModal } = React.useContext(TodoContext);
  const [newTodoValue, setNewTodoValue] = React.useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    addTodo(newTodoValue);
    setOpenModal(false);
  };

  const onCancel = () => {
    setOpenModal(false);
  };

  return (
    <form onSubmit={onSubmit} className="TodoForm">
      <h2 className="TodoForm-title">Nuevo TODO</h2>

      <label htmlFor="newTodo" className="TodoForm-label">
        Escribe tu nuevo TODO
      </label>
      <input
        id="newTodo"
        className="TodoForm-input"
        placeholder="Ej: Estudiar React Portals"
        value={newTodoValue}
        onChange={(event) => setNewTodoValue(event.target.value)}
        autoFocus
      />

      <div className="TodoForm-buttons">
        <button
          type="button"
          className="TodoForm-button TodoForm-button--cancel"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="TodoForm-button TodoForm-button--submit"
          disabled={!newTodoValue.trim()}
        >
          Agregar
        </button>
      </div>
    </form>
  );
}

export { TodoForm };
