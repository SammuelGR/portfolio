import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { Project } from '@/data/projects';
import { translationSelectorMock } from '@/test/translation';

import MobileProjectsList from '../MobileProjectsList';

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

vi.mock('../MobileProjectCard', () => ({
  default: () => <div data-testid="mobile-project-card" />,
}));

describe('MobileProjectsList', () => {
  it('renders project cards correctly', () => {
    render(<MobileProjectsList projects={fakeProjects} />);

    expect(screen.getAllByTestId('mobile-project-card')).toHaveLength(fakeProjects.length);
  });
});
