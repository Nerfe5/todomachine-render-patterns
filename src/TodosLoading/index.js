import './TodosLoading.css';

function TodosLoading() {
  return (
    <li className="TodosLoading">
      <span className="TodosLoading-check" />
      <p className="TodosLoading-text" />
      <span className="TodosLoading-delete" />
    </li>
  );
}

export { TodosLoading };
