import './TodoItem.css';

function TodoItem(props) {
  return (
    <li className="TodoItem">
      <span 
        className={`TodoItem-check ${props.completed ? 'TodoItem-check--completed' : ''}`}
        onClick={props.onComplete}
      >
        ✓
      </span>
      <p className={`TodoItem-text ${props.completed ? 'TodoItem-text--completed' : ''}`}>
        {props.text}

      </p>
      <span className="TodoItem-delete" onClick={props.onDelete}>✕</span>
    </li>
  );
}

export { TodoItem };