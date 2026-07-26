import { colorFor } from '../lib/categories'
import { formatDate, formatMoney } from '../lib/stats'
import type { Expense } from '../types'

type Props = {
  expenses: Expense[]
  currency: string
  onRemove: (id: string) => void
}

export function ExpenseList({ expenses, currency, onRemove }: Props) {
  if (expenses.length === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/40 p-10 text-center">
        <p className="text-sm text-neutral-400">
          Aún no hay gastos en este periodo. Agrega el primero arriba.
        </p>
      </section>
    )
  }

  return (
    <section className="divide-y divide-neutral-800 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
      {expenses.map((expense) => (
        <div key={expense.id} className="group flex items-center gap-3 px-5 py-3">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: colorFor(expense.category) }}
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {expense.note || expense.category}
            </p>
            <p className="text-xs text-neutral-400">
              {expense.category} · {formatDate(expense.date)}
            </p>
          </div>
          <span className="tabular-nums">{formatMoney(expense.amount, currency)}</span>
          <button
            onClick={() => onRemove(expense.id)}
            aria-label={`Eliminar gasto de ${formatMoney(expense.amount, currency)}`}
            title="Eliminar"
            className="rounded-lg px-2 py-1 text-neutral-600 transition hover:bg-red-500/10 hover:text-red-400"
          >
            ×
          </button>
        </div>
      ))}
    </section>
  )
}
