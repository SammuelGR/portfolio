import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { Project } from '@/data/projects';
import { translationSelectorMock } from '@/test/translation';

import DesktopProjectsList from '../DesktopProjectsList';

const fakeProjects: Project[] = [
  {
    descriptionKey: translationSelectorMock('fakeProject1.description'),
    featureKeys: [translationSelectorMock('fakeProject1.feature')],
    githubUrl: 'fake-project-1-github-url',
    imageAltKey: translationSelectorMock('fakeProject1.imageAlt'),
    imageSrc: 'fake-project-1-image-src',
    isHighlighted: true,
    summaryKey: translationSelectorMock('fakeProject1.summary'),
    technologies: ['Fake Project 1 Technology'],
    titleKey: translationSelectorMock('fakeProject1.title'),
  },
  {
    descriptionKey: translationSelectorMock('fakeProject2.description'),
    featureKeys: [translationSelectorMock('fakeProject2.feature')],
    githubUrl: 'fake-project-2-github-url',
    imageAltKey: translationSelectorMock('fakeProject2.imageAlt'),
    imageSrc: 'fake-project-2-image-src',
    isHighlighted: false,
    summaryKey: translationSelectorMock('fakeProject2.summary'),
    technologies: ['Fake Project 2 Technology'],
    titleKey: translationSelectorMock('fakeProject2.title'),
  },
];

vi.mock('../DesktopProjectCard', () => ({
  default: ({ onOpen }: { onOpen: () => void }) => (
    <button data-testid="desktop-project-card" onClick={onOpen} type="button" />
  ),
}));

vi.mock('../ProjectDialog', () => ({
  default: () => <div data-testid="project-dialog" />,
}));

describe('DesktopProjectsList', () => {
  it('renders project cards correctly', () => {
    render(<DesktopProjectsList projects={fakeProjects} />);

    expect(screen.getAllByTestId('desktop-project-card')).toHaveLength(fakeProjects.length);
    expect(screen.queryByTestId('project-dialog')).not.toBeInTheDocument();
  });

  it('opens the project dialog when a project card is selected', async () => {
    const user = userEvent.setup();

    render(<DesktopProjectsList projects={fakeProjects} />);

    await user.click(screen.getAllByTestId('desktop-project-card')[0]);

    expect(screen.getByTestId('project-dialog')).toBeInTheDocument();
  });
});
