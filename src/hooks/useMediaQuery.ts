import { useEffect, useState } from 'react';

export default function useMediaQuery(rule: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(rule).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(rule);

    function handleChange(event: MediaQueryListEvent): void {
      setMatches(event.matches);
    }

    setMatches(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [rule]);

  return matches;
}
