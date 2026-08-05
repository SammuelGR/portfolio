import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import About from '../About';

describe('About', () => {
  it('renders correctly', () => {
    render(<About />);

    expect(screen.getByRole('heading', { level: 2, name: 'about.title' })).toBeInTheDocument();
    expect(screen.getByText('about.content')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'about.imageAlt' })).toBeInTheDocument();
  });
});
