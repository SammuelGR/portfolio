import type { TranslationSelector } from '@/types/translation';

import cowfundingThumbnail from '@/assets/projects/cowfunding-thumbnail.webp';
import manaVaultBuilderThumbnail from '@/assets/projects/manavaultbuilder-thumbnail.webp';
import nfEtMatcherThumbnail from '@/assets/projects/nf-et-matcher-thumbnail.webp';
import sigaaReloadThumbnail from '@/assets/projects/sigaa-reload-thumbnail.webp';
import votometriaThumbnail from '@/assets/projects/votometria-thumbnail.webp';

export type Project = {
  descriptionKey: TranslationSelector;
  featureKeys: TranslationSelector[];
  githubUrl: string;
  imageAltKey: TranslationSelector;
  imageSrc: string;
  isHighlighted: boolean;
  liveProjectUrl?: string;
  summaryKey: TranslationSelector;
  technologies: string[];
  titleKey: TranslationSelector;
};

export const projects = [
  {
    descriptionKey: ($) => $.projects.nfEtMatcher.description,
    featureKeys: [
      ($) => $.projects.nfEtMatcher.feature.matching,
      ($) => $.projects.nfEtMatcher.feature.metadata,
      ($) => $.projects.nfEtMatcher.feature.sharing,
    ],
    githubUrl: 'https://github.com/SammuelGR/nf-et-matcher',
    imageAltKey: ($) => $.projects.nfEtMatcher.imageAlt,
    imageSrc: nfEtMatcherThumbnail,
    isHighlighted: true,
    liveProjectUrl: 'https://nf-et-matcher.vercel.app/',
    summaryKey: ($) => $.projects.nfEtMatcher.summary,
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'TanStack Query', 'Wagmi'],
    titleKey: ($) => $.projects.nfEtMatcher.title,
  },
  {
    descriptionKey: ($) => $.projects.manaVaultBuilder.description,
    featureKeys: [
      ($) => $.projects.manaVaultBuilder.feature.cardSearch,
      ($) => $.projects.manaVaultBuilder.feature.deckBuilding,
      ($) => $.projects.manaVaultBuilder.feature.persistence,
    ],
    githubUrl: 'https://github.com/SammuelGR/ManaVaultBuilder',
    imageAltKey: ($) => $.projects.manaVaultBuilder.imageAlt,
    imageSrc: manaVaultBuilderThumbnail,
    isHighlighted: true,
    liveProjectUrl: 'https://manavaultbuilder.vercel.app/',
    summaryKey: ($) => $.projects.manaVaultBuilder.summary,
    technologies: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Scryfall API'],
    titleKey: ($) => $.projects.manaVaultBuilder.title,
  },
  {
    descriptionKey: ($) => $.projects.cowfunding.description,
    featureKeys: [
      ($) => $.projects.cowfunding.feature.campaigns,
      ($) => $.projects.cowfunding.feature.currencies,
      ($) => $.projects.cowfunding.feature.backoffice,
    ],
    githubUrl: 'https://github.com/SammuelGR/cowfunding',
    imageAltKey: ($) => $.projects.cowfunding.imageAlt,
    imageSrc: cowfundingThumbnail,
    isHighlighted: false,
    liveProjectUrl: 'https://cowfunding.vercel.app/',
    summaryKey: ($) => $.projects.cowfunding.summary,
    technologies: ['Next.js', 'React', 'TypeScript', 'Styled Components', 'Tailwind CSS'],
    titleKey: ($) => $.projects.cowfunding.title,
  },
  {
    descriptionKey: ($) => $.projects.sigaaReload.description,
    featureKeys: [
      ($) => $.projects.sigaaReload.feature.autoRefresh,
      ($) => $.projects.sigaaReload.feature.backgroundExecution,
      ($) => $.projects.sigaaReload.feature.noMoreHeadaches,
    ],
    githubUrl: 'https://github.com/SammuelGR/sigaa-reload',
    imageAltKey: ($) => $.projects.sigaaReload.imageAlt,
    imageSrc: sigaaReloadThumbnail,
    isHighlighted: false,
    summaryKey: ($) => $.projects.sigaaReload.summary,
    technologies: ['JavaScript', 'Browser Extension'],
    titleKey: ($) => $.projects.sigaaReload.title,
  },
  {
    descriptionKey: ($) => $.projects.votometria.description,
    featureKeys: [
      ($) => $.projects.votometria.feature.polymarketPipeline,
      ($) => $.projects.votometria.feature.marketBackend,
      ($) => $.projects.votometria.feature.dataVisualization,
    ],
    githubUrl: 'https://github.com/SammuelGR/votometria',
    imageAltKey: ($) => $.projects.votometria.imageAlt,
    imageSrc: votometriaThumbnail,
    isHighlighted: false,
    liveProjectUrl: 'https://votometria.vercel.app',
    summaryKey: ($) => $.projects.votometria.summary,
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'Recharts', 'Polymarket API'],
    titleKey: ($) => $.projects.votometria.title,
  },
] satisfies Project[];

export function getProjectsOrderedByHighlight(): Project[] {
  return [...projects].sort((firstProject, secondProject) => {
    if (firstProject.isHighlighted === secondProject.isHighlighted) {
      return 0;
    }

    return firstProject.isHighlighted ? -1 : 1;
  });
}
