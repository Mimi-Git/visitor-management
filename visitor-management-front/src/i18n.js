import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import commonTranslationEN from "./locales/en/common.json";
import commonTranslationFR from "./locales/fr/common.json";
import homeTranslationEN from "./locales/en/home.json";
import homeTranslationFR from "./locales/fr/home.json";
import firstVisitTranslationEN from "./locales/en/firstVisit.json";
import firstVisitTranslationFR from "./locales/fr/firstVisit.json";
import employeeSelectionTranslationEN from "./locales/en/employeeSelection.json";
import employeeSelectionTranslationFR from "./locales/fr/employeeSelection.json";
import finalScreenTranslationEN from "./locales/en/finalScreen.json";
import finalScreenTranslationFR from "./locales/fr/finalScreen.json";
import checkOutTranslationEN from "./locales/en/checkOut.json";
import checkOutTranslationFR from "./locales/fr/checkOut.json";
import returnTranslationEN from "./locales/en/return.json";
import returnTranslationFR from "./locales/fr/return.json";

const resources = {
   en: {
      common: commonTranslationEN,
      home: homeTranslationEN,
      firstVisit: firstVisitTranslationEN,
      employeeSelection: employeeSelectionTranslationEN,
      finalScreen: finalScreenTranslationEN,
      checkOut: checkOutTranslationEN,
      return: returnTranslationEN,
   },
   fr: {
      common: commonTranslationFR,
      home: homeTranslationFR,
      firstVisit: firstVisitTranslationFR,
      employeeSelection: employeeSelectionTranslationFR,
      finalScreen: finalScreenTranslationFR,
      checkOut: checkOutTranslationFR,
      return: returnTranslationFR,
   },
};

i18n
   .use(initReactI18next)
   .use(LanguageDetector)
   .init({
      resources,
      defaultNS: "common",
      supportedLngs: ["fr", "en"],
      fallbackLng: "fr",
      detection: {
         order: ["cookie", "htmlTag", "localStorage", "path", "subdomain"],
         caches: ["cookie", "localStorage"],
      },
   });

export default i18n;
