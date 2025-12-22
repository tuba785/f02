import "./Header.css";
import { FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
    <header className="header_root">
      <div className="header_inner">
        <div className="header_logo">
          <FaShoppingCart />
        </div>

        <div className="header_text_block">
          <div className="header_title">Product Store</div>
          <div className="header_subtitle">React State Management Lesson</div>
        </div>
      </div>
    </header>
  );
}
