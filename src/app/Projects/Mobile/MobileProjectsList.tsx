import { useState } from 'react';
import * as m from 'motion/react-m';

import { sectionItemTransition, sectionItemVariants } from '@/components/sectionAnimation';
import type { Project } from '@/data/projects';

import MobileProjectCard from './MobileProjectCard';

type MobileProjectsListProps = {
  projects: Project[];
};

export default function MobileProjectsList({ projects }: MobileProjectsListProps) {
  const [expandedProjectKey, setExpandedProjectKey] = useState<string>();

  function handleToggle(projectKey: string): void {
    setExpandedProjectKey((currentProjectKey) => (currentProjectKey === projectKey ? undefined : projectKey));
  }

  return (
    <m.div
      animate="animate"
      className="mt-5 grid gap-4 md:mt-6"
      initial="initial"
      transition={{
        delayChildren: 0.08,
        staggerChildren: 0.1,
      }}
    >
      {projects.map((project) => (
        <m.div key={project.githubUrl} transition={sectionItemTransition} variants={sectionItemVariants}>
          <MobileProjectCard
            isExpanded={expandedProjectKey === project.githubUrl}
            onToggle={() => handleToggle(project.githubUrl)}
            project={project}
          />
        </m.div>
      ))}
    </m.div>
  );
}
