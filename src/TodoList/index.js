import './TodoList.css';

/**
 * MÓDULO 4 — RENDER PROPS:
 * TodoList ya no es un <ul> inocente: ahora es DUEÑA de sus
 * estados de render. Recibe los datos que describen la situación
 * (loading, error, totales) y un "menú" de funciones de render
 * que le dicen QUÉ pintar en cada caso — sin saber qué hay dentro.
 *
 * - onError / onLoading / onEmptyTodos / onEmptySearchResults:
 *   render props con nombre, una por estado.
 * - children (o render): función que recibe CADA todo y devuelve
 *   su elemento — "children as a function".
 *
 * TodoList decide CUÁNDO; quien la usa decide QUÉ.
 * Sigue sin conocer TodoItem, TodosError ni a nadie: es 100%
 * reutilizable con cualquier UI.
 */
function TodoList({
  error,
  loading,
  totalTodos,
  searchedTodos,
  onError,
  onLoading,
  onEmptyTodos,
  onEmptySearchResults,
  children,
  render,
}) {
  // Soportamos ambas variantes del patrón: children-función o prop render
  const renderFunc = children || render;

  return (
    <ul className="TodoList">
      {error && onError()}
      {loading && onLoading()}
      {(!loading && !error && totalTodos === 0) && onEmptyTodos()}
      {(!loading && !error && totalTodos > 0 && searchedTodos.length === 0) &&
        onEmptySearchResults()}
      {(!loading && !error) && searchedTodos.map(renderFunc)}
    </ul>
  );
}

export { TodoList };
