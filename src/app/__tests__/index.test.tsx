import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import App from '../index';

vi.mock('../Header/Header', () => ({
  default: () => <div data-testid="header" />,
}));

vi.mock('../Hero/Hero', () => ({
  default: () => <div data-testid="hero" />,
}));

vi.mock('../Experience/Experience', () => ({
  default: () => <div data-testid="experience" />,
}));

vi.mock('../Projects/Projects', () => ({
  default: () => <div data-testid="projects" />,
}));

vi.mock('../About/About', () => ({
  default: () => <div data-testid="about" />,
}));

vi.mock('../Contact/Contact', () => ({
  default: () => <div data-testid="contact" />,
}));

describe('App', () => {
  it('renders the app sections', () => {
    render(<App />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('experience')).toBeInTheDocument();
    expect(screen.getByTestId('projects')).toBeInTheDocument();
    expect(screen.getByTestId('about')).toBeInTheDocument();
    expect(screen.getByTestId('contact')).toBeInTheDocument();
  });
});
