import "./Modal.css";

export default function Modal({ title, text, button_text, on_close }) {
  return (
    <div className="modal_overlay" role="dialog" aria-modal="true">
      <div className="modal_card">
        <div className="modal_title">{title}</div>
        <div className="modal_text">{text}</div>

        <button className="modal_btn" type="button" onClick={on_close}>
          {button_text}
        </button>
      </div>
    </div>
  );
}
