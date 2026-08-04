import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { Project } from '@/data/projects';
import { translationSelectorMock } from '@/test/translation';

import DesktopProjectCard from '../DesktopProjectCard';

const fakeProject: Project = {
  descriptionKey: translationSelectorMock('fakeProject.description'),
  featureKeys: [
    translationSelectorMock('fakeProject.feature.first'),
    translationSelectorMock('fakeProject.feature.second'),
    translationSelectorMock('fakeProject.feature.third'),
  ],
  githubUrl: 'fake-project-github-url',
  imageAltKey: translationSelectorMock('fakeProject.imageAlt'),
  imageSrc: 'fake-project-image-src',
  isHighlighted: true,
  liveProjectUrl: 'fake-project-live-url',
  summaryKey: translationSelectorMock('fakeProject.summary'),
  technologies: ['Fake Technology 1', 'Fake Technology 2', 'Fake Technology 3'],
  titleKey: translationSelectorMock('fakeProject.title'),
};

describe('DesktopProjectCard', () => {
  it('renders correctly', async () => {
    const user = userEvent.setup();
    const onOpenMock = vi.fn();

    render(<DesktopProjectCard onOpen={onOpenMock} project={fakeProject} />);

    expect(screen.getByRole('heading', { level: 3, name: 'fakeProject.title' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'fakeProject.imageAlt' })).toHaveAttribute('src', 'fake-project-image-src');
    expect(screen.getByText('fakeProject.summary')).toBeInTheDocument();
    expect(screen.getByText('Fake Technology 1')).toBeInTheDocument();
    expect(screen.getByText('Fake Technology 2')).toBeInTheDocument();
    expect(screen.getByText('Fake Technology 3')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'fakeProject.title projects.action.liveProject' })).toHaveAttribute(
      'href',
      'fake-project-live-url',
    );
    expect(screen.getByRole('link', { name: 'fakeProject.title projects.action.github' })).toHaveAttribute(
      'href',
      'fake-project-github-url',
    );

    await user.click(screen.getByRole('button', { name: 'projects.action.openDetails fakeProject.title' }));

    expect(onOpenMock).toHaveBeenCalledTimes(1);
  });

  it('hides the live project link when the project does not have a live URL', () => {
    render(
      <DesktopProjectCard
        onOpen={vi.fn()}
        project={{
          ...fakeProject,
          liveProjectUrl: undefined,
          titleKey: translationSelectorMock('fakeProjectWithoutLiveUrl.title'),
        }}
      />,
    );

    expect(
      screen.queryByRole('link', { name: 'fakeProjectWithoutLiveUrl.title projects.action.liveProject' }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'fakeProjectWithoutLiveUrl.title projects.action.github' }),
    ).toHaveAttribute('href', 'fake-project-github-url');
  });
});
