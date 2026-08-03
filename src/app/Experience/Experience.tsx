import * as m from 'motion/react-m';
import { useTranslation } from 'react-i18next';

import SectionHeading from '@/components/SectionHeading/SectionHeading';
import { sectionItemTransition, sectionItemVariants } from '@/components/sectionAnimation';
import type { TranslationSelector } from '@/types/translation';

import ExperienceCard from './ExperienceCard';

const ripioAreas: TranslationSelector[] = [
  ($) => $.experience.ripio.area.trading,
  ($) => $.experience.ripio.area.backoffice,
  ($) => $.experience.ripio.area.designSystem,
  ($) => $.experience.ripio.area.testing,
  ($) => $.experience.ripio.area.internationalization,
  ($) => $.experience.ripio.area.performance,
];

const weAccelerateAreas: TranslationSelector[] = [
  ($) => $.experience.weAccelerate.area.backend,
  ($) => $.experience.weAccelerate.area.mobile,
  ($) => $.experience.weAccelerate.area.realtime,
  ($) => $.experience.weAccelerate.area.web,
  ($) => $.experience.weAccelerate.area.integrations,
];

const ripioTechnologies = [
  'React',
  'TypeScript',
  'Styled Components',
  'TanStack Query',
  'Storybook',
  'Jest',
  'React Testing Library',
  'Playwright',
  'TradingView',
  'LaunchDarkly',
];

const weAccelerateTechnologies = [
  'TypeScript',
  'Node.js',
  'Express',
  'MongoDB',
  'Mongoose',
  'Redis',
  'React Native',
  'React',
  'Firebase',
  'Swagger',
];

export default function Experience() {
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby="experience-title"
      className="bg-background px-5 py-12 md:px-16 md:py-20 lg:px-24"
      id="experience"
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
        <SectionHeading id="experience-title" title={t(($) => $.experience.title)} />

        <div className="mt-5 grid gap-4 md:mt-6 md:gap-6">
          <m.div transition={sectionItemTransition} variants={sectionItemVariants}>
            <ExperienceCard
              areas={ripioAreas}
              companyName="ripio"
              companyNameClassName="font-ui text-3xl font-bold md:text-5xl"
              companyType={t(($) => $.experience.ripio.companyType)}
              description={t(($) => $.experience.ripio.description)}
              period={t(($) => $.experience.ripio.period)}
              role={t(($) => $.experience.ripio.role)}
              technologies={ripioTechnologies}
            />
          </m.div>

          <m.div transition={sectionItemTransition} variants={sectionItemVariants}>
            <ExperienceCard
              areas={weAccelerateAreas}
              companyName="we accelerate"
              companyNameClassName="font-body text-2xl md:text-4xl"
              companyType={t(($) => $.experience.weAccelerate.companyType)}
              description={t(($) => $.experience.weAccelerate.description)}
              period={t(($) => $.experience.weAccelerate.period)}
              role={t(($) => $.experience.weAccelerate.role)}
              technologies={weAccelerateTechnologies}
            />
          </m.div>
        </div>
      </m.div>
    </section>
  );
}
