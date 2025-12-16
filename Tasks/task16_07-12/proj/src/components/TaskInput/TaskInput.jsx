import "./TaskInput.css";
import { FaPlus, FaCheckCircle } from "react-icons/fa";

export default function TaskInput({
  value,
  on_change,
  is_editing,
  on_add,
  on_update,
  on_cancel,
  on_enter,
}) {
  const disabled = value.trim().length === 0;

  const handle_keydown = (e) => {
    if (e.key === "Enter") on_enter();
    if (e.key === "Escape" && is_editing) on_cancel();
  };

  return (
    <div className="taskinput">
      <div className="taskinput_row">
        <input
          className="taskinput_field"
          placeholder="What needs to be done?"
          value={value}
          onChange={(e) => on_change(e.target.value)}
          onKeyDown={handle_keydown}
        />

        {!is_editing ? (
          <button
            className="button_primary"
            onClick={on_add}
            disabled={disabled}
            type="button"
          >
            <FaPlus />
            Add
          </button>
        ) : (
          <div className="taskinput_actions">
            <button
              className="button_primary"
              onClick={on_update}
              disabled={disabled}
              type="button"
            >
              <FaCheckCircle />
              Update
            </button>

            <button className="button_ghost" onClick={on_cancel} type="button">
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
