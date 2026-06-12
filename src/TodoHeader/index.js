import React from 'react';
import './TodoHeader.css';

/**
 * Patrón: SLOTS + INYECCIÓN DE PROPS (React.cloneElement)
 *
 * TodoHeader sigue sin saber qué componentes recibe, pero ahora
 * les "inyecta" la prop `loading` a todos sus children:
 *
 *   <TodoHeader loading={loading}>
 *     <TodoCounter ... />   ← recibe loading sin que AppUI lo escriba
 *     <TodoSearch ... />    ← recibe loading sin que AppUI lo escriba
 *   </TodoHeader>
 *
 * cloneElement crea una copia del elemento con props extra.
 * React.Children.toArray normaliza children (1, varios, o ninguno).
 *
 * ⚠️ Es un patrón con trade-offs: crea un "contrato invisible"
 * (los children reciben props que nadie escribió). Útil y común
 * en librerías de UI; en apps, usar con moderación.
 */
function TodoHeader({ children, loading }) {
  return (
    <header className="TodoHeader">
      {React.Children.toArray(children).map((child) =>
        React.cloneElement(child, { loading })
      )}
    </header>
  );
}

export { TodoHeader };
