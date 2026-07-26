export const CATEGORIES = [
  'Comida',
  'Transporte',
  'Hogar',
  'Salud',
  'Ocio',
  'Educación',
  'Otros',
] as const

export const CATEGORY_COLORS: Record<string, string> = {
  Comida: '#f97316',
  Transporte: '#3b82f6',
  Hogar: '#8b5cf6',
  Salud: '#ef4444',
  Ocio: '#ec4899',
  Educación: '#14b8a6',
  Otros: '#64748b',
}

export function colorFor(category: string): string {
  return CATEGORY_COLORS[category] ?? CATEGORY_COLORS.Otros
}
