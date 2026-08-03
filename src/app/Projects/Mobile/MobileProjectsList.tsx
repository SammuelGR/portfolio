import { useState } from 'react';
import * as m from 'motion/react-m';

import { sectionItemTransition, sectionItemVariants } from '@/components/sectionAnimation';
import type { Project } from '@/data/projects';

import MobileProjectCard from './MobileProjectCard';

type MobileProjectsListProps = {
  projects: Project[];
};

export default function MobileProjectsList({ projects }: MobileProjectsListProps) {
  const [expandedProjectUrl, setExpandedProjectUrl] = useState<string>();

  function handleToggle(projectUrl: string): void {
    setExpandedProjectUrl((currentProjectUrl) => (currentProjectUrl === projectUrl ? undefined : projectUrl));
  }

  return (
    <div className="mt-5 grid gap-4 md:mt-6">
      {projects.map((project) => (
        <m.div key={project.liveProjectUrl} transition={sectionItemTransition} variants={sectionItemVariants}>
          <MobileProjectCard
            isExpanded={expandedProjectUrl === project.liveProjectUrl}
            onToggle={() => handleToggle(project.liveProjectUrl)}
            project={project}
          />
        </m.div>
      ))}
    </div>
  );
}
