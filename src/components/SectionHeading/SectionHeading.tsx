import * as m from 'motion/react-m';

import { sectionItemTransition, sectionItemVariants } from '../sectionAnimation';

type SectionHeadingProps = {
  id: string;
  title: string;
};

export default function SectionHeading({ id, title }: SectionHeadingProps) {
  return (
    <>
      <m.h2
        className="font-display text-5xl leading-display font-normal text-title uppercase md:text-8xl"
        id={id}
        transition={{ ...sectionItemTransition, duration: 0.84 }}
        variants={sectionItemVariants}
      >
        {title}
      </m.h2>

      <m.div
        aria-hidden="true"
        className="mt-3 h-px w-10 origin-left bg-accent md:w-12"
        transition={sectionItemTransition}
        variants={{
          animate: {
            opacity: 1,
            scaleX: 1,
          },
          initial: {
            opacity: 0,
            scaleX: 0,
          },
        }}
      />
    </>
  );
}
