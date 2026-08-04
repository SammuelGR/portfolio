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

Object.defineProperty(window, 'matchMedia', {
  value: vi.fn((query: string) => ({
    addEventListener: vi.fn(),
    addListener: vi.fn(),
    dispatchEvent: vi.fn(),
    matches: false,
    media: query,
    onchange: null,
    removeEventListener: vi.fn(),
    removeListener: vi.fn(),
  })),
  writable: true,
});

if (!HTMLDialogElement.prototype.showModal) {
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
    configurable: true,
    value: function showModal(this: HTMLDialogElement) {
      this.open = true;
    },
    writable: true,
  });
}

if (!HTMLDialogElement.prototype.close) {
  Object.defineProperty(HTMLDialogElement.prototype, 'close', {
    configurable: true,
    value: function close(this: HTMLDialogElement) {
      this.open = false;
    },
    writable: true,
  });
}

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
