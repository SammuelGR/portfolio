import { SiGithub as GitHubIcon } from '@icons-pack/react-simple-icons';
import { ChevronDown as ChevronDownIcon, ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { useTranslation } from 'react-i18next';

import type { Project } from '@/data/projects';
import { cn } from '@/utils/cn';

type MobileProjectCardProps = {
  isExpanded: boolean;
  onToggle: () => void;
  project: Project;
};

export default function MobileProjectCard({ isExpanded, onToggle, project }: MobileProjectCardProps) {
  const { t } = useTranslation();
  const title = t(project.titleKey);

  return (
    <article
      className={cn(
        'overflow-hidden rounded-md border transition-colors duration-200',
        project.isHighlighted
          ? [
              'animated-border-card animated-border-card-highlight',
              'border-highlight/40 shadow-highlight-card',
              'bg-linear-to-b from-accent/22 via-accent/10 via-65% to-background/90',
            ]
          : 'border-foreground/10 bg-background/70 shadow-card',
        isExpanded && (project.isHighlighted ? 'border-highlight/75' : 'border-accent/70'),
      )}
    >
      <div className="p-2">
        <img
          alt={t(project.imageAltKey)}
          className={cn(
            'aspect-16/7 w-full rounded-sm object-cover object-top',
            project.isHighlighted ? 'opacity-90 saturate-100' : 'opacity-80 saturate-75',
          )}
          loading="lazy"
          src={project.imageSrc}
        />
      </div>

      <div className="px-4 pt-4 pb-3">
        <h3 className="font-body text-xl leading-tight text-foreground">{title}</h3>

        <p className="mt-2 font-body text-xs leading-5 text-muted-strong">{t(project.summaryKey)}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              className="rounded border border-accent/35 px-2 py-1 font-body text-caption text-muted-strong"
              key={technology}
            >
              {technology}
            </span>
          ))}
        </div>

        <div
          className={[
            'mt-4 flex items-center justify-between gap-4 border-t border-foreground/10 pt-4',
            'font-body text-caption tracking-action text-muted-strong uppercase',
          ].join(' ')}
        >
          <a
            aria-label={`${title} ${t(($) => $.projects.action.liveProject)}`}
            className={cn(
              'inline-flex items-center gap-2 text-muted-strong transition-colors duration-200',
              'hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent',
            )}
            href={project.liveProjectUrl}
            rel="noreferrer"
            target="_blank"
          >
            <span>{t(($) => $.projects.action.liveProject)}</span>
            <ExternalLinkIcon aria-hidden="true" className="size-5 text-accent" strokeWidth={1.5} />
          </a>

          <a
            aria-label={`${title} ${t(($) => $.projects.action.github)}`}
            className={cn(
              'inline-flex items-center gap-2 transition-colors duration-200',
              'hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent',
            )}
            href={project.githubUrl}
            rel="noreferrer"
            target="_blank"
          >
            <span>{t(($) => $.projects.action.github)}</span>
            <GitHubIcon aria-hidden="true" className="size-4 text-accent" />
          </a>
        </div>
      </div>

      <button
        aria-expanded={isExpanded}
        className={[
          'flex w-full items-center justify-center gap-3 border-t border-foreground/10 px-4 py-3',
          'font-body text-caption tracking-action text-muted-strong uppercase transition-colors duration-200',
          'hover:text-accent focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-accent',
        ].join(' ')}
        onClick={onToggle}
        type="button"
      >
        <span>{t(isExpanded ? ($) => $.projects.action.hideDetails : ($) => $.projects.action.viewDetails)}</span>
        <ChevronDownIcon
          aria-hidden="true"
          className={cn('size-4 text-accent transition-transform duration-200', isExpanded && 'rotate-180')}
          strokeWidth={1.6}
        />
      </button>

      <AnimatePresence initial={false}>
        {isExpanded ? (
          <m.div
            animate={{ height: 'auto', opacity: 1 }}
            className="overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="border-t border-foreground/10 px-4 pt-4 pb-5">
              <p className="font-body text-xs leading-6 text-muted-strong">{t(project.descriptionKey)}</p>

              <h4 className="mt-4 font-body text-caption tracking-label text-accent uppercase">
                {t(($) => $.projects.mainFeatures)}
              </h4>

              <ul className="mt-3 space-y-1.5 font-body text-xs leading-5 text-muted-strong">
                {project.featureKeys.map((featureKey, index) => (
                  <li className="flex gap-2.5" key={index}>
                    <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-accent" />

                    <span>{t(featureKey)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
