import "./Toast.css";
import { FaCheckCircle } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";

export default function Toast({ open, message, variant, on_close }) {
  if (!open) return null;

  const Icon = variant === "success" ? FaCheckCircle : CiCircleInfo;

  return (
    <div className="toast">
      <div className="toast_box">
        <Icon className="toast_icon" />
        <div className="toast_text">{message}</div>

        <button className="toast_close" onClick={on_close} type="button">
          ×
        </button>
      </div>
    </div>
  );
}
