import type { TranslationSelector } from '@/types/translation';

import cowfundingThumbnail from '@/assets/projects/cowfunding-thumbnail.webp';
import manaVaultBuilderThumbnail from '@/assets/projects/manavaultbuilder-thumbnail.webp';
import nfEtMatcherThumbnail from '@/assets/projects/nf-et-matcher-thumbnail.webp';

export type Project = {
  descriptionKey: TranslationSelector;
  featureKeys: TranslationSelector[];
  githubUrl: string;
  imageAltKey: TranslationSelector;
  imageSrc: string;
  isHighlighted: boolean;
  liveProjectUrl: string;
  summaryKey: TranslationSelector;
  technologies: string[];
  titleKey: TranslationSelector;
};

export const projects = [
  {
    descriptionKey: ($) => $.projects.nfEtMatcher.description,
    featureKeys: [
      ($) => $.projects.nfEtMatcher.feature.liveMatching,
      ($) => $.projects.nfEtMatcher.feature.collectionSearch,
      ($) => $.projects.nfEtMatcher.feature.walletConnection,
    ],
    githubUrl: 'https://github.com/SammuelGR/nf-et-matcher',
    imageAltKey: ($) => $.projects.nfEtMatcher.imageAlt,
    imageSrc: nfEtMatcherThumbnail,
    isHighlighted: true,
    liveProjectUrl: 'https://nf-et-matcher.vercel.app/',
    summaryKey: ($) => $.projects.nfEtMatcher.summary,
    technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Web3.js'],
    titleKey: ($) => $.projects.nfEtMatcher.title,
  },
  {
    descriptionKey: ($) => $.projects.manaVaultBuilder.description,
    featureKeys: [
      ($) => $.projects.manaVaultBuilder.feature.customVaults,
      ($) => $.projects.manaVaultBuilder.feature.allocationTracking,
      ($) => $.projects.manaVaultBuilder.feature.oracleData,
      ($) => $.projects.manaVaultBuilder.feature.walletInteraction,
    ],
    githubUrl: 'https://github.com/SammuelGR/ManaVaultBuilder',
    imageAltKey: ($) => $.projects.manaVaultBuilder.imageAlt,
    imageSrc: manaVaultBuilderThumbnail,
    isHighlighted: true,
    liveProjectUrl: 'https://manavaultbuilder.vercel.app/',
    summaryKey: ($) => $.projects.manaVaultBuilder.summary,
    technologies: ['React', 'TypeScript', 'Ethers.js', 'Arbitrum', 'Zod'],
    titleKey: ($) => $.projects.manaVaultBuilder.title,
  },
  {
    descriptionKey: ($) => $.projects.cowfunding.description,
    featureKeys: [
      ($) => $.projects.cowfunding.feature.campaigns,
      ($) => $.projects.cowfunding.feature.authentication,
      ($) => $.projects.cowfunding.feature.contributions,
    ],
    githubUrl: 'https://github.com/SammuelGR/cowfunding',
    imageAltKey: ($) => $.projects.cowfunding.imageAlt,
    imageSrc: cowfundingThumbnail,
    isHighlighted: false,
    liveProjectUrl: 'https://cowfunding.vercel.app/',
    summaryKey: ($) => $.projects.cowfunding.summary,
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe'],
    titleKey: ($) => $.projects.cowfunding.title,
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
