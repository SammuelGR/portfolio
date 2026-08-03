import * as m from 'motion/react-m';
import { useTranslation } from 'react-i18next';

import SectionHeading from '@/components/SectionHeading/SectionHeading';
import { getProjectsOrderedByHighlight } from '@/data/projects';

import MobileProjectsList from './Mobile/MobileProjectsList';

export default function Projects() {
  const { t } = useTranslation();
  const orderedProjects = getProjectsOrderedByHighlight();

  return (
    <section
      aria-labelledby="projects-title"
      className="bg-background px-5 py-12 md:px-16 md:py-20 lg:px-24"
      id="projects"
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
        <SectionHeading id="projects-title" title={t(($) => $.projects.title)} />

        <MobileProjectsList projects={orderedProjects} />
      </m.div>
    </section>
  );
}
