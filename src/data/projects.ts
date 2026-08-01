import type { Resources } from '@/@types/resources';

import manaVaultBuilderThumbnail from '@/assets/projects/manavaultbuilder-thumbnail.webp';
import nfEtMatcherThumbnail from '@/assets/projects/nf-et-matcher-thumbnail.webp';

type ProjectTranslationKey = (resources: Resources['translation']) => string;

export type Project = {
  githubUrl: string;
  imageAltKey: ProjectTranslationKey;
  imageSrc: string;
  isHighlighted: boolean;
  liveProjectUrl: string;
  titleKey: ProjectTranslationKey;
};

export const projects = [
  {
    githubUrl: 'https://github.com/SammuelGR/nf-et-matcher',
    imageAltKey: ($) => $.projects.nfEtMatcher.imageAlt,
    imageSrc: nfEtMatcherThumbnail,
    isHighlighted: true,
    liveProjectUrl: 'https://nf-et-matcher.vercel.app/',
    titleKey: ($) => $.projects.nfEtMatcher.title,
  },
  {
    githubUrl: 'https://github.com/SammuelGR/ManaVaultBuilder',
    imageAltKey: ($) => $.projects.manaVaultBuilder.imageAlt,
    imageSrc: manaVaultBuilderThumbnail,
    isHighlighted: true,
    liveProjectUrl: 'https://manavaultbuilder.vercel.app/',
    titleKey: ($) => $.projects.manaVaultBuilder.title,
  },
] satisfies Project[];
