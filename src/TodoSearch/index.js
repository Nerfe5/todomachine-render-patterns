import './TodoSearch.css';

/**
 * Presentacional (input controlado). Recibe `loading` inyectada
 * por TodoHeader: mientras cargan los TODOs no tiene sentido
 * permitir buscar, así que el input se deshabilita.
 */
function TodoSearch({ searchValue, setSearchValue, loading }) {
  return (
    <input
      placeholder="Buscar TODO"
      className="TodoSearch"
      value={searchValue}
      onChange={(event) => {
        setSearchValue(event.target.value);
      }}
      disabled={loading}
    />
  );
}

export { TodoSearch };
