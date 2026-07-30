import { Menu as MenuIcon, X as XIcon } from 'lucide-react';
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
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <a
                    className={cn(interactiveTextClassName, 'font-medium font-ui text-foreground/70 text-xs uppercase')}
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
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
            {isMenuOpen ? (
              <XIcon aria-hidden="true" className="size-6" strokeWidth={1.5} />
            ) : (
              <MenuIcon aria-hidden="true" className="size-6" strokeWidth={1.5} />
            )}
          </button>
        )}

        <LanguageSwitcher
          className={isMd ? 'col-start-3 justify-self-end' : undefined}
          controlClassName={interactiveTextClassName}
        />
      </div>

      {!isMd && isMenuOpen && (
        <nav
          aria-label={t(($) => $.header.navigationLabel)}
          className="bg-background fixed inset-0 px-6 pt-24 z-40"
          id="mobile-navigation"
        >
          <ul className="w-full">
            {navigationItems.map((item) => (
              <li className="border-b border-foreground/10 first:border-t" key={item.href}>
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
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
