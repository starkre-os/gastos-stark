import {
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  isWithinInterval,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
} from 'date-fns'
import { es } from 'date-fns/locale'
import type { Expense, Period } from '../types'

export type Interval = { start: Date; end: Date }

export function intervalFor(period: Period, reference: Date): Interval {
  switch (period) {
    case 'day':
      return { start: startOfDay(reference), end: endOfDay(reference) }
    case 'week':
      return {
        start: startOfWeek(reference, { weekStartsOn: 1 }),
        end: endOfWeek(reference, { weekStartsOn: 1 }),
      }
    case 'month':
      return { start: startOfMonth(reference), end: endOfMonth(reference) }
  }
}

export function labelFor(period: Period, reference: Date): string {
  switch (period) {
    case 'day':
      return format(reference, "EEEE d 'de' MMMM", { locale: es })
    case 'week': {
      const { start, end } = intervalFor('week', reference)
      return `${format(start, 'd MMM', { locale: es })} – ${format(end, 'd MMM', { locale: es })}`
    }
    case 'month':
      return format(reference, "MMMM 'de' yyyy", { locale: es })
  }
}

export function filterByInterval(expenses: Expense[], interval: Interval): Expense[] {
  return expenses.filter((e) => isWithinInterval(parseISO(e.date), interval))
}

export function total(expenses: Expense[]): number {
  return expenses.reduce((sum, e) => sum + e.amount, 0)
}

export function totalsByCategory(expenses: Expense[]): { category: string; total: number }[] {
  const map = new Map<string, number>()
  for (const e of expenses) {
    map.set(e.category, (map.get(e.category) ?? 0) + e.amount)
  }
  return [...map.entries()]
    .map(([category, categoryTotal]) => ({ category, total: categoryTotal }))
    .sort((a, b) => b.total - a.total)
}

/** Serie temporal para la gráfica: últimos 7 días, 8 semanas o 6 meses. */
export function series(
  expenses: Expense[],
  period: Period,
  reference: Date,
): { label: string; total: number }[] {
  if (period === 'day') {
    return eachDayOfInterval({ start: subDays(reference, 6), end: reference }).map((day) => ({
      label: format(day, 'EEE', { locale: es }),
      total: total(filterByInterval(expenses, intervalFor('day', day))),
    }))
  }

  if (period === 'week') {
    return Array.from({ length: 8 }, (_, i) => subDays(reference, (7 - i) * 7)).map((day) => ({
      label: format(startOfWeek(day, { weekStartsOn: 1 }), 'd MMM', { locale: es }),
      total: total(filterByInterval(expenses, intervalFor('week', day))),
    }))
  }

  return Array.from({ length: 6 }, (_, i) => subMonths(reference, 5 - i)).map((day) => ({
    label: format(day, 'MMM', { locale: es }),
    total: total(filterByInterval(expenses, intervalFor('month', day))),
  }))
}

export function formatMoney(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('es', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch {
    return `${amount.toFixed(2)} ${currency}`
  }
}

export function today(): string {
  return format(new Date(), 'yyyy-MM-dd')
}

export function formatDate(date: string): string {
  return format(parseISO(date), "d 'de' MMM", { locale: es })
}
