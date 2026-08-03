import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Projects from '../Projects';

vi.mock('@/data/projects', () => ({
  projects: [
    {
      githubUrl: 'fake-project-github-url',
      imageAltKey: ($: { fakeProject: { imageAlt: string; title: string } }) => $.fakeProject.imageAlt,
      imageSrc: 'fake-project-image-src',
      isHighlighted: true,
      liveProjectUrl: 'fake-project-live-url',
      titleKey: ($: { fakeProject: { imageAlt: string; title: string } }) => $.fakeProject.title,
    },
    {
      githubUrl: 'fake-project-without-live-url-github-url',
      imageAltKey: ($: { fakeProjectWithoutLiveUrl: { imageAlt: string; title: string } }) =>
        $.fakeProjectWithoutLiveUrl.imageAlt,
      imageSrc: 'fake-project-without-live-url-image-src',
      isHighlighted: true,
      titleKey: ($: { fakeProjectWithoutLiveUrl: { imageAlt: string; title: string } }) =>
        $.fakeProjectWithoutLiveUrl.title,
    },
    {
      githubUrl: 'non-highlighted-project-github-url',
      imageAltKey: ($: { nonHighlightedProject: { imageAlt: string; title: string } }) =>
        $.nonHighlightedProject.imageAlt,
      imageSrc: 'non-highlighted-project-image-src',
      isHighlighted: false,
      liveProjectUrl: 'non-highlighted-project-live-url',
      titleKey: ($: { nonHighlightedProject: { imageAlt: string; title: string } }) => $.nonHighlightedProject.title,
    },
  ],
}));

describe('Projects', () => {
  it('renders project cards correctly', () => {
    render(<Projects />);

    expect(screen.getByRole('heading', { name: 'fakeProject.title' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'fakeProject.imageAlt' })).toHaveAttribute('src', 'fake-project-image-src');
    expect(screen.getByRole('link', { name: 'fakeProject.title hero.projects.liveProject' })).toHaveAttribute(
      'href',
      'fake-project-live-url',
    );
    expect(screen.getByRole('link', { name: 'fakeProject.title hero.projects.github' })).toHaveAttribute(
      'href',
      'fake-project-github-url',
    );
  });

  it('hides the live project link when the project does not have a live URL', () => {
    render(<Projects />);

    expect(screen.getByRole('heading', { name: 'fakeProjectWithoutLiveUrl.title' })).toBeInTheDocument();
    expect(
      screen.queryByRole('link', {
        name: 'fakeProjectWithoutLiveUrl.title hero.projects.liveProject',
      }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'fakeProjectWithoutLiveUrl.title hero.projects.github' })).toHaveAttribute(
      'href',
      'fake-project-without-live-url-github-url',
    );
  });

  it('does not render non-highlighted projects', () => {
    render(<Projects />);

    expect(screen.queryByRole('heading', { name: 'nonHighlightedProject.title' })).not.toBeInTheDocument();
    expect(screen.queryByRole('img', { name: 'nonHighlightedProject.imageAlt' })).not.toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'nonHighlightedProject.title hero.projects.liveProject' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'nonHighlightedProject.title hero.projects.github' }),
    ).not.toBeInTheDocument();
  });
});
