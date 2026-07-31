import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { keyFromSelector } from 'i18next';
import type * as ReactI18next from 'react-i18next';
import { afterEach, vi } from 'vitest';

const { useTranslationMock } = vi.hoisted(() => ({
  useTranslationMock: vi.fn(),
}));

vi.mock('react-i18next', async (importOriginal) => ({
  ...(await importOriginal<typeof ReactI18next>()),
  useTranslation: useTranslationMock,
}));

function resetUseTranslationMock(): void {
  useTranslationMock.mockReset();
  useTranslationMock.mockReturnValue({
    t: keyFromSelector,
  });
}

resetUseTranslationMock();

afterEach(() => {
  cleanup();
  resetUseTranslationMock();
});
