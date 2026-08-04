import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { Project } from '@/data/projects';
import { translationSelectorMock } from '@/test/translation';

import ProjectDialog from '../ProjectDialog';

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

describe('ProjectDialog', () => {
  it('renders correctly', () => {
    render(<ProjectDialog onClose={vi.fn()} project={fakeProject} />);

    expect(screen.getByRole('button', { name: 'projects.action.closeDetails' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'fakeProject.imageAlt' })).toHaveAttribute('src', 'fake-project-image-src');
    expect(screen.getByRole('heading', { level: 3, name: 'fakeProject.title' })).toBeInTheDocument();
    expect(screen.getByText('fakeProject.summary')).toBeInTheDocument();
    expect(screen.getByText('fakeProject.description')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: 'projects.mainFeatures' })).toBeInTheDocument();
    expect(screen.getByText('fakeProject.feature.first')).toBeInTheDocument();
    expect(screen.getByText('fakeProject.feature.second')).toBeInTheDocument();
    expect(screen.getByText('fakeProject.feature.third')).toBeInTheDocument();
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
  });

  it('hides the live project link when the project does not have a live URL', () => {
    render(
      <ProjectDialog
        onClose={vi.fn()}
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

  it('closes when the close button is clicked', async () => {
    const user = userEvent.setup();
    const onCloseMock = vi.fn();

    render(<ProjectDialog onClose={onCloseMock} project={fakeProject} />);

    await user.click(screen.getByRole('button', { name: 'projects.action.closeDetails' }));

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
