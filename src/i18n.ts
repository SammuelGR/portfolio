import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enUS from './locales/en-US/translations.json';
import ptBR from './locales/pt-BR/translations.json';

export const supportedLanguages = ['en-US', 'pt-BR'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export const fallbackLanguage: SupportedLanguage = 'en-US';

const languageStorageKey = 'sammuelgr/portfolio.language';

const resources = {
  'en-US': {
    translation: enUS,
  },
  'pt-BR': {
    translation: ptBR,
  },
} as const;

function getBrowserLanguage(): SupportedLanguage {
  if (typeof navigator === 'undefined') {
    return fallbackLanguage;
  }

  return navigator.language.toLowerCase().startsWith('pt') ? 'pt-BR' : fallbackLanguage;
}

function readStoredLanguage(): SupportedLanguage | null {
  try {
    const language = localStorage.getItem(languageStorageKey);

    return supportedLanguages.includes(language as SupportedLanguage) ? (language as SupportedLanguage) : null;
  } catch {
    return null;
  }
}

function writeStoredLanguage(language: SupportedLanguage): void {
  try {
    localStorage.setItem(languageStorageKey, language);
  } catch {
    // Ignore unavailable storage. The in-memory i18next state remains valid.
  }
}

function updateDocumentLanguage(language: SupportedLanguage): void {
  document.documentElement.lang = language;
}

const initialLanguage = readStoredLanguage() ?? getBrowserLanguage();

updateDocumentLanguage(initialLanguage);

void i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: fallbackLanguage,
  supportedLngs: supportedLanguages,
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (language) => {
  if (!supportedLanguages.includes(language as SupportedLanguage)) {
    return;
  }

  const supportedLanguage = language as SupportedLanguage;

  writeStoredLanguage(supportedLanguage);
  updateDocumentLanguage(supportedLanguage);
});

export default i18n;
