import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BackupFile, Expense, Period } from './types'

type NewExpense = Omit<Expense, 'id' | 'createdAt'>

type State = {
  expenses: Expense[]
  currency: string
  period: Period
}

type Actions = {
  addExpense: (expense: NewExpense) => void
  removeExpense: (id: string) => void
  setPeriod: (period: Period) => void
  setCurrency: (currency: string) => void
  clearAll: () => void
  replaceAll: (backup: BackupFile) => void
}

function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      expenses: [],
      currency: 'USD',
      period: 'day',
      addExpense: (expense) =>
        set((state) => ({
          expenses: [
            { ...expense, id: newId(), createdAt: new Date().toISOString() },
            ...state.expenses,
          ],
        })),
      removeExpense: (id) =>
        set((state) => ({ expenses: state.expenses.filter((e) => e.id !== id) })),
      setPeriod: (period) => set({ period }),
      setCurrency: (currency) => set({ currency }),
      clearAll: () => set({ expenses: [] }),
      replaceAll: (backup) =>
        set({ expenses: backup.expenses, currency: backup.currency }),
    }),
    { name: 'gastos-v1' },
  ),
)
