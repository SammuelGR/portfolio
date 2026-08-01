import { ArrowRight as ArrowRightIcon, ExternalLink as ExternalLinkIcon } from 'lucide-react';
import * as m from 'motion/react-m';
import { useTranslation } from 'react-i18next';

import { projects } from '@/data/projects';

const HERO_PROJECTS_LIMIT = 2;

export default function Projects() {
  const { t } = useTranslation();
  const heroProjects = projects.filter((project) => project.isHighlighted).slice(0, HERO_PROJECTS_LIMIT);

  return (
    <m.div
      animate="animate"
      className="mt-4 grid max-w-xs gap-4 sm:mt-5 sm:max-w-sm md:max-w-2xl md:grid-cols-2"
      inherit={false}
      initial="initial"
      variants={{
        animate: {
          transition: {
            delayChildren: 0.74,
            staggerChildren: 0.08,
          },
        },
        initial: {},
      }}
    >
      {heroProjects.map((project) => (
        <m.article
          className="animated-border-card group overflow-hidden rounded-md border border-foreground/10 bg-background/50 shadow-2xl backdrop-blur-sm transition-colors duration-200 hover:border-accent/30"
          key={project.liveProjectUrl}
          transition={{
            duration: 0.68,
            ease: [0.16, 1, 0.3, 1],
          }}
          variants={{
            animate: {
              filter: 'blur(0px)',
              opacity: 1,
              scale: 1,
              y: 0,
            },
            initial: {
              filter: 'blur(8px)',
              opacity: 0,
              scale: 0.985,
              y: 26,
            },
          }}
        >
          <div className="h-30 bg-black/40 p-2 md:h-36 lg:h-38">
            <img
              alt={t(project.imageAltKey)}
              className="h-full w-full rounded-sm border border-foreground/5 object-cover object-top opacity-75 saturate-75 transition duration-300 group-hover:opacity-90 group-hover:saturate-100"
              loading="eager"
              src={project.imageSrc}
            />
          </div>

          <div className="px-3 pt-3 pb-3 md:px-4">
            <h2 className="font-body text-lg leading-none text-foreground md:text-xl">{t(project.titleKey)}</h2>

            <div className="mt-3 flex items-center justify-between gap-3 border-t border-foreground/5 pt-3 font-body text-caption tracking-widest text-muted-strong uppercase">
              <a
                aria-label={`${t(project.titleKey)} ${t(($) => $.hero.projects.liveProject)}`}
                className="flex items-center gap-2 text-foreground/80 transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                href={project.liveProjectUrl}
                rel="noreferrer"
                target="_blank"
              >
                <span>{t(($) => $.hero.projects.liveProject)}</span>

                <ArrowRightIcon aria-hidden="true" className="size-4 text-accent md:size-5" strokeWidth={1.4} />
              </a>

              <a
                aria-label={`${t(project.titleKey)} ${t(($) => $.hero.projects.github)}`}
                className="flex items-center gap-2 transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                href={project.githubUrl}
                rel="noreferrer"
                target="_blank"
              >
                <span>{t(($) => $.hero.projects.github)}</span>

                <ExternalLinkIcon aria-hidden="true" className="size-4 text-accent" strokeWidth={1.7} />
              </a>
            </div>
          </div>
        </m.article>
      ))}
    </m.div>
  );
}
