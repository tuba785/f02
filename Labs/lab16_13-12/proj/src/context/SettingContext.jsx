import { createContext, useState, useContext } from "react";

const translations = {
  az: {
    home: "Ana səhifə",
    about: "Haqqımızda",
    title: "Salam!",
    btnText: "Dili Dəyiş",
  },
  en: {
    home: "Home",
    about: "About Us",
    title: "Hello!",
    btnText: "Change Language",
  },
};

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("en");

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }
  function changeLanguage(langValue) {
    setLang(langValue);
  }

  return (
    <SettingsContext.Provider
      value={{
        toggleTheme,
        changeLanguage,
        theme,
        lang,
        words: translations[lang],
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => useContext(SettingsContext);
