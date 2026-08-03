import { useState } from 'react';
import * as m from 'motion/react-m';

import { sectionItemTransition, sectionItemVariants } from '@/components/sectionAnimation';
import type { Project } from '@/data/projects';

import DesktopProjectCard from './DesktopProjectCard';
import ProjectDialog from './ProjectDialog';

type DesktopProjectsListProps = {
  projects: Project[];
};

export default function DesktopProjectsList({ projects }: DesktopProjectsListProps) {
  const [selectedProject, setSelectedProject] = useState<Project>();

  return (
    <>
      <m.div
        animate="animate"
        className="mt-6 grid gap-3"
        initial="initial"
        transition={{
          delayChildren: 0.08,
          staggerChildren: 0.1,
        }}
      >
        {projects.map((project) => (
          <m.div key={project.liveProjectUrl} transition={sectionItemTransition} variants={sectionItemVariants}>
            <DesktopProjectCard onOpen={() => setSelectedProject(project)} project={project} />
          </m.div>
        ))}
      </m.div>

      {selectedProject ? (
        <ProjectDialog onClose={() => setSelectedProject(undefined)} project={selectedProject} />
      ) : null}
    </>
  );
}
