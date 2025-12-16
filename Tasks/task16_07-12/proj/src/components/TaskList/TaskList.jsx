import "./TaskList.css";
import { BsWindowSidebar } from "react-icons/bs";
import TaskItem from "../TaskItem/TaskItem";

export default function TaskList({ tasks, on_edit, on_delete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty">
        <div className="empty_box">
          <BsWindowSidebar className="empty_icon" />
          <h3 className="empty_title">No tasks yet</h3>
          <p className="empty_text">
            Add a task above to get started with your day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="tasklist">
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t}
          on_edit={() => on_edit(t)}
          on_delete={() => on_delete(t.id)}
        />
      ))}
    </div>
  );
}
