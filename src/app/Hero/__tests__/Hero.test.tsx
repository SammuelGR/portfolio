import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Hero from '../Hero';

vi.mock('../Projects/Projects', () => ({
  default: () => <div data-testid="projects" />,
}));

describe('Hero', () => {
  it('renders hero correctly', () => {
    render(<Hero />);

    expect(screen.getByRole('heading', { level: 1, name: 'hero.headline' })).toBeInTheDocument();
    expect(screen.getByText('hero.role')).toBeInTheDocument();
    expect(screen.getByText('hero.description')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'hero.cta' })).toBeInTheDocument();
    expect(screen.getByTestId('projects')).toBeInTheDocument();
    expect(screen.getByText('hero.scrollIndicator')).toBeInTheDocument();
  });

  it('links the CTA to the projects section', () => {
    render(<Hero />);

    expect(screen.getByRole('link', { name: 'hero.cta' })).toHaveAttribute('href', '#projects');
  });
});
