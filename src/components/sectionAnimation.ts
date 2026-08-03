export const sectionItemTransition = {
  duration: 0.72,
  ease: [0.16, 1, 0.3, 1] as const,
};

export const sectionItemVariants = {
  animate: {
    filter: 'blur(0px)',
    opacity: 1,
    y: 0,
  },
  initial: {
    filter: 'blur(6px)',
    opacity: 0,
    y: 24,
  },
};
