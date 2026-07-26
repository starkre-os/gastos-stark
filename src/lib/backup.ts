import type { BackupFile, Expense } from '../types'

export function download(backup: BackupFile): void {
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `gastos-${backup.exportedAt.slice(0, 10)}.json`
  link.click()
  URL.revokeObjectURL(url)
}

function isExpense(value: unknown): value is Expense {
  if (typeof value !== 'object' || value === null) return false
  const e = value as Record<string, unknown>
  return (
    typeof e.id === 'string' &&
    typeof e.amount === 'number' &&
    Number.isFinite(e.amount) &&
    typeof e.category === 'string' &&
    typeof e.note === 'string' &&
    typeof e.date === 'string' &&
    typeof e.createdAt === 'string'
  )
}

export function parseBackup(text: string): BackupFile {
  const data: unknown = JSON.parse(text)
  if (typeof data !== 'object' || data === null) {
    throw new Error('El archivo no tiene el formato esperado.')
  }
  const candidate = data as Record<string, unknown>
  if (!Array.isArray(candidate.expenses) || !candidate.expenses.every(isExpense)) {
    throw new Error('El archivo no contiene una lista de gastos válida.')
  }
  return {
    version: 1,
    exportedAt:
      typeof candidate.exportedAt === 'string' ? candidate.exportedAt : new Date().toISOString(),
    currency: typeof candidate.currency === 'string' ? candidate.currency : 'USD',
    expenses: candidate.expenses,
  }
}
