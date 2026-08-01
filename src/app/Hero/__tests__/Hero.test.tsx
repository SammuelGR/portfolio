import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Hero from '../Hero';

describe('Hero', () => {
  it('renders the main hero copy and CTA', () => {
    render(<Hero />);

    expect(screen.getByRole('heading', { level: 1, name: 'hero.headline' })).toBeInTheDocument();
    expect(screen.getByText('hero.role')).toBeInTheDocument();
    expect(screen.getByText('hero.description')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'hero.cta' })).toHaveAttribute('href', '#projects');
    expect(screen.getByText('hero.scrollIndicator')).toBeInTheDocument();
  });
});
