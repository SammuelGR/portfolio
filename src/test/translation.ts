import type { TranslationSelector } from '@/types/translation';

export function translationSelectorMock(key: string): TranslationSelector {
  return ((resources: unknown) =>
    key.split('.').reduce<unknown>((currentValue, keyPart) => {
      return (currentValue as Record<string, unknown>)[keyPart];
    }, resources)) as TranslationSelector;
}
