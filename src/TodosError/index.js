import './TodosError.css';

function TodosError() {
  return (
    <li className="TodosError">
      <span>❌</span>
      <p>Hubo un error al cargar tus TODOs.</p>
    </li>
  );
}

export { TodosError };
