import * as m from 'motion/react-m';
import { Trans, useTranslation } from 'react-i18next';

import SectionHeading from '@/components/SectionHeading/SectionHeading';
import { sectionItemTransition, sectionItemVariants } from '@/components/sectionAnimation';

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
                <blockquote className="border-l border-accent py-0.5 pl-4 italic text-muted-strong md:pl-5" />
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
      className="bg-background px-5 py-16 md:px-16 md:py-24 lg:px-24 lg:py-28"
      id="about"
    >
      <m.div
        className="mx-auto max-w-7xl"
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
        <SectionHeading id="about-title" title={t(($) => $.about.title)} />

        <div className="mt-8 grid gap-y-12 lg:grid-cols-[minmax(0,0.93fr)_minmax(0,1fr)] lg:gap-x-26 md:mt-10 xl:grid-cols-[minmax(0,1fr)_27.5rem]">
          <m.div
            className="space-y-6 font-body text-xs leading-6 text-muted-strong md:text-sm md:leading-7"
            transition={sectionItemTransition}
            variants={sectionItemVariants}
          >
            {renderContentBlocks(content)}
          </m.div>

          <m.figure
            className="animated-border-card aspect-3/2 overflow-hidden rounded-lg shadow-card lg:aspect-square lg:max-h-[440px] lg:self-center"
            transition={sectionItemTransition}
            variants={sectionItemVariants}
          >
            <img
              alt={t(($) => $.about.imageAlt)}
              className="size-full object-cover object-[80%_center]"
              src={aboutPortrait}
            />
          </m.figure>
        </div>
      </m.div>
    </section>
  );
}
