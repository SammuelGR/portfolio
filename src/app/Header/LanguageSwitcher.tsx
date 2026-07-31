import { useTranslation } from 'react-i18next';

import { supportedLanguages, type SupportedLanguage } from '@/i18n';
import { cn } from '@/utils/cn';

import { interactiveTextClassName } from './constants';

const [englishLanguage, portugueseLanguage] = supportedLanguages;

type LanguageSwitcherProps = {
  className?: string;
};

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation();
  const isEnglish = i18n.resolvedLanguage === englishLanguage;
  const isPortuguese = i18n.resolvedLanguage === portugueseLanguage;

  function handleLanguageChange(language: SupportedLanguage): void {
    void i18n.changeLanguage(language);
  }

  return (
    <fieldset className={cn('border-0 m-0 min-w-0 p-0', className)}>
      <legend className="sr-only">{t(($) => $.header.languageSwitcher.label)}</legend>

      <div className="flex font-medium font-ui gap-3 items-center text-xs">
        <button
          aria-pressed={isEnglish}
          className={cn(interactiveTextClassName, isEnglish ? 'text-accent' : 'text-foreground/50')}
          onClick={() => handleLanguageChange(englishLanguage)}
          type="button"
        >
          {t(($) => $.header.languageSwitcher.language.en)}
        </button>

        <span aria-hidden="true" className="text-foreground/40">
          /
        </span>

        <button
          aria-pressed={isPortuguese}
          className={cn(interactiveTextClassName, isPortuguese ? 'text-accent' : 'text-foreground/50')}
          onClick={() => handleLanguageChange(portugueseLanguage)}
          type="button"
        >
          {t(($) => $.header.languageSwitcher.language.pt)}
        </button>
      </div>
    </fieldset>
  );
}
