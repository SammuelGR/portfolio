import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Contact from '../Contact';

describe('Contact', () => {
  it('renders correctly', () => {
    render(<Contact />);

    expect(screen.getByRole('heading', { level: 2, name: 'contact.title' })).toBeInTheDocument();

    expect(screen.getByText('contact.social.linkedin.title')).toBeInTheDocument();
    expect(screen.getByText('contact.social.linkedin.handle')).toBeInTheDocument();
    expect(screen.getByText('contact.social.linkedin.title').closest('a')).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/sammuel-reis',
    );

    expect(screen.getByText('contact.social.github.title')).toBeInTheDocument();
    expect(screen.getByText('contact.social.github.handle')).toBeInTheDocument();
    expect(screen.getByText('contact.social.github.title').closest('a')).toHaveAttribute(
      'href',
      'https://github.com/SammuelGR',
    );

    expect(screen.getByText('contact.social.instagram.title')).toBeInTheDocument();
    expect(screen.getByText('contact.social.instagram.handle')).toBeInTheDocument();
    expect(screen.getByText('contact.social.instagram.title').closest('a')).toHaveAttribute(
      'href',
      'https://www.instagram.com/sammuelgr/',
    );
  });
});
