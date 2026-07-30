import { Menu as MenuIcon, X as XIcon } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { useTranslation } from 'react-i18next';

import { cn } from '@/utils/cn';

import { interactiveTextClassName, mobileNavigationId } from './constants';

type MobileMenuButtonProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export default function MobileMenuButton({ isOpen, onToggle }: MobileMenuButtonProps) {
  const { t } = useTranslation();

  return (
    <button
      aria-controls={isOpen ? mobileNavigationId : undefined}
      aria-expanded={isOpen}
      aria-label={t(($) => (isOpen ? $.header.closeMenu : $.header.openMenu))}
      className={cn(
        interactiveTextClassName,
        'motion-safe:active:scale-95 motion-safe:hover:scale-105 motion-safe:transition-[color,scale] text-foreground',
      )}
      onClick={onToggle}
      type="button"
    >
      <span aria-hidden="true" className="block relative size-6">
        <AnimatePresence initial={false}>
          <m.span
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            className="absolute inset-0"
            exit={{
              opacity: 0,
              rotate: isOpen ? 45 : -45,
              scale: 0.8,
            }}
            initial={{
              opacity: 0,
              rotate: isOpen ? -45 : 45,
              scale: 0.8,
            }}
            key={isOpen ? 'close-menu' : 'open-menu'}
            transition={{ duration: 0.12, ease: 'easeOut' }}
          >
            {isOpen ? (
              <XIcon className="size-6" strokeWidth={1.5} />
            ) : (
              <MenuIcon className="size-6" strokeWidth={1.5} />
            )}
          </m.span>
        </AnimatePresence>
      </span>
    </button>
  );
}
