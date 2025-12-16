import "./Modal.css";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Modal({
  open,
  title,
  description,
  on_close,
  on_confirm,
}) {
  if (!open) return null;

  const overlay_click = (e) => {
    if (e.target.className === "modal") on_close();
  };

  return (
    <div className="modal" onMouseDown={overlay_click}>
      <div className="modal_box">
        <button className="modal_close" onClick={on_close} type="button">
          ×
        </button>

        <div className="modal_top">
          <FaExclamationTriangle className="modal_icon" />
          <div>
            <h3 className="modal_title">{title}</h3>
            <p className="modal_text">{description}</p>
          </div>
        </div>

        <div className="modal_actions">
          <button className="button_ghost" onClick={on_close} type="button">
            Cancel
          </button>

          <button className="button_danger" onClick={on_confirm} type="button">
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}
