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
      <section className="rounded-2xl border border-dashed border-neutral-300 bg-white/50 p-10 text-center">
        <p className="text-sm text-neutral-500">
          Aún no hay gastos en este periodo. Agrega el primero arriba.
        </p>
      </section>
    )
  }

  return (
    <section className="divide-y divide-neutral-100 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
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
            <p className="text-xs text-neutral-500">
              {expense.category} · {formatDate(expense.date)}
            </p>
          </div>
          <span className="tabular-nums">{formatMoney(expense.amount, currency)}</span>
          <button
            onClick={() => onRemove(expense.id)}
            aria-label={`Eliminar gasto de ${formatMoney(expense.amount, currency)}`}
            title="Eliminar"
            className="rounded-lg px-2 py-1 text-neutral-300 transition hover:bg-red-50 hover:text-red-600"
          >
            ×
          </button>
        </div>
      ))}
    </section>
  )
}
