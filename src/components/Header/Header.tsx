import { Menu as MenuIcon, X as XIcon } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import * as m from 'motion/react-m';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { rules } from '@/constants/breakpoints';
import useMediaQuery from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';

import LanguageSwitcher from './LanguageSwitcher';

const interactiveTextClassName =
  'active:text-accent duration-200 ease-out focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 hover:text-accent transition-colors';

export default function Header() {
  const { t } = useTranslation();
  const isMd = useMediaQuery(rules.md);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { href: '#experience', label: t(($) => $.header.navigation.experience) },
    { href: '#projects', label: t(($) => $.header.navigation.projects) },
    { href: '#about', label: t(($) => $.header.navigation.about) },
    { href: '#contact', label: t(($) => $.header.navigation.contact) },
  ];

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    if (isMd) {
      setIsMenuOpen(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMd, isMenuOpen]);

  function handleMenuToggle(): void {
    setIsMenuOpen((isOpen) => !isOpen);
  }

  function handleMenuClose(): void {
    setIsMenuOpen(false);
  }

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div
        className={cn(
          'items-center max-w-8xl mx-auto',
          isMd ? 'grid grid-cols-[1fr_auto_1fr] px-10 py-8 lg:px-16' : 'flex justify-between px-6 py-7 relative z-50',
        )}
      >
        {isMd ? (
          <nav aria-label={t(($) => $.header.navigationLabel)} className="col-start-2">
            <ul className="flex gap-12 items-center">
              {navigationItems.map((item, index) => (
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
        ) : (
          <button
            aria-controls={isMenuOpen ? 'mobile-navigation' : undefined}
            aria-expanded={isMenuOpen}
            aria-label={t(($) => (isMenuOpen ? $.header.closeMenu : $.header.openMenu))}
            className={cn(
              interactiveTextClassName,
              'motion-safe:active:scale-95 motion-safe:hover:scale-105 motion-safe:transition-[color,scale] text-foreground',
            )}
            onClick={handleMenuToggle}
            type="button"
          >
            <span aria-hidden="true" className="block relative size-6">
              <AnimatePresence initial={false}>
                <m.span
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  className="absolute inset-0"
                  exit={{
                    opacity: 0,
                    rotate: isMenuOpen ? 45 : -45,
                    scale: 0.8,
                  }}
                  initial={{
                    opacity: 0,
                    rotate: isMenuOpen ? -45 : 45,
                    scale: 0.8,
                  }}
                  key={isMenuOpen ? 'close-menu' : 'open-menu'}
                  transition={{ duration: 0.12, ease: 'easeOut' }}
                >
                  {isMenuOpen ? (
                    <XIcon className="size-6" strokeWidth={1.5} />
                  ) : (
                    <MenuIcon className="size-6" strokeWidth={1.5} />
                  )}
                </m.span>
              </AnimatePresence>
            </span>
          </button>
        )}

        <LanguageSwitcher
          className={isMd ? 'col-start-3 justify-self-end' : undefined}
          controlClassName={interactiveTextClassName}
        />
      </div>

      <AnimatePresence initial={false}>
        {!isMd && isMenuOpen && (
          <m.nav
            animate={{ opacity: 1, y: 0 }}
            aria-label={t(($) => $.header.navigationLabel)}
            className="bg-background fixed inset-0 px-6 pt-24 z-40"
            exit={{ opacity: 0, y: -4 }}
            id="mobile-navigation"
            initial={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <ul className="w-full">
              {navigationItems.map((item, index) => (
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
                    onClick={handleMenuClose}
                  >
                    {item.label}
                  </a>
                </m.li>
              ))}
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
