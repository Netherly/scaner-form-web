import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import "../styles/LanguageSwitcher.css";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleToggle = () => {
    const newLang = i18n.language === "ua" ? "en" : "ua";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  return (
    <div className="language-switcher-toggle">
      <label className="switch">
        <input
          type="checkbox"
          checked={i18n.language === "en"}
          onChange={handleToggle}
        />
        <span className="slider">
          {i18n.language === "ua" ? "UA" : "EN"}
        </span>
      </label>
    </div>
  );
}

export default LanguageSwitcher;
