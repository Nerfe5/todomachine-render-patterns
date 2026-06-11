import React from 'react';
import { TodoContext } from '../TodoContext';
import './TodoCounter.css';

function TodoCounter() {
  const { completedTodos, totalTodos } = React.useContext(TodoContext);
  const allCompleted = completedTodos === totalTodos && totalTodos > 0;

  return (
    <h1 className="TodoCounter">
      {allCompleted ? (
        '🎉 ¡Felicidades! Completaste todos tus TODOS 🎊'
      ) : (
        `Has completado ${completedTodos} de ${totalTodos} TODOS`
      )}
    </h1>
  );
}

export { TodoCounter };
