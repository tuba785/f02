import { Link } from "react-router-dom";
import { useSettingsContext } from "../context/SettingContext";

const Navbar = () => {
  const { theme, toggleTheme, lang, changeLanguage, words } =
    useSettingsContext();

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link className="nav-link" to="/">
          {words.home}
        </Link>
        <Link className="nav-link" to="/about">
          {words.about}
        </Link>
      </div>

      <div className="nav-actions">
        <select
          className="select"
          onChange={(e) => changeLanguage(e.target.value)}
          value={lang}
        >
          <option value="en">EN</option>
          <option value="az">AZ</option>
        </select>

        <button className="btn" onClick={toggleTheme} type="button">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
