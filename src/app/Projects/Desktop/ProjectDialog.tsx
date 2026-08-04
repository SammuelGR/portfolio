import { SiGithub as GitHubIcon } from '@icons-pack/react-simple-icons';
import { ExternalLink as ExternalLinkIcon, X as CloseIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import type { Project } from '@/data/projects';

type ProjectDialogProps = {
  onClose: () => void;
  project: Project;
};

export default function ProjectDialog({ onClose, project }: ProjectDialogProps) {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (!dialog.open) {
      dialog.showModal();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const title = t(project.titleKey);

  function handleCancel(event: React.SyntheticEvent<HTMLDialogElement, Event>): void {
    event.preventDefault();
    onClose();
  }

  function handleClose(): void {
    onClose();
  }

  return (
    <dialog
      aria-labelledby="project-dialog-title"
      className="fixed inset-0 m-0 flex h-dvh max-h-none w-screen max-w-none items-center justify-center overflow-y-auto border-0 bg-transparent p-6 text-foreground backdrop:bg-background/80 backdrop:backdrop-blur-sm"
      onCancel={handleCancel}
      onClose={handleClose}
      ref={dialogRef}
    >
      <div className="relative z-10 max-h-[min(90svh,56rem)] w-[min(56rem,calc(100vw-4rem))] overflow-y-auto rounded-md border border-foreground/15 bg-background/95 p-6 shadow-highlight-card">
        <div className="mb-4 flex justify-end">
          <button
            aria-label={t(($) => $.projects.action.closeDetails)}
            className="text-muted-strong transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            onClick={onClose}
            type="button"
          >
            <CloseIcon aria-hidden="true" className="size-6" strokeWidth={1.4} />
          </button>
        </div>

        <img
          alt={t(project.imageAltKey)}
          className="aspect-16/7 w-full rounded-sm object-cover object-top opacity-90 saturate-100"
          src={project.imageSrc}
        />

        <h3 className="mt-6 font-body text-3xl leading-tight text-foreground" id="project-dialog-title">
          {title}
        </h3>

        <p className="mt-4 font-body text-sm leading-7 text-muted-strong">{t(project.summaryKey)}</p>

        <p className="mt-4 font-body text-sm leading-7 text-muted-strong">{t(project.descriptionKey)}</p>

        <h4 className="mt-6 font-body text-caption tracking-label text-accent uppercase">
          {t(($) => $.projects.mainFeatures)}
        </h4>

        <ul className="mt-3 space-y-2 font-body text-sm leading-6 text-muted-strong">
          {project.featureKeys.map((featureKey, index) => (
            <li className="flex gap-3" key={index}>
              <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />

              <span>{t(featureKey)}</span>
            </li>
          ))}
        </ul>

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
            'mt-7 flex items-center justify-between gap-6 border-t border-foreground/10 pt-5',
            'font-body text-caption tracking-action text-muted-strong uppercase',
          ].join(' ')}
        >
          {project.liveProjectUrl ? (
            <a
              aria-label={`${title} ${t(($) => $.projects.action.liveProject)}`}
              className="inline-flex items-center gap-3 transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              href={project.liveProjectUrl}
              rel="noreferrer"
              target="_blank"
            >
              <span>{t(($) => $.projects.action.liveProject)}</span>
              <ExternalLinkIcon aria-hidden="true" className="size-5 text-accent" strokeWidth={1.5} />
            </a>
          ) : (
            <span aria-hidden="true" />
          )}

          <a
            aria-label={`${title} ${t(($) => $.projects.action.github)}`}
            className="inline-flex items-center gap-3 transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
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
        aria-hidden="true"
        className="fixed inset-0 z-0 cursor-default focus-visible:outline-none"
        onClick={onClose}
        tabIndex={-1}
        type="button"
      />
    </dialog>
  );
}
