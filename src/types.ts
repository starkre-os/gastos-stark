export type Expense = {
  id: string
  amount: number
  category: string
  note: string
  /** Fecha del gasto en formato ISO `yyyy-MM-dd`. */
  date: string
  createdAt: string
}

export type Period = 'day' | 'week' | 'month'

export type BackupFile = {
  version: 1
  exportedAt: string
  currency: string
  expenses: Expense[]
}
