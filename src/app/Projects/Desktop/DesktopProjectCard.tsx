import { SiGithub as GitHubIcon } from '@icons-pack/react-simple-icons';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { Project } from '@/data/projects';
import { cn } from '@/utils/cn';

type DesktopProjectCardProps = {
  onOpen: () => void;
  project: Project;
};

export default function DesktopProjectCard({ onOpen, project }: DesktopProjectCardProps) {
  const { t } = useTranslation();
  const title = t(project.titleKey);

  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-md border transition-colors duration-200',
        project.isHighlighted
          ? [
              'animated-border-card animated-border-card-highlight',
              'border-highlight/40 shadow-highlight-card focus-within:border-highlight/80',
              'focus-within:ring-2 focus-within:ring-highlight/80 focus-within:ring-offset-4 focus-within:ring-offset-background',
              'bg-linear-to-r from-accent/18 via-accent/8 via-55% to-background/80',
            ]
          : [
              'border-foreground/10 bg-background/70 shadow-card focus-within:border-accent/70',
              'focus-within:ring-2 focus-within:ring-accent/80 focus-within:ring-offset-4 focus-within:ring-offset-background',
            ],
      )}
    >
      <button
        aria-label={`${t(($) => $.projects.action.openDetails)} ${title}`}
        className={cn(
          'absolute inset-0 z-0 rounded-md transition-colors duration-200 focus-visible:outline-none',
          project.isHighlighted ? 'hover:bg-highlight/8' : 'hover:bg-foreground/4',
        )}
        onClick={onOpen}
        type="button"
      />

      <div className="pointer-events-none relative z-10 grid grid-cols-[minmax(0,1fr)_minmax(20rem,1fr)] gap-10 p-5">
        <img
          alt={t(project.imageAltKey)}
          className={cn(
            'aspect-16/7 h-full w-full rounded-sm object-cover object-top transition duration-300',
            project.isHighlighted
              ? 'opacity-90 saturate-100 group-hover:opacity-100'
              : 'opacity-75 saturate-75 group-hover:opacity-90 group-hover:saturate-100',
          )}
          loading="lazy"
          src={project.imageSrc}
        />

        <div className="flex min-w-0 flex-col py-6">
          <h3 className="font-body text-3xl leading-tight text-foreground">{title}</h3>

          <p className="mt-4 font-body text-sm leading-6 text-muted-strong">{t(project.summaryKey)}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            {project.technologies.map((technology) => (
              <span
                className="rounded border border-accent/35 px-3 py-2 font-body text-caption text-muted-strong"
                key={technology}
              >
                {technology}
              </span>
            ))}
          </div>

          <div
            className={[
              'pointer-events-auto mt-auto flex items-center justify-between gap-6 pt-8',
              'font-body text-caption tracking-action text-muted-strong uppercase',
            ].join(' ')}
          >
            <a
              aria-label={`${title} ${t(($) => $.projects.action.liveProject)}`}
              className={cn(
                'inline-flex items-center gap-3 text-muted-strong transition-colors duration-200',
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
                'inline-flex items-center gap-3 transition-colors duration-200',
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
      </div>
    </article>
  );
}
