import { useCallback, useState } from "react";
import i18n from "../../i18n";

export const useLanguage = () => {
  const [language, setLanguage] = useState<string>(
    localStorage.getItem("language") || "en"
  );

  const changeLanguage = useCallback((lng: string) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  }, []);

  return {
    language, 
    changeLanguage
  }
};
