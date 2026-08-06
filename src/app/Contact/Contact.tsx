import { SiGithub as GitHubIcon, SiInstagram as InstagramIcon } from '@icons-pack/react-simple-icons';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import * as m from 'motion/react-m';
import { useTranslation } from 'react-i18next';

import SectionHeading from '@/components/SectionHeading/SectionHeading';
import { sectionItemTransition, sectionItemVariants } from '@/components/sectionAnimation';
import type { TranslationSelector } from '@/types/translation';

type Social = {
  handleKey: TranslationSelector;
  icon: typeof ExternalLinkIcon | typeof GitHubIcon | typeof InstagramIcon;
  titleKey: TranslationSelector;
  url: string;
};

const socials = [
  {
    handleKey: ($) => $.contact.social.linkedin.handle,
    icon: ExternalLinkIcon,
    titleKey: ($) => $.contact.social.linkedin.title,
    url: 'https://www.linkedin.com/in/sammuel-reis',
  },
  {
    handleKey: ($) => $.contact.social.github.handle,
    icon: GitHubIcon,
    titleKey: ($) => $.contact.social.github.title,
    url: 'https://github.com/SammuelGR',
  },
  {
    handleKey: ($) => $.contact.social.instagram.handle,
    icon: InstagramIcon,
    titleKey: ($) => $.contact.social.instagram.title,
    url: 'https://www.instagram.com/sammuelgr/',
  },
] satisfies Social[];

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby="contact-title"
      className="bg-background px-5 py-12 md:px-16 md:py-20 lg:flex lg:min-h-svh lg:items-center lg:px-24"
      id="contact"
    >
      <m.div
        className="mx-auto w-full max-w-7xl"
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
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.75fr)] lg:items-center lg:gap-x-32">
          <div>
            <SectionHeading className="xl:text-display-xl" id="contact-title" title={t(($) => $.contact.title)} />
          </div>

          <div className="mt-20 space-y-8 md:space-y-10 lg:mt-0 lg:space-y-14">
            {socials.map((social) => {
              const SocialIcon = social.icon;

              return (
                <m.a
                  className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:pr-10"
                  href={social.url}
                  key={social.url}
                  rel="noreferrer"
                  target="_blank"
                  transition={sectionItemTransition}
                  variants={sectionItemVariants}
                >
                  <span>
                    <span className="block font-body text-lg tracking-label text-foreground uppercase transition-colors duration-200 group-hover:text-accent md:text-xl lg:text-2xl">
                      {t(social.titleKey)}
                    </span>

                    <span className="mt-2 block font-body text-xs text-muted-strong transition-colors duration-200 group-hover:text-foreground md:text-sm lg:text-lg">
                      {t(social.handleKey)}
                    </span>
                  </span>

                  <SocialIcon
                    aria-hidden="true"
                    className="size-6 shrink-0 text-accent motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
                  />
                </m.a>
              );
            })}
          </div>
        </div>
      </m.div>
    </section>
  );
}
