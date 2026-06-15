import React from 'react';
import { TodoContext } from '../TodoContext';

/**
 * MÓDULO 5 — HIGHER-ORDER COMPONENT:
 * función que RECIBE un componente y DEVUELVE otro mejorado.
 *
 *   const TodoFormConnected = withTodoContext(TodoForm);
 *
 * El componente envuelto recibe todo el contexto COMO PROPS:
 * sigue siendo presentacional (función pura de sus props),
 * y la conexión al contexto vive en esta capa.
 *
 * Es el mismo truco que hizo famoso react-redux con connect().
 *
 * Detalles del oficio:
 * - {...todoContext} {...props}: las props propias van DESPUÉS,
 *   así GANAN en caso de colisión de nombres (el padre manda).
 * - displayName: sin esto, React DevTools mostraría "Anonymous".
 *   Con esto verás: withTodoContext(TodoForm). 🔍
 */
function withTodoContext(Component) {
  function ComponentWithTodoContext(props) {
    const todoContext = React.useContext(TodoContext);
    return <Component {...todoContext} {...props} />;
  }

  ComponentWithTodoContext.displayName =
    `withTodoContext(${Component.displayName || Component.name || 'Component'})`;

  return ComponentWithTodoContext;
}

export { withTodoContext };
