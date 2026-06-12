import './TodoHeader.css';

/**
 * Patrón: COMPOSICIÓN VÍA CHILDREN (slots)
 *
 * TodoHeader no sabe (ni le importa) qué componentes van adentro.
 * Solo define la ESTRUCTURA (un <header> semántico) y proyecta
 * lo que el padre decida ponerle. Igual que TodoList y Modal.
 *
 * Beneficio: si mañana el header lleva un logo, un menú o nada,
 * TodoHeader no cambia. Cambia quien lo compone (AppUI).
 */
function TodoHeader({ children }) {
  return (
    <header className="TodoHeader">
      {children}
    </header>
  );
}

export { TodoHeader };
