import "./Header.css";
import { BiTask } from "react-icons/bi";

export default function Header() {
  return (
    <div className="header">
      <div className="header_icon">
        <BiTask className="header_icon_svg" />
      </div>

      <div className="header_text">
        <h1 className="header_title">Task Flow</h1>
        <p className="header_subtitle">Manage your daily goals</p>
      </div>
    </div>
  );
}
