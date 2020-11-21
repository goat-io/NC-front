import * as en from './languages/en.json'
import * as es from './languages/es.json'

import LanguageDetector from 'i18next-browser-languagedetector'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const langEN = en as any
const langES = es as any

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: langEN.default,
      },
      es: {
        translation: langES.default,
      },
    },
  })

export default i18n
