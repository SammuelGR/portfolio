import * as m from 'motion/react-m';
import { useTranslation } from 'react-i18next';

import { cn } from '@/utils/cn';

import { interactiveTextClassName } from './constants';
import type { NavigationItem } from './types';

type DesktopNavigationProps = {
  activeHref?: string;
  items: NavigationItem[];
};

export default function DesktopNavigation({ activeHref, items }: DesktopNavigationProps) {
  const { t } = useTranslation();

  return (
    <nav aria-label={t(($) => $.header.navigationLabel)} className="col-start-2">
      <ul className="flex gap-12 items-center">
        {items.map((item, index) => {
          const isActive = item.href === activeHref;

          return (
            <m.li
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: -6 }}
              key={item.href}
              transition={{
                delay: index * 0.07,
                duration: 0.28,
                ease: 'easeOut',
              }}
            >
              <span aria-hidden="true" className="pointer-events-none relative size-1.5 shrink-0">
                <m.span
                  animate={isActive ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.65, x: -2 }}
                  className="absolute inset-0 rounded-full bg-accent"
                  initial={false}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                />
              </span>

              <a
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  interactiveTextClassName,
                  'inline-flex font-medium font-ui text-xs uppercase',
                  isActive ? 'text-foreground' : 'text-foreground/70',
                )}
                href={item.href}
              >
                {item.label}
              </a>
            </m.li>
          );
        })}
      </ul>
    </nav>
  );
}
