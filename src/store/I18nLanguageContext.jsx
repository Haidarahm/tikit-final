import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import i18n from "../locales/i18n";

const I18nLanguageContext = createContext({
  language: "en",
  isRtl: false,
  setLanguage: () => {},
});

export function I18nLanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem("language") || i18n.language || "en";
    } catch {
      return i18n.language || "en";
    }
  });

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
    // Apply global direction and font class
    const html = document.documentElement;
    if (language === "ar") {
      html.setAttribute("dir", "rtl");
      html.classList.add("font-cairo");
      html.classList.remove("font-hero-light");
    } else {
      html.setAttribute("dir", "ltr");
      html.classList.add("font-hero-light");
      html.classList.remove("font-cairo");
    }
  }, [language]);

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("language", lang);
    } catch {}
    i18n.changeLanguage(lang);
  }, []);

  const isRtl = language === "ar";

  const value = useMemo(
    () => ({ language, isRtl, setLanguage }),
    [language, isRtl, setLanguage]
  );

  return (
    <I18nLanguageContext.Provider value={value}>
      {children}
    </I18nLanguageContext.Provider>
  );
}

export function useI18nLanguage() {
  return useContext(I18nLanguageContext);
}
