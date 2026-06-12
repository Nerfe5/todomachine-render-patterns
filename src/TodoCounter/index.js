import './TodoCounter.css';

/**
 * Patrón: COMPONENTE PRESENTACIONAL
 *
 * Antes: useContext(TodoContext) → acoplado al provider, imposible
 * de reutilizar o probar de forma aislada.
 * Ahora: recibe `completed` y `total` por props. Es una función pura
 * de sus props: mismas props, misma UI. Funciona en cualquier app.
 */
function TodoCounter({ completed, total }) {
  const allCompleted = completed === total && total > 0;

  return (
    <h1 className="TodoCounter">
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
