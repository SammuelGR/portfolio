import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { rules } from '@/constants/breakpoints';
import useMediaQuery from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';

import DesktopNavigation from './DesktopNavigation';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenuButton from './MobileMenuButton';
import MobileNavigation from './MobileNavigation';

const activeSectionOffset = 96;

export default function Header() {
  const { t } = useTranslation();
  const isMd = useMediaQuery(rules.md);
  const [activeHref, setActiveHref] = useState<string>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = useMemo(
    () => [
      { href: '#experience', label: t(($) => $.header.navigation.experience) },
      { href: '#projects', label: t(($) => $.header.navigation.projects) },
      { href: '#about', label: t(($) => $.header.navigation.about) },
      { href: '#contact', label: t(($) => $.header.navigation.contact) },
    ],
    [t],
  );

  useEffect(() => {
    if (!isMd) {
      setActiveHref(undefined);
      return;
    }

    const sectionItems = navigationItems
      .map((item) => ({
        href: item.href,
        section: document.querySelector(item.href),
      }))
      .filter((item): item is { href: string; section: Element } => item.section !== null);

    if (sectionItems.length === 0) {
      setActiveHref(undefined);
      return;
    }

    function updateActiveHref(): void {
      let nextActiveHref: string | undefined;

      sectionItems.forEach((item) => {
        if (item.section.getBoundingClientRect().top <= activeSectionOffset) {
          nextActiveHref = item.href;
        }
      });

      setActiveHref((currentActiveHref) => (currentActiveHref === nextActiveHref ? currentActiveHref : nextActiveHref));
    }

    updateActiveHref();
    window.addEventListener('scroll', updateActiveHref, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateActiveHref);
    };
  }, [isMd, navigationItems]);

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
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50',
        !isMenuOpen && 'bg-background/70 shadow-lg shadow-background/40 backdrop-blur-md',
      )}
    >
      <div
        className={cn(
          'items-center max-w-8xl mx-auto',
          isMd ? 'grid grid-cols-[1fr_auto_1fr] px-8 py-3 lg:px-12' : 'flex justify-between px-5 py-4 relative z-50',
        )}
      >
        {isMd ? (
          <DesktopNavigation activeHref={activeHref} items={navigationItems} />
        ) : (
          <MobileMenuButton isOpen={isMenuOpen} onToggle={handleMenuToggle} />
        )}

        <LanguageSwitcher className={isMd ? 'col-start-3 justify-self-end' : undefined} />
      </div>

      {!isMd && <MobileNavigation isOpen={isMenuOpen} items={navigationItems} onClose={handleMenuClose} />}
    </header>
  );
}
