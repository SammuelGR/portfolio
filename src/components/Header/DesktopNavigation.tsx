import * as m from 'motion/react-m';
import { useTranslation } from 'react-i18next';

import { cn } from '@/utils/cn';

import { interactiveTextClassName } from './constants';
import type { NavigationItem } from './types';

type DesktopNavigationProps = {
  items: NavigationItem[];
};

export default function DesktopNavigation({ items }: DesktopNavigationProps) {
  const { t } = useTranslation();

  return (
    <nav aria-label={t(($) => $.header.navigationLabel)} className="col-start-2">
      <ul className="flex gap-12 items-center">
        {items.map((item, index) => (
          <m.li
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -6 }}
            key={item.href}
            transition={{
              delay: index * 0.07,
              duration: 0.28,
              ease: 'easeOut',
            }}
          >
            <a
              className={cn(interactiveTextClassName, 'font-medium font-ui text-foreground/70 text-xs uppercase')}
              href={item.href}
            >
              {item.label}
            </a>
          </m.li>
        ))}
      </ul>
    </nav>
  );
}
