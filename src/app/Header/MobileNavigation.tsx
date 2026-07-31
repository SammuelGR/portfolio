import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { useTranslation } from 'react-i18next';

import { cn } from '@/utils/cn';

import { interactiveTextClassName, mobileNavigationId } from './constants';
import type { NavigationItem } from './types';

type MobileNavigationProps = {
  isOpen: boolean;
  items: NavigationItem[];
  onClose: () => void;
};

export default function MobileNavigation({ isOpen, items, onClose }: MobileNavigationProps) {
  const { t } = useTranslation();

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <m.nav
          animate={{ opacity: 1, y: 0 }}
          aria-label={t(($) => $.header.navigationLabel)}
          className="bg-background fixed inset-0 px-6 pt-24 z-40"
          exit={{ opacity: 0, y: -4 }}
          id={mobileNavigationId}
          initial={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <ul className="w-full">
            {items.map((item, index) => (
              <m.li
                animate={{ opacity: 1, y: 0 }}
                className="border-b border-foreground/10 first:border-t"
                initial={{ opacity: 0, y: -6 }}
                key={item.href}
                transition={{
                  delay: index * 0.03,
                  duration: 0.14,
                  ease: 'easeOut',
                }}
              >
                <a
                  className={cn(
                    interactiveTextClassName,
                    'block font-medium font-ui motion-safe:hover:translate-x-1 motion-safe:transition-[color,translate] py-6 text-foreground text-xl uppercase',
                  )}
                  href={item.href}
                  onClick={onClose}
                >
                  {item.label}
                </a>
              </m.li>
            ))}
          </ul>
        </m.nav>
      )}
    </AnimatePresence>
  );
}
