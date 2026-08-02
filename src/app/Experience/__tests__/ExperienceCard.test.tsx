import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { TranslationSelector } from '@/types/translation';

import ExperienceCard from '../ExperienceCard';

const areas: TranslationSelector[] = [
  (($) => ($ as unknown as { fakeArea: { first: string } }).fakeArea.first) as TranslationSelector,
  (($) => ($ as unknown as { fakeArea: { second: string } }).fakeArea.second) as TranslationSelector,
  (($) => ($ as unknown as { fakeArea: { third: string } }).fakeArea.third) as TranslationSelector,
];

describe('ExperienceCard', () => {
  it('renders correctly', () => {
    render(
      <ExperienceCard
        areas={areas}
        companyName="Fake Company"
        companyType="Fake company type"
        description="Fake experience description."
        period="Fake period"
        role="Fake Role"
        technologies={['React', 'TypeScript', 'Vitest']}
      />,
    );

    expect(screen.getByRole('heading', { level: 3, name: 'Fake Company' })).toBeInTheDocument();
    expect(screen.getByText('Fake company type')).toBeInTheDocument();
    expect(screen.getByText('Fake Role')).toBeInTheDocument();
    expect(screen.getByText('Fake period')).toBeInTheDocument();
    expect(screen.getByText('Fake experience description.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: 'experience.mainAreas' })).toBeInTheDocument();
    expect(screen.getByText('fakeArea.first')).toBeInTheDocument();
    expect(screen.getByText('fakeArea.second')).toBeInTheDocument();
    expect(screen.getByText('fakeArea.third')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: 'experience.technologies' })).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Vitest')).toBeInTheDocument();
  });
});
