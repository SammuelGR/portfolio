import { useTranslation } from 'react-i18next';

import type { TranslationSelector } from '@/types/translation';
import { cn } from '@/utils/cn';

type ExperienceCardProps = {
  areas: TranslationSelector[];
  companyName: string;
  companyNameClassName?: string;
  companyType: string;
  description: string;
  period: string;
  role: string;
  technologies: string[];
};

export default function ExperienceCard({
  areas,
  companyName,
  companyNameClassName,
  companyType,
  description,
  period,
  role,
  technologies,
}: ExperienceCardProps) {
  const { t } = useTranslation();

  return (
    <article className="relative overflow-hidden rounded-md border border-foreground/10 bg-background/70 px-4 py-4 shadow-card md:px-10 md:py-7">
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-accent" />

      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-3 bg-linear-to-r from-accent/15 to-transparent" />

      <div className="relative grid md:grid-cols-2 md:gap-x-10">
        <header className="md:col-start-1 md:row-start-1">
          <div className="xl:flex xl:items-baseline xl:gap-6">
            <h3 className={cn('leading-none tracking-normal text-foreground', companyNameClassName)}>{companyName}</h3>

            <p className="secondary-label mt-1 xl:mt-0">{companyType}</p>
          </div>
        </header>

        <p className="mt-4 font-body text-sm leading-5 tracking-action text-accent uppercase md:col-start-1 md:row-start-2 md:mt-5 md:text-base">
          {role}
        </p>

        <p className="secondary-label mt-1 md:col-start-2 md:row-start-1 md:justify-self-end md:whitespace-nowrap md:text-right">
          {period}
        </p>

        <p className="mt-3 font-body text-xs leading-5 text-muted-strong md:col-start-1 md:row-start-3 md:mt-4 md:text-sm md:leading-6">
          {description}
        </p>

        <div className="mt-4 border-t border-foreground/10 pt-4 md:col-start-2 md:row-span-2 md:row-start-2 md:mt-5 md:border-t-0 md:pt-0">
          <h4 className="font-body text-caption tracking-label text-muted uppercase">
            {t(($) => $.experience.mainAreas)}
          </h4>

          <ul className="mt-3 space-y-1.5 font-body text-xs leading-5 text-muted-strong md:text-sm md:leading-6">
            {areas.map((areaKey, index) => (
              <li className="flex gap-2.5" key={index}>
                <span aria-hidden="true" className="mt-2.5 h-px w-3.5 shrink-0 bg-accent md:mt-3" />

                <span>{t(areaKey)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 border-t border-foreground/10 pt-4 md:col-span-2 md:row-start-4 md:mt-6 md:pt-5">
          <h4 className="font-body text-caption tracking-label text-muted uppercase">
            {t(($) => $.experience.technologies)}
          </h4>

          <div className="mt-3 flex flex-wrap gap-2 md:gap-3">
            {technologies.map((technology) => (
              <span
                className="rounded border border-accent/35 px-2 py-1 font-body text-caption text-muted-strong md:px-3 md:py-2"
                key={technology}
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
