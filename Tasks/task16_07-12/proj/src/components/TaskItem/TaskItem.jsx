import "./TaskItem.css";
import { MdEdit, MdDelete } from "react-icons/md";

export default function TaskItem({ task, on_edit, on_delete }) {
  return (
    <div className="taskitem">
      <div className="taskitem_text">{task.text}</div>

      <div className="taskitem_actions">
        <button className="icon_button" onClick={on_edit} type="button">
          <MdEdit />
        </button>

        <button className="icon_button" onClick={on_delete} type="button">
          <MdDelete />
        </button>
      </div>
    </div>
  );
}
