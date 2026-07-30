import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { rules } from '@/constants/breakpoints';
import useMediaQuery from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';

import { interactiveTextClassName } from './constants';
import DesktopNavigation from './DesktopNavigation';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenuButton from './MobileMenuButton';
import MobileNavigation from './MobileNavigation';

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
          <DesktopNavigation items={navigationItems} />
        ) : (
          <MobileMenuButton isOpen={isMenuOpen} onToggle={handleMenuToggle} />
        )}

        <LanguageSwitcher
          className={isMd ? 'col-start-3 justify-self-end' : undefined}
          controlClassName={interactiveTextClassName}
        />
      </div>

      {!isMd && <MobileNavigation isOpen={isMenuOpen} items={navigationItems} onClose={handleMenuClose} />}
    </header>
  );
}
