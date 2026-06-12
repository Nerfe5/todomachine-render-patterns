import './CreateTodoButton.css';

/**
 * MÓDULO 3 — De acoplado a PRESENTACIONAL:
 * antes hacía useContext(TodoContext) solo para sacar setOpenModal.
 * Ahora recibe la función por props desde quien ES dueño del
 * estado del modal: AppUI. Componente 100% reutilizable.
 */
function CreateTodoButton({ setOpenModal }) {
  return (
    <button
      className="CreateTodoButton"
      onClick={() => setOpenModal(state => !state)}
    >
      <span>+</span>
    </button>
  );
}

export { CreateTodoButton };
