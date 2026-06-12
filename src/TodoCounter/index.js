import './TodoCounter.css';

/**
 * Presentacional. Ahora también recibe `loading` (inyectada por
 * TodoHeader vía cloneElement) para atenuar el texto mientras
 * no hay datos reales que contar.
 */
function TodoCounter({ completed, total, loading }) {
  const allCompleted = completed === total && total > 0;

  return (
    <h1 className={`TodoCounter ${loading ? 'TodoCounter--loading' : ''}`}>
      {allCompleted ? (
        '🎉 ¡Felicidades! Completaste todos tus TODOS 🎊'
      ) : (
        <>
          Has completado <span>{completed}</span> de <span>{total}</span> TODOS
        </>
      )}
    </h1>
  );
}

export { TodoCounter };
