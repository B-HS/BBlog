import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import ko from "./ko";
import jp from "./jp";


const resources = {
  ko: {
    translation: {
        ...ko
    },
  },
  jp: {
    translation: {
        ...jp
    },
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "ko",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;