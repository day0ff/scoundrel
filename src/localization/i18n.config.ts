import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import {en, ru} from "localization/translations";

export const resources = {
    en: {
        translation: en,
    },
    ru: {
        translation: ru,
    },
};

let savedLanguage: string | null = null;
try {
    savedLanguage = localStorage.getItem("language");
} catch {
    // Browser storage may be unavailable.
}

i18n.on("languageChanged", (language) => {
    try {
        localStorage.setItem("language", language);
    } catch {
        // Language switching still works when storage is unavailable.
    }
});

i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage && savedLanguage in resources ? savedLanguage : navigator.language,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
    compatibilityJSON: 'v4',
});

export default i18n;