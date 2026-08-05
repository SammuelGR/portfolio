import * as m from 'motion/react-m';
import { Trans, useTranslation } from 'react-i18next';

import SectionHeading from '@/components/SectionHeading/SectionHeading';
import { sectionItemTransition, sectionItemVariants } from '@/components/sectionAnimation';
import { cn } from '@/utils/cn';

import aboutPortrait from './assets/about-portrait.webp';

function renderContentBlocks(content: string) {
  return content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => {
      const key = `${index}-${block.slice(0, 24)}`;

      if (block.includes('<blockquote>')) {
        return (
          <Trans
            components={{
              blockquote: (
                <blockquote className="border-l border-highlight py-0.5 pl-4 italic text-muted-strong md:pl-5" />
              ),
            }}
            defaults={block}
            key={key}
          />
        );
      }

      return <p key={key}>{block}</p>;
    });
}

export default function About() {
  const { t } = useTranslation();
  const content = t(($) => $.about.content);

  return (
    <section
      aria-labelledby="about-title"
      className={cn(
        'px-5 py-16 md:px-16 md:py-24 lg:px-24 lg:py-28',
        'bg-[linear-gradient(to_bottom,var(--color-background)_0,#000_5rem,#000_calc(100%-5rem),var(--color-background)_100%)]',
      )}
      id="about"
    >
      <m.div
        className="mx-auto max-w-7xl lg:max-w-8xl"
        initial="initial"
        transition={{
          delayChildren: 0.08,
          staggerChildren: 0.1,
        }}
        viewport={{
          amount: 0.18,
          once: true,
        }}
        whileInView="animate"
      >
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-26">
          <div className="lg:col-start-1 lg:row-start-1">
            <SectionHeading id="about-title" title={t(($) => $.about.title)} />
          </div>

          <div className="mt-8 grid gap-y-12 md:mt-10 lg:contents">
            <m.div
              className="space-y-6 font-body text-xs leading-6 text-muted-strong md:text-sm md:leading-7 lg:col-start-1 lg:row-start-2 lg:mt-10"
              transition={sectionItemTransition}
              variants={sectionItemVariants}
            >
              {renderContentBlocks(content)}
            </m.div>

            <m.figure
              className="animated-border-card aspect-3/2 overflow-hidden rounded-lg lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:aspect-2/3 xl:aspect-square"
              transition={sectionItemTransition}
              variants={sectionItemVariants}
            >
              <img
                alt={t(($) => $.about.imageAlt)}
                className="size-full object-cover object-right lg:object-[80%_center] xl:object-right"
                src={aboutPortrait}
              />
            </m.figure>
          </div>
        </div>
      </m.div>
    </section>
  );
}
