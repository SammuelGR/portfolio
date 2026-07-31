import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTranslation } from 'react-i18next';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import LanguageSwitcher from '../LanguageSwitcher';

const changeLanguageMock = vi.fn();

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    const defaultUseTranslationMock = vi.mocked(useTranslation).getMockImplementation()!;

    vi.mocked(useTranslation).mockReturnValue({
      ...defaultUseTranslationMock(),
      i18n: {
        changeLanguage: changeLanguageMock,
        resolvedLanguage: 'en-US',
      },
    } as unknown as ReturnType<typeof useTranslation>);

    changeLanguageMock.mockReset();
  });

  it('renders the supported languages', () => {
    render(<LanguageSwitcher />);

    expect(screen.getByRole('button', { name: 'header.languageSwitcher.language.en' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'header.languageSwitcher.language.pt' })).toBeInTheDocument();
  });

  it('changes the language to the selected option', async () => {
    const user = userEvent.setup();

    render(<LanguageSwitcher />);

    await user.click(screen.getByRole('button', { name: 'header.languageSwitcher.language.en' }));
    await user.click(screen.getByRole('button', { name: 'header.languageSwitcher.language.pt' }));

    expect(changeLanguageMock).toHaveBeenCalledTimes(2);
    expect(changeLanguageMock).toHaveBeenNthCalledWith(1, 'en-US');
    expect(changeLanguageMock).toHaveBeenNthCalledWith(2, 'pt-BR');
  });
});
