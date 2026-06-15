import React from 'react';

/**
 * MÓDULO 5 — HOC de utilería: registra en consola el ciclo de
 * vida del componente envuelto. Demuestra que los HOCs pueden
 * agregar COMPORTAMIENTO transversal (logging, métricas, auth)
 * sin tocar el componente original.
 *
 * Y demuestra la COMPOSICIÓN de HOCs:
 *   withLogger(withTodoContext(TodoForm))
 * ...así como su precio: el wrapper hell en DevTools. 👻
 */
function withLogger(Component) {
  const name = Component.displayName || Component.name || 'Component';

  function ComponentWithLogger(props) {
    React.useEffect(() => {
      console.log(`🪵 [${name}] montado`);
      return () => console.log(`🪵 [${name}] desmontado`);
    }, []);

    console.log(`🪵 [${name}] render`);
    return <Component {...props} />;
  }

  ComponentWithLogger.displayName = `withLogger(${name})`;

  return ComponentWithLogger;
}

export { withLogger };
