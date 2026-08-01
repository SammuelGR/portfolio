import { ArrowDown as ArrowDownIcon, ArrowRight as ArrowRightIcon } from 'lucide-react';
import * as m from 'motion/react-m';
import { useTranslation } from 'react-i18next';

import heroBackgroundFallback from './assets/hero-background.jpg';
import heroBackground from './assets/hero-background.webp';
import Projects from './Projects/Projects';

const mobileBackgroundImageSizeClassName = 'bg-size-[auto_--spacing(116)]';

const mobileBackgroundFadeClassName =
  'absolute inset-x-0 top-88 h-32 bg-linear-to-b from-background/20 via-background/85 to-background md:hidden';

const heroTextItemTransition = {
  duration: 0.72,
  ease: [0.16, 1, 0.3, 1] as const,
};

const heroTextItemVariants = {
  animate: {
    x: 0,
  },
  initial: {
    x: '-200%',
  },
};

const heroTitleVariants = {
  animate: {
    filter: 'blur(0px)',
    opacity: 1,
    y: 0,
  },
  initial: {
    filter: 'blur(6px)',
    opacity: 0,
    y: 10,
  },
};

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      className={`relative min-h-svh overflow-hidden bg-background bg-no-repeat bg-top md:bg-cover md:bg-center ${mobileBackgroundImageSizeClassName}`}
      style={{
        backgroundImage: `image-set(url("${heroBackground}") type("image/webp"), url("${heroBackgroundFallback}") type("image/jpeg"))`,
      }}
    >
      <div className="absolute inset-0 bg-black/15 md:bg-black/20" />
      <div className="absolute inset-0 bg-linear-to-r from-background from-0% via-background/65 via-45% to-background/10 md:via-background/65 md:via-40%" />
      <div className={mobileBackgroundFadeClassName} />
      <div className="absolute inset-x-0 bottom-0 h-60 bg-linear-to-t from-background via-background/80 to-transparent" />

      <div className="relative min-h-svh px-8 pt-24 pb-28 sm:px-9 sm:pt-28 md:px-22 md:pt-28 md:pb-24 lg:px-24 lg:pt-24 lg:pb-20 xl:pt-28">
        <m.div
          animate="animate"
          className="max-w-3xl"
          initial="initial"
          transition={{
            delayChildren: 0.2,
            staggerChildren: 0.1,
          }}
        >
          <m.h1
            className="inline-block origin-left scale-x-[0.86] font-display text-6xl leading-display font-normal text-title uppercase sm:text-7xl md:whitespace-nowrap md:text-8xl lg:text-7xl xl:text-display-xl"
            transition={{ ...heroTextItemTransition, duration: 0.84 }}
            variants={heroTitleVariants}
          >
            {t(($) => $.hero.headline)}
          </m.h1>

          <m.p
            className="font-body text-sm tracking-label text-accent uppercase md:text-lg md:tracking-label-wide xl:text-xl"
            transition={heroTextItemTransition}
            variants={heroTextItemVariants}
          >
            {t(($) => $.hero.role)}
          </m.p>

          <m.div
            aria-hidden="true"
            className="mt-3 h-px w-10 bg-accent md:mt-5 md:w-11"
            transition={heroTextItemTransition}
            variants={heroTextItemVariants}
          />

          <m.p
            className="mt-3 max-w-70 font-body text-xs leading-6 text-muted-strong md:mt-5 md:max-w-86 md:text-sm md:leading-7"
            transition={heroTextItemTransition}
            variants={heroTextItemVariants}
          >
            {t(($) => $.hero.description)}
          </m.p>

          <m.a
            className="mt-5 inline-flex items-center gap-4 font-body text-xs tracking-action text-accent uppercase duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:mt-8 md:gap-5 md:tracking-action-wide"
            href="#projects"
            transition={heroTextItemTransition}
            variants={heroTextItemVariants}
          >
            <span>{t(($) => $.hero.cta)}</span>
            <ArrowRightIcon aria-hidden="true" className="size-6 md:size-7" strokeWidth={1.4} />
          </m.a>

          <Projects />
        </m.div>

        <div className="absolute inset-x-6 bottom-5 md:bottom-9">
          <div className="motion-safe:animate-scroll-cue flex flex-col items-center gap-2 font-body text-caption tracking-label text-muted uppercase">
            <span>{t(($) => $.hero.scrollIndicator)}</span>
            <ArrowDownIcon aria-hidden="true" className="size-4 text-accent" strokeWidth={1.6} />
          </div>
        </div>
      </div>
    </section>
  );
}
