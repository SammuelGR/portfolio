const bp = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export const rules = {
  xs: `(min-width: ${bp.xs}px)`,
  sm: `(min-width: ${bp.sm}px)`,
  md: `(min-width: ${bp.md}px)`,
  lg: `(min-width: ${bp.lg}px)`,
  xl: `(min-width: ${bp.xl}px)`,

  xsOnly: `(min-width: ${bp.xs}px) and (max-width: ${bp.sm - 1}px)`,
  smOnly: `(min-width: ${bp.sm}px) and (max-width: ${bp.md - 1}px)`,
  mdOnly: `(min-width: ${bp.md}px) and (max-width: ${bp.lg - 1}px)`,
  lgOnly: `(min-width: ${bp.lg}px) and (max-width: ${bp.xl - 1}px)`,
} as const;
