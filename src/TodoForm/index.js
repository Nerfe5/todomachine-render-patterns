import React from 'react';
import { withTodoContext } from '../HOCs/withTodoContext';
import { withLogger } from '../HOCs/withLogger';
import './TodoForm.css';

/**
 * MÓDULO 5 — TodoForm por fin es 100% PRESENTACIONAL:
 * addTodo ya no sale de useContext — llega por props, inyectado
 * por el HOC withTodoContext. El Olor #5 queda cerrado del todo.
 *
 * Abajo exportamos las dos versiones:
 * - TodoForm: pura, para tests/Storybook/reutilización.
 * - TodoFormConnected: envuelta (y con logger, para ver la
 *   composición de HOCs en acción — abre la consola y el modal).
 */
function TodoForm({ addTodo, setOpenModal }) {
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

const TodoFormConnected = withLogger(withTodoContext(TodoForm));

export { TodoForm, TodoFormConnected };
