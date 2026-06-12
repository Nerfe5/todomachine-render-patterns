import './TodoSearch.css';

/**
 * Patrón: COMPONENTE PRESENTACIONAL (input controlado)
 *
 * Recibe el valor y el setter por props. TodoSearch ya no conoce
 * el TodoContext: es un buscador genérico y reutilizable.
 */
function TodoSearch({ searchValue, setSearchValue }) {
  return (
    <input
      placeholder="Buscar TODO"
      className="TodoSearch"
      value={searchValue}
      onChange={(event) => {
        setSearchValue(event.target.value);
      }}
    />
  );
}

export { TodoSearch };
