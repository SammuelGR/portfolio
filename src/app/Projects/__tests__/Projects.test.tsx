import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import useMediaQuery from '@/hooks/useMediaQuery';

import Projects from '../Projects';

vi.mock('@/hooks/useMediaQuery', () => ({
  default: vi.fn(() => false),
}));

vi.mock('../Desktop/DesktopProjectsList', () => ({
  default: () => <div data-testid="desktop-projects-list" />,
}));

vi.mock('../Mobile/MobileProjectsList', () => ({
  default: () => <div data-testid="mobile-projects-list" />,
}));

describe('Projects', () => {
  it('renders content correctly', () => {
    render(<Projects />);

    expect(screen.getByRole('heading', { level: 2, name: 'projects.title' })).toBeInTheDocument();
  });

  it('renders the desktop projects list from the md breakpoint', () => {
    vi.mocked(useMediaQuery).mockReturnValue(true);

    render(<Projects />);

    expect(screen.getByTestId('desktop-projects-list')).toBeInTheDocument();
    expect(screen.queryByTestId('mobile-projects-list')).not.toBeInTheDocument();
  });

  it('renders the mobile projects list below the md breakpoint', () => {
    vi.mocked(useMediaQuery).mockReturnValue(false);

    render(<Projects />);

    expect(screen.getByTestId('mobile-projects-list')).toBeInTheDocument();
    expect(screen.queryByTestId('desktop-projects-list')).not.toBeInTheDocument();
  });
});
