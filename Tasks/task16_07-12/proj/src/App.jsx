import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header/Header";
import TaskInput from "./components/TaskInput/TaskInput";
import TaskList from "./components/TaskList/TaskList";
import Toast from "./components/Toast/Toast";
import Modal from "./components/Modal/Modal";

const uid = () => `${Date.now()}_${Math.random().toString(16).slice(2)}`;

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input_value, set_input_value] = useState("");

  const [editing_id, set_editing_id] = useState(null);

  const [toast_open, set_toast_open] = useState(false);
  const [toast_message, set_toast_message] = useState("");
  const [toast_variant, set_toast_variant] = useState("info");

  const [modal_open, set_modal_open] = useState(false);
  const [delete_id, set_delete_id] = useState(null);

  const is_editing = editing_id !== null;

  const show_toast = (message, variant) => {
    set_toast_message(message);
    set_toast_variant(variant);
    set_toast_open(true);
  };

  const close_toast = () => set_toast_open(false);

  const clear_input = () => set_input_value("");

  const add_task = () => {
    const text = input_value.trim();
    if (!text) return;

    const new_task = { id: uid(), text };
    setTasks((prev) => [new_task, ...prev]);

    clear_input();
    show_toast("Task added successfully", "success");
  };

  const start_edit = (task) => {
    set_editing_id(task.id);
    set_input_value(task.text);
  };

  const cancel_edit = () => {
    set_editing_id(null);
    clear_input();
  };

  const update_task = () => {
    const text = input_value.trim();
    if (!text || editing_id === null) return;

    setTasks((prev) =>
      prev.map((t) => (t.id === editing_id ? { ...t, text } : t))
    );

    set_editing_id(null);
    clear_input();
    show_toast("Task updated successfully", "info");
  };

  const ask_delete = (task_id) => {
    set_delete_id(task_id);
    set_modal_open(true);
  };

  const close_modal = () => {
    set_modal_open(false);
    set_delete_id(null);
  };

  const confirm_delete = () => {
    if (!delete_id) return;

    const id = delete_id;
    setTasks((prev) => prev.filter((t) => t.id !== id));

    if (editing_id === id) {
      set_editing_id(null);
      clear_input();
    }

    close_modal();
    show_toast("Task deleted successfully", "info");
  };

  const submit = () => {
    if (is_editing) update_task();
    else add_task();
  };

  useEffect(() => {
    if (!toast_open) return;
    const t = setTimeout(() => set_toast_open(false), 2600);
    return () => clearTimeout(t);
  }, [toast_open]);

  return (
    <div className="app">
      <div className="container">
        <Header />

        <TaskInput
          value={input_value}
          on_change={set_input_value}
          is_editing={is_editing}
          on_add={add_task}
          on_update={update_task}
          on_cancel={cancel_edit}
          on_enter={submit}
        />

        <TaskList tasks={tasks} on_edit={start_edit} on_delete={ask_delete} />
      </div>

      <Toast
        open={toast_open}
        message={toast_message}
        variant={toast_variant}
        on_close={close_toast}
      />

      <Modal
        open={modal_open}
        title="Delete Task?"
        description="Are you sure you want to delete this task? This action cannot be undone."
        on_close={close_modal}
        on_confirm={confirm_delete}
      />
    </div>
  );
}
