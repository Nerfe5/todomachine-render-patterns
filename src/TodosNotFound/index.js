import './TodosNotFound.css';

/**
 * Mejorado en el Módulo 4: ahora puede recibir el texto buscado
 * para dar un mensaje más útil (lo recibe desde la render prop
 * onEmptySearchResults en AppUI).
 */
function TodosNotFound({ searchText }) {
  return (
    <li className="TodosNotFound">
      <span>🔍</span>
      <p>
        {searchText
          ? `No encontramos resultados para "${searchText}".`
          : 'No encontramos resultados para tu búsqueda.'}
      </p>
    </li>
  );
}

export { TodosNotFound };
