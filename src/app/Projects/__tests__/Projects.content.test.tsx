import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import Projects from '../Projects';

function getProjectCard(title: string): HTMLElement {
  return screen.getByRole('heading', { level: 3, name: title }).closest('article')!;
}

function expectProjectLink(card: HTMLElement, label: string, href: string): void {
  expect(within(card).getByText(label).closest('a')).toHaveAttribute('href', href);
}

async function expandProjectDetails(card: HTMLElement): Promise<void> {
  await userEvent.click(within(card).getByRole('button', { name: 'projects.action.viewDetails' }));
}

describe('Projects content', () => {
  it('renders current projects details', async () => {
    render(<Projects />);

    const nfEtMatcherCard = getProjectCard('projects.nfEtMatcher.title');

    expect(within(nfEtMatcherCard).getByRole('img', { name: 'projects.nfEtMatcher.imageAlt' })).toBeInTheDocument();
    expect(within(nfEtMatcherCard).getByText('projects.nfEtMatcher.summary')).toBeInTheDocument();
    expect(within(nfEtMatcherCard).getByText('React')).toBeInTheDocument();
    expect(within(nfEtMatcherCard).getByText('TypeScript')).toBeInTheDocument();
    expect(within(nfEtMatcherCard).getByText('Tailwind CSS')).toBeInTheDocument();
    expect(within(nfEtMatcherCard).getByText('TanStack Query')).toBeInTheDocument();
    expect(within(nfEtMatcherCard).getByText('Wagmi')).toBeInTheDocument();
    expectProjectLink(nfEtMatcherCard, 'projects.action.liveProject', 'https://nf-et-matcher.vercel.app/');
    expectProjectLink(nfEtMatcherCard, 'projects.action.github', 'https://github.com/SammuelGR/nf-et-matcher');

    await expandProjectDetails(nfEtMatcherCard);

    expect(within(nfEtMatcherCard).getByText('projects.nfEtMatcher.description')).toBeInTheDocument();
    expect(within(nfEtMatcherCard).getByText('projects.nfEtMatcher.feature.matching')).toBeInTheDocument();
    expect(within(nfEtMatcherCard).getByText('projects.nfEtMatcher.feature.metadata')).toBeInTheDocument();
    expect(within(nfEtMatcherCard).getByText('projects.nfEtMatcher.feature.sharing')).toBeInTheDocument();

    const manaVaultBuilderCard = getProjectCard('projects.manaVaultBuilder.title');

    expect(
      within(manaVaultBuilderCard).getByRole('img', { name: 'projects.manaVaultBuilder.imageAlt' }),
    ).toBeInTheDocument();
    expect(within(manaVaultBuilderCard).getByText('projects.manaVaultBuilder.summary')).toBeInTheDocument();
    expect(within(manaVaultBuilderCard).getByText('React')).toBeInTheDocument();
    expect(within(manaVaultBuilderCard).getByText('TypeScript')).toBeInTheDocument();
    expect(within(manaVaultBuilderCard).getByText('Node.js')).toBeInTheDocument();
    expect(within(manaVaultBuilderCard).getByText('Tailwind CSS')).toBeInTheDocument();
    expect(within(manaVaultBuilderCard).getByText('Scryfall API')).toBeInTheDocument();
    expectProjectLink(manaVaultBuilderCard, 'projects.action.liveProject', 'https://manavaultbuilder.vercel.app/');
    expectProjectLink(manaVaultBuilderCard, 'projects.action.github', 'https://github.com/SammuelGR/ManaVaultBuilder');

    await expandProjectDetails(manaVaultBuilderCard);

    expect(within(manaVaultBuilderCard).getByText('projects.manaVaultBuilder.description')).toBeInTheDocument();
    expect(within(manaVaultBuilderCard).getByText('projects.manaVaultBuilder.feature.cardSearch')).toBeInTheDocument();
    expect(
      within(manaVaultBuilderCard).getByText('projects.manaVaultBuilder.feature.deckBuilding'),
    ).toBeInTheDocument();
    expect(within(manaVaultBuilderCard).getByText('projects.manaVaultBuilder.feature.persistence')).toBeInTheDocument();

    const cowfundingCard = getProjectCard('projects.cowfunding.title');

    expect(within(cowfundingCard).getByRole('img', { name: 'projects.cowfunding.imageAlt' })).toBeInTheDocument();
    expect(within(cowfundingCard).getByText('projects.cowfunding.summary')).toBeInTheDocument();
    expect(within(cowfundingCard).getByText('Next.js')).toBeInTheDocument();
    expect(within(cowfundingCard).getByText('React')).toBeInTheDocument();
    expect(within(cowfundingCard).getByText('TypeScript')).toBeInTheDocument();
    expect(within(cowfundingCard).getByText('Styled Components')).toBeInTheDocument();
    expect(within(cowfundingCard).getByText('Tailwind CSS')).toBeInTheDocument();
    expectProjectLink(cowfundingCard, 'projects.action.liveProject', 'https://cowfunding.vercel.app/');
    expectProjectLink(cowfundingCard, 'projects.action.github', 'https://github.com/SammuelGR/cowfunding');

    await expandProjectDetails(cowfundingCard);

    expect(within(cowfundingCard).getByText('projects.cowfunding.description')).toBeInTheDocument();
    expect(within(cowfundingCard).getByText('projects.cowfunding.feature.campaigns')).toBeInTheDocument();
    expect(within(cowfundingCard).getByText('projects.cowfunding.feature.currencies')).toBeInTheDocument();
    expect(within(cowfundingCard).getByText('projects.cowfunding.feature.backoffice')).toBeInTheDocument();

    const sigaaReloadCard = getProjectCard('projects.sigaaReload.title');

    expect(within(sigaaReloadCard).getByRole('img', { name: 'projects.sigaaReload.imageAlt' })).toBeInTheDocument();
    expect(within(sigaaReloadCard).getByText('projects.sigaaReload.summary')).toBeInTheDocument();
    expect(within(sigaaReloadCard).getByText('JavaScript')).toBeInTheDocument();
    expect(within(sigaaReloadCard).getByText('Browser Extension')).toBeInTheDocument();
    expect(within(sigaaReloadCard).queryByText('projects.action.liveProject')).not.toBeInTheDocument();
    expectProjectLink(sigaaReloadCard, 'projects.action.github', 'https://github.com/SammuelGR/sigaa-reload');

    await expandProjectDetails(sigaaReloadCard);

    expect(within(sigaaReloadCard).getByText('projects.sigaaReload.description')).toBeInTheDocument();
    expect(within(sigaaReloadCard).getByText('projects.sigaaReload.feature.autoRefresh')).toBeInTheDocument();
    expect(within(sigaaReloadCard).getByText('projects.sigaaReload.feature.backgroundExecution')).toBeInTheDocument();
    expect(within(sigaaReloadCard).getByText('projects.sigaaReload.feature.noMoreHeadaches')).toBeInTheDocument();

    const votometriaCard = getProjectCard('projects.votometria.title');

    expect(within(votometriaCard).getByRole('img', { name: 'projects.votometria.imageAlt' })).toBeInTheDocument();
    expect(within(votometriaCard).getByText('projects.votometria.summary')).toBeInTheDocument();
    expect(within(votometriaCard).getByText('Python')).toBeInTheDocument();
    expect(within(votometriaCard).getByText('FastAPI')).toBeInTheDocument();
    expect(within(votometriaCard).getByText('PostgreSQL')).toBeInTheDocument();
    expect(within(votometriaCard).getByText('React')).toBeInTheDocument();
    expect(within(votometriaCard).getByText('Recharts')).toBeInTheDocument();
    expect(within(votometriaCard).getByText('Polymarket API')).toBeInTheDocument();
    expectProjectLink(votometriaCard, 'projects.action.liveProject', 'https://votometria.vercel.app');
    expectProjectLink(votometriaCard, 'projects.action.github', 'https://github.com/SammuelGR/votometria');

    await expandProjectDetails(votometriaCard);

    expect(within(votometriaCard).getByText('projects.votometria.description')).toBeInTheDocument();
    expect(within(votometriaCard).getByText('projects.votometria.feature.polymarketPipeline')).toBeInTheDocument();
    expect(within(votometriaCard).getByText('projects.votometria.feature.marketBackend')).toBeInTheDocument();
    expect(within(votometriaCard).getByText('projects.votometria.feature.dataVisualization')).toBeInTheDocument();
  });
});
