import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import useMediaQuery from '@/hooks/useMediaQuery';

import Header from '../Header';

const navigationItems = [
  {
    href: '#experience',
    label: 'header.navigation.experience',
  },
  {
    href: '#projects',
    label: 'header.navigation.projects',
  },
  {
    href: '#about',
    label: 'header.navigation.about',
  },
  {
    href: '#contact',
    label: 'header.navigation.contact',
  },
] as const;

vi.mock('@/hooks/useMediaQuery');

vi.mock('../LanguageSwitcher', () => ({
  default: () => <div data-testid="language-switcher" />,
}));

function expectNavigationItems(navigation: HTMLElement): void {
  expect(within(navigation).getAllByRole('link')).toHaveLength(navigationItems.length);

  navigationItems.forEach(({ href, label }) => {
    expect(within(navigation).getByRole('link', { name: label })).toHaveAttribute('href', href);
  });
}

describe('Header', () => {
  describe('below the md breakpoint', () => {
    beforeEach(() => {
      vi.mocked(useMediaQuery).mockReturnValue(false);
    });

    it('renders the mobile menu instead of the desktop navigation', () => {
      render(<Header />);

      expect(screen.getByRole('button', { name: 'header.openMenu' })).toBeInTheDocument();
      expect(screen.queryByRole('navigation', { name: 'header.navigationLabel' })).not.toBeInTheDocument();
    });

    it('opens and closes the mobile navigation', async () => {
      const user = userEvent.setup();

      render(<Header />);

      await user.click(screen.getByRole('button', { name: 'header.openMenu' }));

      expect(screen.getByRole('navigation', { name: 'header.navigationLabel' })).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'header.closeMenu' }));

      expect(screen.queryByRole('navigation', { name: 'header.navigationLabel' })).not.toBeInTheDocument();
    });

    it('renders the expected navigation items', async () => {
      const user = userEvent.setup();

      render(<Header />);

      await user.click(screen.getByRole('button', { name: 'header.openMenu' }));

      expectNavigationItems(screen.getByRole('navigation', { name: 'header.navigationLabel' }));
    });
  });

  describe('from the md breakpoint', () => {
    beforeEach(() => {
      vi.mocked(useMediaQuery).mockReturnValue(true);
    });

    it('renders the desktop navigation instead of the mobile menu', () => {
      render(<Header />);

      expect(screen.getByRole('navigation', { name: 'header.navigationLabel' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'header.openMenu' })).not.toBeInTheDocument();
    });

    it('renders the expected navigation items', () => {
      render(<Header />);

      expectNavigationItems(screen.getByRole('navigation', { name: 'header.navigationLabel' }));
    });
  });

  it.each([
    ['below the md breakpoint', false],
    ['from the md breakpoint', true],
  ])('renders the language switcher %s', (_, isMd) => {
    vi.mocked(useMediaQuery).mockReturnValue(isMd);

    render(<Header />);

    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
  });
});
